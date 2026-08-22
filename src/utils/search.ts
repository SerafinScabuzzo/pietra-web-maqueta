import { Product } from '../types';

/**
 * Normaliza texto para búsqueda (lowercase, sin acentos)
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

/**
 * Verifica si un producto coincide con la query de búsqueda
 */
export const matchesQuery = (product: Product, query: string): boolean => {
  if (!query.trim()) return false;

  const normalizedQuery = normalizeText(query);
  const searchableFields = [
    product.name,
    product.sku,
  ];

  return searchableFields.some((field) =>
    normalizeText(field).includes(normalizedQuery)
  );
};

/**
 * Sugerencias de autocomplete (SKU + nombre, máximo 8).
 */
export const getSearchSuggestions = (
  products: Product[],
  query: string,
  limit = 8
): Product[] => {
  if (!query.trim()) return [];
  return products.filter((product) => matchesQuery(product, query)).slice(0, limit);
};

/**
 * Aplica filtros a una lista de productos
 */
export const applyFilters = (
  products: Product[],
  params: {
    brands?: string[];
    categories?: string[];
    subcategories?: string[];
    offerOnly?: boolean;
  }
): Product[] => {
  let filtered = [...products];

  // Filtro por marcas
  if (params.brands && params.brands.length > 0) {
    filtered = filtered.filter((p) =>
      params.brands!.includes(p.brandId)
    );
  }

  // Filtro por rubros
  if (params.categories && params.categories.length > 0) {
    filtered = filtered.filter(
      (p) => p.categoryId && params.categories!.includes(p.categoryId)
    );
  }

  // Filtro por subrubros
  if (params.subcategories && params.subcategories.length > 0) {
    filtered = filtered.filter(
      (p) => p.subcategoryId && params.subcategories!.includes(p.subcategoryId)
    );
  }

  // Filtro solo ofertas (flag isOffer, NO priceOffer)
  if (params.offerOnly) {
    filtered = filtered.filter((p) => p.isOffer === true);
  }

  return filtered;
};

/**
 * Orden default del catálogo: Pietra A–Z, después el resto A–Z global (sin agrupar por marca).
 */
export const applyDefaultSort = (products: Product[]): Product[] => {
  const byName = (a: Product, b: Product) =>
    a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });

  const pietra = products.filter((p) => p.brandId === 'pietra').sort(byName);
  const rest = products.filter((p) => p.brandId !== 'pietra').sort(byName);
  return [...pietra, ...rest];
};

/**
 * Aplica ordenamiento a una lista de productos
 */
export const applySort = (
  products: Product[],
  sort: 'price_asc' | 'price_desc' | 'name_asc' | undefined
): Product[] => {
  if (!sort) return products;

  const sorted = [...products];

  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => {
        const priceA = a.priceOffer || a.priceList;
        const priceB = b.priceOffer || b.priceList;
        return priceA - priceB;
      });

    case 'price_desc':
      return sorted.sort((a, b) => {
        const priceA = a.priceOffer || a.priceList;
        const priceB = b.priceOffer || b.priceList;
        return priceB - priceA;
      });

    case 'name_asc':
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
      );

    default:
      return sorted;
  }
};

