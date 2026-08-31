import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import CodeOrderModal from '../components/CodeOrderModal';
import { getProducts } from '../store/adminStore';
import { addToCart, getCurrentClient } from '../store/clientStore';
import { getAuth } from '../utils/auth';
import { findProductBySku } from '../utils/productLookup';
import { Product } from '../types';

const PedidoCodigo = () => {
  const [isClient, setIsClient] = useState(() => getAuth().isClient);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentCodes, setRecentCodes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const client = getCurrentClient();
  const products = useMemo(() => getProducts(), []);

  useEffect(() => {
    const sync = () => setIsClient(getAuth().isClient);
    window.addEventListener('pietra_auth_changed', sync);
    return () => window.removeEventListener('pietra_auth_changed', sync);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedProduct]);

  if (!isClient || !client) {
    return <Navigate to="/login" replace />;
  }

  const handleLookup = () => {
    setError(null);
    setSuccess(null);

    const trimmed = code.trim();
    if (!trimmed) {
      setError('Ingresá un código de producto');
      return;
    }

    const product = findProductBySku(products, trimmed);
    if (!product) {
      setError('Código no encontrado');
      return;
    }

    setSelectedProduct(product);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLookup();
    }
  };

  const handleConfirm = (quantity: number) => {
    if (!selectedProduct) return;

    addToCart(selectedProduct.id, quantity);
    setRecentCodes((prev) => {
      const next = [selectedProduct.sku, ...prev.filter((sku) => sku !== selectedProduct.sku)];
      return next.slice(0, 8);
    });
    setSuccess(`${selectedProduct.sku} agregado al pedido (${quantity} u.)`);
    setSelectedProduct(null);
    setCode('');
    inputRef.current?.focus();
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-2xl">
      <div className="mb-6">
        <Link
          to="/buscar"
          className="inline-flex items-center text-sm text-brandBlue hover:underline mb-3"
        >
          ← Volver al catálogo
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-brandBlue mb-2">Pedido por código</h1>
        <p className="text-gray-700">
          Ingresá el código del producto y presioná Enter. Se abrirá una ventana para confirmar
          cantidad y agregar al pedido.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur border border-blue-200 rounded-xl shadow-sm p-6">
        <label htmlFor="product-code" className="block text-sm font-medium text-gray-700 mb-2">
          Código de producto
        </label>
        <input
          ref={inputRef}
          id="product-code"
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Ej: IDC413S"
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue uppercase tracking-wide"
          autoComplete="off"
        />

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={handleLookup} className="btn-primary">
            Buscar código
          </button>
          <Link to="/revisar-pedido" className="btn-secondary text-center">
            Ver carrito
          </Link>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm font-medium">
            {success}
          </p>
        )}

        {recentCodes.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm font-medium text-gray-600 mb-2">Últimos agregados</p>
            <div className="flex flex-wrap gap-2">
              {recentCodes.map((sku) => (
                <button
                  key={sku}
                  type="button"
                  onClick={() => {
                    setCode(sku);
                    setError(null);
                    setSuccess(null);
                    inputRef.current?.focus();
                  }}
                  className="text-xs font-semibold bg-blue-50 text-brandBlue px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {sku}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <CodeOrderModal
          product={selectedProduct}
          discountRate={client.discountRate}
          onConfirm={handleConfirm}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default PedidoCodigo;
