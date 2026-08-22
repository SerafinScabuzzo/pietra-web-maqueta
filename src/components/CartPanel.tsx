import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentClient,
  updateCartItemQuantity,
  removeFromCart,
} from '../store/clientStore';
import { getProducts } from '../store/adminStore';
import { buildCartView } from '../utils/cartView';
import { formatMoney } from '../utils/pricing';

const CartPanel = () => {
  const client = getCurrentClient();
  const products = getProducts();
  const [collapsed, setCollapsed] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener('pietra_cart_changed', refresh);
    window.addEventListener('pietra_auth_changed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('pietra_cart_changed', refresh);
      window.removeEventListener('pietra_auth_changed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  if (!client) return null;

  const view = buildCartView(products, client.discountRate, client.cuit);

  if (collapsed) {
    return (
      <aside className="w-full lg:w-56 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-4 lg:sticky lg:top-24">
          <p className="font-semibold text-blue-900 mb-1">🛒 Carrito</p>
          <p className="text-sm text-gray-600 mb-3">
            {view.productCount} {view.productCount === 1 ? 'producto' : 'productos'} /{' '}
            {view.unitCount} {view.unitCount === 1 ? 'unidad' : 'unidades'}
          </p>
          <button type="button" className="btn-primary w-full text-sm" onClick={() => setCollapsed(false)}>
            Mostrar carrito
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0">
      <div className="bg-white rounded-lg shadow-md lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-blue-900">Carrito</h2>
          <button
            type="button"
            className="text-sm text-slate-600 hover:text-blue-800"
            onClick={() => setCollapsed(true)}
          >
            Minimizar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 min-h-[140px]">
          {view.lines.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-800 font-medium mb-1">Tu carrito está vacío.</p>
              <p className="text-sm text-gray-600">
                Agregá productos para comenzar tu pedido.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {view.lines.map((line) => (
                <div key={line.product.id} className="border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex gap-2">
                    <img
                      src={line.product.images[0] || ''}
                      alt=""
                      className="w-12 h-12 object-cover rounded bg-brandGray flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                        {line.product.name}
                      </p>
                      <p className="text-xs text-gray-500">SKU: {line.product.sku}</p>
                      <p className="text-sm font-semibold text-blue-800">
                        ${formatMoney(line.unitPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded"
                      onClick={() =>
                        updateCartItemQuantity(line.product.id, line.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="w-7 text-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded"
                      onClick={() =>
                        updateCartItemQuantity(line.product.id, line.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="ml-auto text-red-600 text-xs font-medium"
                      onClick={() => removeFromCart(line.product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Subtotal: ${formatMoney(line.subtotal)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 p-4 space-y-2 bg-white rounded-b-lg">
          <div className="flex justify-between text-sm text-slate-700">
            <span>Productos</span>
            <span>{view.productCount}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700">
            <span>Unidades</span>
            <span>{view.unitCount}</span>
          </div>
          <div className="flex justify-between font-bold text-blue-900 pt-1 border-t border-slate-100">
            <span>Total</span>
            <span>${formatMoney(view.total)}</span>
          </div>
          <Link
            to="/revisar-pedido"
            className="btn-primary w-full text-center text-sm mt-2 block"
          >
            REVISAR PEDIDO
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default CartPanel;
