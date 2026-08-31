import { useEffect, useState } from 'react';
import { Product } from '../types';
import { getEffectiveUnitPrice, formatMoney } from '../utils/pricing';

interface CodeOrderModalProps {
  product: Product;
  discountRate: number;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

const CodeOrderModal = ({
  product,
  discountRate,
  onConfirm,
  onClose,
}: CodeOrderModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = getEffectiveUnitPrice(product, discountRate);
  const imageUrl = product.images[0];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (quantity >= 1) onConfirm(quantity);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="code-order-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white rounded-lg border border-slate-200 p-6 shadow-lg"
      >
        <p className="text-sm font-semibold text-brandBlue mb-1">{product.sku}</p>
        <h2 id="code-order-title" className="text-lg font-bold text-blue-900 mb-4">
          {product.name}
        </h2>

        {imageUrl && (
          <div className="mb-4 flex justify-center">
            <img
              src={imageUrl}
              alt={product.name}
              className="h-28 w-28 object-contain rounded-lg border border-blue-100 bg-white"
              onError={(event) => {
                (event.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <p className="text-sm text-gray-600 mb-1">Precio unitario</p>
        <p className="text-2xl font-bold text-brandBlue mb-4">${formatMoney(unitPrice)}</p>

        <label htmlFor="code-order-qty" className="block text-sm font-medium text-gray-700 mb-1">
          Cantidad
        </label>
        <input
          id="code-order-qty"
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => setQuantity(Math.max(1, parseInt(event.target.value, 10) || 1))}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue mb-5"
          autoFocus
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" className="btn-primary flex-1">
            Agregar al pedido
          </button>
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeOrderModal;
