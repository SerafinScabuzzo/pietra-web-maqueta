import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getCurrentClient, getCart, updateCartItemQuantity, removeFromCart, clearCart } from '../store/clientStore';
import { getProducts } from '../store/adminStore';
import { Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [cart, setCart] = useState(getCart(getCurrentClient()?.cuit || ''));
  const [isExpanded, setIsExpanded] = useState(false);
  const client = getCurrentClient();
  const products = getProducts();

  useEffect(() => {
    if (isOpen && client) {
      setCart(getCart(client.cuit));
      // Bloquear scroll del body cuando el carrito está abierto
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar scroll cuando se cierra
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, client]);

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!client || !isOpen) return null;

  const cartProducts = cart.items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter((p): p is Product & { quantity: number } => p !== null);

  const calculateTotals = () => {
    const subtotal = cartProducts.reduce(
      (sum, item) => sum + item.priceList * item.quantity,
      0
    );
    const discountAmount = subtotal * client.discountRate;
    const total = subtotal * (1 - client.discountRate);
    return { subtotal, discountAmount, total };
  };

  const totals = calculateTotals();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (client) {
      updateCartItemQuantity(productId, newQuantity);
      setCart(getCart(client.cuit));
    }
  };

  const handleRemove = (productId: string) => {
    if (client) {
      removeFromCart(productId);
      setCart(getCart(client.cuit));
    }
  };

  const handleClear = () => {
    if (client) {
      clearCart();
      setCart(getCart(client.cuit));
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const cartContent = (
    <>
      {/* Overlay con blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
        onClick={handleOverlayClick}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full bg-white/85 backdrop-blur-md shadow-2xl z-[9999] transform transition-all duration-300 ease-in-out ${
          isExpanded
            ? 'w-full'
            : 'w-full md:w-[420px] max-w-[90vw]'
        } ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white/90">
            <h2 className="text-xl font-bold text-blue-900">Carrito</h2>
            <div className="flex items-center gap-2">
              {/* Botón Expandir/Contraer */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-slate-600 hover:text-blue-800 p-2 rounded transition-colors"
                aria-label={isExpanded ? 'Contraer' : 'Expandir'}
                title={isExpanded ? 'Contraer' : 'Expandir'}
              >
                {isExpanded ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
              {/* Botón Cerrar */}
              <button
                onClick={onClose}
                className="text-slate-600 hover:text-slate-800 p-2 rounded transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Items - scroll interno */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
            {cartProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartProducts.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-slate-200 pb-4 bg-white rounded-lg p-3">
                    <img
                      src={item.images[0] || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1 text-slate-900">{item.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">SKU: {item.sku}</p>
                      <p className="text-sm font-bold text-blue-800">
                        ${(item.priceList * (1 - client.discountRate)).toLocaleString('es-AR')}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-slate-700">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Subtotal: ${(item.priceList * item.quantity * (1 - client.discountRate)).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con resumen */}
          {cartProducts.length > 0 && (
            <div className="border-t border-slate-200 p-4 space-y-2 bg-white/90">
              <div className="flex justify-between text-sm text-slate-700">
                <span>Subtotal:</span>
                <span>${totals.subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-sm text-orange-600">
                <span>Descuento ({Math.round(client.discountRate * 100)}%):</span>
                <span>-${totals.discountAmount.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-200">
                <span className="text-slate-900">Total:</span>
                <span className="text-blue-800">${totals.total.toLocaleString('es-AR')}</span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Pagás {Math.round((1 - client.discountRate) * 100)}% del precio de lista
              </div>
              <button
                onClick={handleClear}
                className="w-full btn-secondary text-sm mt-2"
              >
                Vaciar carrito
              </button>
              <button className="w-full btn-primary mt-2">
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Renderizar en portal para asegurar que esté encima de todo
  return createPortal(cartContent, document.body);
};

export default CartDrawer;
