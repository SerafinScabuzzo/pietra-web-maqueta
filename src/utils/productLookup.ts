import { Product } from '../types';
import { normalizeText } from './search';

export const normalizeSku = (sku: string): string => {
  return normalizeText(sku).replace(/\s+/g, '');
};

export const findProductBySku = (
  products: Product[],
  code: string
): Product | undefined => {
  const normalized = normalizeSku(code);
  if (!normalized) return undefined;
  return products.find((product) => normalizeSku(product.sku) === normalized);
};
