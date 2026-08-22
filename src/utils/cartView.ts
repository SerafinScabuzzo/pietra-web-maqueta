import { Product } from '../types';
import { getCart } from '../store/clientStore';
import { getEffectiveUnitPrice } from './pricing';

export interface CartLineView {
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CartView {
  lines: CartLineView[];
  productCount: number;
  unitCount: number;
  total: number;
}

export const buildCartView = (
  products: Product[],
  discountRate: number,
  cuit: string
): CartView => {
  const cart = getCart(cuit);
  const lines: CartLineView[] = [];

  for (const item of cart.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    const unitPrice = getEffectiveUnitPrice(product, discountRate);
    lines.push({
      product,
      quantity: item.quantity,
      unitPrice,
      subtotal: unitPrice * item.quantity,
    });
  }

  return {
    lines,
    productCount: lines.length,
    unitCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.subtotal, 0),
  };
};

export const generateOrderNumber = (): string => {
  const n = Math.floor(Math.random() * 1000000);
  return `PED-${String(n).padStart(6, '0')}`;
};
