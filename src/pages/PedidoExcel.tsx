import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import OrderImportGrid from '../components/OrderImportGrid';
import { getProducts } from '../store/adminStore';
import { addToCart, getCurrentClient } from '../store/clientStore';
import { getAuth } from '../utils/auth';
import {
  ParsedExcelOrder,
  parseExcelBuffer,
  resolveExcelOrder,
} from '../utils/excelOrderImport';

const ACCEPTED_EXTENSIONS = '.xlsx,.xls,.csv';

const PedidoExcel = () => {
  const [isClient, setIsClient] = useState(() => getAuth().isClient);
  const [parsedOrder, setParsedOrder] = useState<ParsedExcelOrder | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const client = getCurrentClient();
  const products = useMemo(() => getProducts(), []);

  useEffect(() => {
    const sync = () => setIsClient(getAuth().isClient);
    window.addEventListener('pietra_auth_changed', sync);
    return () => window.removeEventListener('pietra_auth_changed', sync);
  }, []);

  if (!isClient || !client) {
    return <Navigate to="/login" replace />;
  }

  const processFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setParsedOrder(null);
    setFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const rawRows = parseExcelBuffer(buffer);

      if (rawRows.length === 0) {
        setError('El archivo no tiene filas válidas. Columna A: códigos, columna B: unidades.');
        return;
      }

      const resolved = resolveExcelOrder(rawRows, products, client.discountRate);
      setParsedOrder(resolved);

      if (resolved.validCount === 0) {
        setError('Ningún código del archivo fue encontrado en el catálogo.');
      }
    } catch {
      setError('No se pudo leer el archivo. Verificá que sea un Excel o CSV válido.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void processFile(file);
    event.target.value = '';
  };

  const handleAddToCart = () => {
    if (!parsedOrder) return;

    const validRows = parsedOrder.rows.filter((row) => row.product && !row.error);
    if (validRows.length === 0) {
      setError('No hay productos válidos para agregar al carrito.');
      return;
    }

    for (const row of validRows) {
      if (row.product) addToCart(row.product.id, row.quantity);
    }

    setSuccess(
      `${validRows.length} producto${validRows.length !== 1 ? 's' : ''} agregado${
        validRows.length !== 1 ? 's' : ''
      } al carrito.`
    );
  };

  const handleClear = () => {
    setParsedOrder(null);
    setFileName(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-5xl">
      <div className="mb-6">
        <Link
          to="/buscar"
          className="inline-flex items-center text-sm text-brandBlue hover:underline mb-3"
        >
          ← Volver al catálogo
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-brandBlue mb-2">Pedido por Excel</h1>
        <p className="text-gray-700">
          Cargá un archivo con tus códigos y cantidades. La página validará cada producto contra el
          catálogo.
        </p>
      </div>

      <div className="rounded-xl border-l-4 border-brandOrange bg-orange-50/90 p-5 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-brandBlue mb-2">Cómo cargar tu pedido</h2>
        <ul className="text-gray-700 space-y-1 text-sm sm:text-base">
          <li>
            <span className="font-semibold text-brandOrange">Columna A</span> → Códigos de producto
          </li>
          <li>
            <span className="font-semibold text-brandOrange">Columna B</span> → Unidades que querés
            pedir
          </li>
          <li>Formatos admitidos: .xlsx, .xls y .csv</li>
        </ul>
      </div>

      <div className="bg-white/80 backdrop-blur border border-blue-200 rounded-xl shadow-sm p-6 mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleFileChange}
          className="hidden"
          id="excel-order-file"
        />
        <label
          htmlFor="excel-order-file"
          className="btn-primary inline-flex cursor-pointer items-center justify-center"
        >
          {loading ? 'Procesando…' : 'Seleccionar archivo Excel'}
        </label>

        {fileName && (
          <p className="mt-3 text-sm text-gray-600">
            Archivo: <span className="font-medium text-blue-900">{fileName}</span>
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm font-medium">
            {success}{' '}
            <Link to="/revisar-pedido" className="underline font-semibold">
              Ir al carrito
            </Link>
          </p>
        )}
      </div>

      {parsedOrder && parsedOrder.rows.length > 0 && (
        <div className="bg-white/80 backdrop-blur border border-blue-200 rounded-xl shadow-sm p-6 space-y-4">
          <OrderImportGrid
            rows={parsedOrder.rows}
            total={parsedOrder.total}
            validCount={parsedOrder.validCount}
            errorCount={parsedOrder.errorCount}
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={parsedOrder.validCount === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar al carrito
            </button>
            <button type="button" onClick={handleClear} className="btn-secondary">
              Limpiar y cargar otro
            </button>
            <Link to="/revisar-pedido" className="btn-secondary text-center">
              Ver carrito
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidoExcel;
