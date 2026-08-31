import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import OrderReceiptView, { OrderReceipt } from '../components/OrderReceiptView';
import { getAuth } from '../utils/auth';
import {
  getCurrentClient,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from '../store/clientStore';
import { getProducts } from '../store/adminStore';
import { buildCartView, generateOrderNumber } from '../utils/cartView';
import { formatMoney } from '../utils/pricing';

const formatReceiptDate = (): string => {
  return new Date().toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const RevisarPedido = () => {
  const [isClient, setIsClient] = useState(() => getAuth().isClient);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);
  const [, setTick] = useState(0);
  const client = getCurrentClient();
  const products = getProducts();

  useEffect(() => {
    const sync = () => {
      setIsClient(getAuth().isClient);
      setTick((n) => n + 1);
    };
    window.addEventListener('pietra_auth_changed', sync);
    window.addEventListener('pietra_cart_changed', sync);
    return () => {
      window.removeEventListener('pietra_auth_changed', sync);
      window.removeEventListener('pietra_cart_changed', sync);
    };
  }, []);

  if (!isClient) {
    return <Navigate to="/login" replace />;
  }

  if (!client) {
    return <Navigate to="/login" replace />;
  }

  const view = buildCartView(products, client.discountRate, client.cuit);

  const handleConfirm = () => {
    if (view.lines.length === 0) return;

    const orderReceipt: OrderReceipt = {
      number: generateOrderNumber(),
      productCount: view.productCount,
      unitCount: view.unitCount,
      total: view.total,
      lines: view.lines.map((line) => ({
        sku: line.product.sku,
        name: line.product.name,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        subtotal: line.subtotal,
      })),
      clientName: `${client.firstName} ${client.lastName}`.trim(),
      clientCode: client.clientNumber || client.code,
      dateLabel: formatReceiptDate(),
    };

    setReceipt(orderReceipt);
    clearCart();
  };

  const handlePrint = () => {
    window.print();
  };

  if (receipt) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8 no-print">
            <p className="text-3xl mb-3">✓</p>
            <h1 className="text-2xl font-bold text-brandBlue mb-4">
              Pedido confirmado correctamente
            </h1>
            <p className="text-gray-700 mb-1">Número:</p>
            <p className="text-2xl font-bold text-brandOrange mb-6">{receipt.number}</p>
          </div>

          <OrderReceiptView receipt={receipt} />

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 no-print">
            <button type="button" onClick={handlePrint} className="btn-primary">
              Imprimir pedido
            </button>
            <Link to="/buscar" className="btn-accent text-center">
              VOLVER A HACER PEDIDO
            </Link>
            <Link to="/" className="btn-secondary text-center">
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (view.lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-brandBlue mb-3">Revisar Pedido</h1>
          <p className="text-gray-700 mb-6">Tu carrito está vacío.</p>
          <Link to="/buscar" className="btn-accent inline-block">
            HACER PEDIDO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-5xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-brandBlue mb-4 sm:mb-6">Revisar Pedido</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="divide-y divide-slate-100">
          {view.lines.map((line) => (
            <div key={line.product.id} className="p-4 flex flex-col sm:flex-row gap-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white border border-slate-100 rounded flex items-center justify-center flex-shrink-0 p-2">
                <img
                  src={line.product.images[0] || ''}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900">{line.product.name}</h2>
                <p className="text-sm text-gray-500 mb-2">SKU: {line.product.sku}</p>
                <p className="text-sm text-blue-800 font-medium mb-2">
                  Unitario: ${formatMoney(line.unitPrice)}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded"
                    onClick={() =>
                      updateCartItemQuantity(line.product.id, line.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{line.quantity}</span>
                  <button
                    type="button"
                    className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded"
                    onClick={() =>
                      updateCartItemQuantity(line.product.id, line.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-4 text-red-600 text-sm font-medium"
                    onClick={() => removeFromCart(line.product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-gray-500">Subtotal</p>
                <p className="text-lg font-bold text-blue-900">
                  ${formatMoney(line.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between text-gray-700 mb-1">
          <span>Productos</span>
          <span>{view.productCount}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-1">
          <span>Unidades</span>
          <span>{view.unitCount}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-blue-900 pt-3 border-t border-slate-200">
          <span>Total</span>
          <span>${formatMoney(view.total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/buscar" className="btn-secondary text-center">
          VOLVER A HACER PEDIDO
        </Link>
        <button type="button" className="btn-primary" onClick={handleConfirm}>
          CONFIRMAR PEDIDO
        </button>
      </div>
    </div>
  );
};

export default RevisarPedido;
