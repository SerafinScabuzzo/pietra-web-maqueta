/**
 * Calcula el porcentaje de descuento entre precio lista y precio oferta
 * @param priceList Precio de lista
 * @param priceOffer Precio de oferta
 * @returns Porcentaje de descuento redondeado (0-100)
 */
export const calculateDiscountPercentage = (
  priceList: number,
  priceOffer: number
): number => {
  if (priceList <= 0 || priceOffer >= priceList) {
    return 0;
  }
  return Math.round((1 - priceOffer / priceList) * 100);
};

/**
 * Verifica si un producto está en oferta.
 * La verdad es el flag isOffer; priceOffer es solo un número mock de demo.
 */
export const isProductOnOffer = (product: { isOffer: boolean }): boolean => {
  return product.isOffer === true;
};

export interface PricedProduct {
  priceList: number;
  priceOffer?: number;
}

/**
 * Precio unitario efectivo para un cliente.
 *
 * - Si hay priceOffer > 0: se usa ese importe (la oferta ya es el precio especial).
 * - Si no: priceList × (1 − discountRate) del cliente.
 *
 * Visitante no llama esta función (no ve precios).
 */
export const getEffectiveUnitPrice = (
  product: PricedProduct,
  discountRate: number
): number => {
  if (typeof product.priceOffer === 'number' && product.priceOffer > 0) {
    return product.priceOffer;
  }
  const rate = Number.isFinite(discountRate) ? discountRate : 0;
  return product.priceList * (1 - rate);
};

export const getLineSubtotal = (
  product: PricedProduct,
  quantity: number,
  discountRate: number
): number => {
  return getEffectiveUnitPrice(product, discountRate) * quantity;
};

export const formatMoney = (value: number): string => {
  return value.toLocaleString('es-AR', { maximumFractionDigits: 2 });
};

