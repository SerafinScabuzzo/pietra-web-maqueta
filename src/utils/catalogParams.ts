import { Product } from '../types';
import { applyFilters, matchesQuery } from './search';

export const PAGE_SIZE = 24;

export type CatalogSort = 'name_asc' | 'price_asc' | 'price_desc';

export interface CatalogParams {
  q: string;
  brands: string[];
  categories: string[];
  subcategories: string[];
  offerOnly: boolean;
  sort: CatalogSort | null;
  page: number;
}

const SORTS: CatalogSort[] = ['name_asc', 'price_asc', 'price_desc'];

export const parseSort = (value: string | null): CatalogSort | null => {
  if (value && SORTS.includes(value as CatalogSort)) return value as CatalogSort;
  return null;
};

export const readCatalogParams = (searchParams: URLSearchParams): CatalogParams => {
  const raw = parseInt(searchParams.get('page') || '1', 10);
  return {
    q: searchParams.get('q') || '',
    brands: searchParams.getAll('brand'),
    categories: searchParams.getAll('category'),
    subcategories: searchParams.getAll('subcategory'),
    offerOnly: searchParams.get('offer') === '1',
    sort: parseSort(searchParams.get('sort')),
    page: Number.isNaN(raw) || raw < 1 ? 1 : raw,
  };
};

export const writeCatalogParams = (params: CatalogParams): URLSearchParams => {
  const next = new URLSearchParams();
  const q = params.q.trim();
  if (q) next.set('q', q);
  params.brands.forEach((id) => next.append('brand', id));
  params.categories.forEach((id) => next.append('category', id));
  params.subcategories.forEach((id) => next.append('subcategory', id));
  if (params.offerOnly) next.set('offer', '1');
  if (params.sort) next.set('sort', params.sort);
  if (params.page > 1) next.set('page', String(params.page));
  return next;
};

export const clampPage = (page: number, totalPages: number): number => {
  if (Number.isNaN(page) || page < 1 || page > totalPages) return 1;
  return page;
};

export const productsMatchingAncestors = (
  products: Product[],
  params: { q: string; brands: string[]; categories?: string[]; offerOnly: boolean }
): Product[] => {
  let result = products;
  if (params.q.trim()) {
    result = result.filter((p) => matchesQuery(p, params.q));
  }
  return applyFilters(result, {
    brands: params.brands.length > 0 ? params.brands : undefined,
    categories: params.categories && params.categories.length > 0 ? params.categories : undefined,
    offerOnly: params.offerOnly,
  });
};

export const availableCategoryIds = (
  products: Product[],
  params: { q: string; brands: string[]; offerOnly: boolean }
): Set<string> => {
  return new Set(productsMatchingAncestors(products, params).map((p) => p.categoryId));
};

export const availableSubcategoryIds = (
  products: Product[],
  params: { q: string; brands: string[]; categories: string[]; offerOnly: boolean }
): Set<string> => {
  return new Set(
    productsMatchingAncestors(products, params)
      .map((p) => p.subcategoryId)
      .filter(Boolean)
  );
};

export const normalizeCatalogParams = (
  params: CatalogParams,
  products: Product[],
  validBrandIds: Set<string>,
  options?: { resetPage?: boolean }
): CatalogParams => {
  const brands = params.brands.filter((id) => validBrandIds.has(id));
  const catIds = availableCategoryIds(products, {
    q: params.q,
    brands,
    offerOnly: params.offerOnly,
  });
  const categories = params.categories.filter((id) => catIds.has(id));
  const subIds = availableSubcategoryIds(products, {
    q: params.q,
    brands,
    categories,
    offerOnly: params.offerOnly,
  });
  const subcategories = params.subcategories.filter((id) => subIds.has(id));

  let filtered = products;
  if (params.q.trim()) {
    filtered = filtered.filter((p) => matchesQuery(p, params.q));
  }
  filtered = applyFilters(filtered, {
    brands: brands.length > 0 ? brands : undefined,
    categories: categories.length > 0 ? categories : undefined,
    subcategories: subcategories.length > 0 ? subcategories : undefined,
    offerOnly: params.offerOnly,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = options?.resetPage ? 1 : clampPage(params.page, totalPages);

  return {
    q: params.q,
    brands,
    categories,
    subcategories,
    offerOnly: params.offerOnly,
    sort: params.sort,
    page,
  };
};

export const normalizeCatalogSearchParams = (
  searchParams: URLSearchParams,
  products: Product[],
  validBrandIds: Set<string>,
  options?: { resetPage?: boolean }
): URLSearchParams => {
  return writeCatalogParams(
    normalizeCatalogParams(readCatalogParams(searchParams), products, validBrandIds, options)
  );
};
