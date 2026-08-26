import { Product, Brand, Catalog, Category, Subcategory, PriceList, AdminOrder } from '../types';
import { products as initialProducts } from '../data/mocks/products';
import { brands as initialBrands } from '../data/mocks/brands';
import { categories as initialCategories } from '../data/mocks/categories';
import { subcategories as initialSubcategories } from '../data/mocks/subcategories';
import { catalogs as initialCatalogs } from '../data/mocks/catalogs';
import { priceLists as initialPriceLists } from '../data/mocks/priceLists';
import { orders as initialOrders } from '../data/mocks/orders';
import { checkCatalogInvariants } from '../utils/catalogInvariants';

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

const STORAGE_KEY = 'pietra_admin_store';
const STORE_VERSION = 4;

const LEGACY_CATEGORY_IDS: Record<string, string> = {
  'pietra-herramientas': 'herramientas',
  'pietra-plomeria': 'plomeria',
  'pietra-bano': 'bano',
  'mota-manuales': 'herramientas-manuales',
  'mota-corte': 'corte-perforacion',
  'mota-medicion': 'medicion',
  'fv-griferia': 'griferia',
  'fv-repuestos': 'repuestos',
  'fv-valvulas': 'valvulas',
};

const defaultBanners = (): Banner[] => [
  {
    id: 'banner-1',
    title: 'Nuevos Catálogos 2024',
    subtitle: 'Descubrí nuestra nueva colección de productos',
    imageUrl: '/uploads/banner%20principal.jpg',
    buttonText: 'Ver Catálogos',
    buttonLink: '/catalogo',
  },
  {
    id: 'banner-2',
    title: 'Ofertas Especiales',
    subtitle: 'Aprovechá descuentos exclusivos en productos seleccionados',
    imageUrl: '/uploads/portadaCatalogo.png',
    buttonText: 'Ver Ofertas',
    buttonLink: '/ofertas',
  },
];

let adminProducts: Product[] = JSON.parse(JSON.stringify(initialProducts));
let adminBrands: Brand[] = JSON.parse(JSON.stringify(initialBrands));
let adminCategories: Category[] = JSON.parse(JSON.stringify(initialCategories));
let adminSubcategories: Subcategory[] = JSON.parse(JSON.stringify(initialSubcategories));
let adminCatalogs: Catalog[] = JSON.parse(JSON.stringify(initialCatalogs));
let adminBanners: Banner[] = defaultBanners();
let adminPriceLists: PriceList[] = JSON.parse(JSON.stringify(initialPriceLists));
let adminOrders: AdminOrder[] = JSON.parse(JSON.stringify(initialOrders));
let loadedSubcategoriesFromStorage = false;
let loadedPriceListsFromStorage = false;
let loadedOrdersFromStorage = false;

const normalizeBrands = (): void => {
  adminBrands = JSON.parse(JSON.stringify(initialBrands));
};

type LegacyProduct = Product & {
  subcategoryId?: string;
  isOffer?: boolean;
  isFeatured?: boolean;
};

const normalizeProducts = (): void => {
  const validCategoryIds = new Set(adminCategories.map((c) => c.id));
  const validBrandIds = new Set(adminBrands.map((b) => b.id));
  const firstCategory = [...adminCategories].sort((a, b) => a.order - b.order)[0];
  const firstBrand = adminBrands[0];

  adminProducts = adminProducts.map((raw) => {
    const product = raw as LegacyProduct;
    let brandId = product.brandId;
    if (!brandId || !validBrandIds.has(brandId)) {
      brandId = firstBrand?.id || brandId;
    }

    let categoryId = LEGACY_CATEGORY_IDS[product.categoryId] || product.categoryId;
    if (!categoryId || !validCategoryIds.has(categoryId)) {
      categoryId = firstCategory?.id || categoryId;
    }

    const subsForCategory = adminSubcategories
      .filter((s) => s.categoryId === categoryId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const currentSub = adminSubcategories.find((s) => s.id === product.subcategoryId);
    let subcategoryId = product.subcategoryId;
    if (!subcategoryId || !currentSub || currentSub.categoryId !== categoryId) {
      subcategoryId = subsForCategory[0]?.id || subcategoryId || '';
    }

    const isOffer =
      typeof product.isOffer === 'boolean'
        ? product.isOffer
        : product.priceOffer !== undefined && product.priceOffer < product.priceList;
    const isFeatured = typeof product.isFeatured === 'boolean' ? product.isFeatured : false;

    return {
      ...product,
      brandId,
      categoryId,
      subcategoryId,
      isOffer,
      isFeatured,
    };
  });
};

const normalizeCategories = (): void => {
  adminCategories = JSON.parse(JSON.stringify(initialCategories));
};

const normalizeSubcategories = (): void => {
  adminSubcategories = JSON.parse(JSON.stringify(initialSubcategories));
};

const normalizeCatalogs = (): void => {
  adminCatalogs = JSON.parse(JSON.stringify(initialCatalogs));
};

const normalizeData = (): void => {
  normalizeBrands();
  normalizeCategories();
  if (!loadedSubcategoriesFromStorage) {
    normalizeSubcategories();
  }
  normalizeProducts();
  normalizeCatalogs();
  if (!loadedPriceListsFromStorage) {
    adminPriceLists = JSON.parse(JSON.stringify(initialPriceLists));
  }
  if (!loadedOrdersFromStorage) {
    adminOrders = JSON.parse(JSON.stringify(initialOrders));
  }
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.version !== STORE_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        if (data.products) adminProducts = data.products;
        if (data.catalogs) adminCatalogs = data.catalogs;
        if (data.banners) adminBanners = data.banners;
        if (Array.isArray(data.subcategories) && data.subcategories.length > 0) {
          adminSubcategories = data.subcategories;
          loadedSubcategoriesFromStorage = true;
        }
        if (Array.isArray(data.priceLists)) {
          adminPriceLists = data.priceLists;
          loadedPriceListsFromStorage = true;
        }
        if (Array.isArray(data.orders)) {
          adminOrders = data.orders;
          loadedOrdersFromStorage = true;
        }
      }
    }
  } catch (e) {
    console.error('Error loading admin store:', e);
  }

  normalizeData();

  const invariantIssues = checkCatalogInvariants({
    brands: adminBrands,
    categories: adminCategories,
    subcategories: adminSubcategories,
    products: adminProducts,
  });
  if (invariantIssues.length > 0) {
    console.warn('[catalog invariants]', invariantIssues);
  }
  if (typeof window !== 'undefined') {
    (window as Window & { __catalogInvariantCount?: number }).__catalogInvariantCount =
      invariantIssues.length;
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORE_VERSION,
        products: adminProducts,
        brands: adminBrands,
        categories: adminCategories,
        subcategories: adminSubcategories,
        catalogs: adminCatalogs,
        banners: adminBanners,
        priceLists: adminPriceLists,
        orders: adminOrders,
      })
    );
  } catch (e) {
    console.error('Error saving admin store:', e);
  }
};

loadFromStorage();

export const getProducts = (): Product[] => [...adminProducts];
export const getProduct = (id: string): Product | undefined =>
  adminProducts.find((p) => p.id === id);
export const getProductsByCategory = (categoryId: string): Product[] =>
  adminProducts.filter((p) => p.categoryId === categoryId);
export const createProduct = (product: Product): void => {
  adminProducts.push(product);
  saveToStorage();
};
export const updateProduct = (id: string, updates: Partial<Product>): void => {
  const index = adminProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    adminProducts[index] = { ...adminProducts[index], ...updates };
    saveToStorage();
  }
};
export const deleteProduct = (id: string): void => {
  adminProducts = adminProducts.filter((p) => p.id !== id);
  saveToStorage();
};

export const getBrands = (): Brand[] => [...adminBrands];
export const getBrand = (id: string): Brand | undefined =>
  adminBrands.find((b) => b.id === id);
export const updateBrand = (id: string, updates: Partial<Brand>): void => {
  const index = adminBrands.findIndex((b) => b.id === id);
  if (index !== -1) {
    const { id: _, ...safeUpdates } = updates;
    adminBrands[index] = { ...adminBrands[index], ...safeUpdates };
    saveToStorage();
  }
};

export const getCategories = (): Category[] => [...adminCategories];
export const getCategory = (id: string): Category | undefined =>
  adminCategories.find((c) => c.id === id);

export const getCategoriesByBrand = (brandId: string): Category[] => {
  const categoryIds = new Set(
    adminProducts.filter((p) => p.brandId === brandId).map((p) => p.categoryId)
  );
  return adminCategories
    .filter((c) => categoryIds.has(c.id))
    .sort((a, b) => a.order - b.order);
};

export const getCategoriesForBrand = getCategoriesByBrand;

export const createCategory = (category: Category): void => {
  const exists = adminCategories.find(
    (c) => c.name.toLowerCase() === category.name.toLowerCase()
  );
  if (!exists) {
    adminCategories.push(category);
    saveToStorage();
  }
};
export const updateCategory = (id: string, updates: Partial<Category>): void => {
  const index = adminCategories.findIndex((c) => c.id === id);
  if (index !== -1) {
    adminCategories[index] = { ...adminCategories[index], ...updates };
    saveToStorage();
  }
};
export const deleteCategory = (id: string): void => {
  const hasProducts = adminProducts.some((p) => p.categoryId === id);
  if (hasProducts) {
    console.warn('No se puede eliminar un rubro que tiene productos asignados');
    return;
  }
  adminCategories = adminCategories.filter((c) => c.id !== id);
  saveToStorage();
};

export const getSubcategories = (): Subcategory[] =>
  [...adminSubcategories].sort((a, b) => {
    const byName = a.name.localeCompare(b.name, 'es');
    if (byName !== 0) return byName;
    return (a.order ?? 0) - (b.order ?? 0);
  });
export const getSubcategory = (id: string): Subcategory | undefined =>
  adminSubcategories.find((s) => s.id === id);
export const getSubcategoriesByCategory = (categoryId: string): Subcategory[] =>
  adminSubcategories
    .filter((s) => s.categoryId === categoryId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
export const createSubcategory = (subcategory: Subcategory): void => {
  adminSubcategories.push(subcategory);
  saveToStorage();
};
export const updateSubcategory = (id: string, updates: Partial<Subcategory>): void => {
  const index = adminSubcategories.findIndex((s) => s.id === id);
  if (index !== -1) {
    const { id: _, ...safeUpdates } = updates;
    adminSubcategories[index] = { ...adminSubcategories[index], ...safeUpdates };
    saveToStorage();
  }
};
export const deleteSubcategory = (id: string): boolean => {
  const hasProducts = adminProducts.some((p) => p.subcategoryId === id);
  if (hasProducts) {
    console.warn('No se puede eliminar un subrubro que tiene productos asignados');
    return false;
  }
  adminSubcategories = adminSubcategories.filter((s) => s.id !== id);
  saveToStorage();
  return true;
};
export const deleteSubcategories = (ids: string[]): { deleted: number; blocked: number } => {
  let deleted = 0;
  let blocked = 0;
  ids.forEach((id) => {
    if (deleteSubcategory(id)) deleted += 1;
    else blocked += 1;
  });
  return { deleted, blocked };
};

export const getPriceLists = (): PriceList[] =>
  [...adminPriceLists].sort((a, b) => a.order - b.order);
export const getPriceList = (id: string): PriceList | undefined =>
  adminPriceLists.find((l) => l.id === id);
export const createPriceList = (list: PriceList): void => {
  adminPriceLists.push(list);
  saveToStorage();
};
export const updatePriceList = (id: string, updates: Partial<PriceList>): void => {
  const index = adminPriceLists.findIndex((l) => l.id === id);
  if (index !== -1) {
    adminPriceLists[index] = { ...adminPriceLists[index], ...updates };
    saveToStorage();
  }
};
export const deletePriceList = (id: string): void => {
  adminPriceLists = adminPriceLists.filter((l) => l.id !== id);
  saveToStorage();
};

export const getOrders = (): AdminOrder[] => [...adminOrders];
export const getOrder = (id: string): AdminOrder | undefined =>
  adminOrders.find((o) => o.id === id);

export const getCatalogs = (): Catalog[] => [...adminCatalogs];
export const getCatalog = (id: string): Catalog | undefined =>
  adminCatalogs.find((c) => c.id === id);
export const createCatalog = (catalog: Catalog): void => {
  adminCatalogs.push(catalog);
  saveToStorage();
};
export const updateCatalog = (id: string, updates: Partial<Catalog>): void => {
  const index = adminCatalogs.findIndex((c) => c.id === id);
  if (index !== -1) {
    adminCatalogs[index] = { ...adminCatalogs[index], ...updates };
    saveToStorage();
  }
};
export const deleteCatalog = (id: string): void => {
  adminCatalogs = adminCatalogs.filter((c) => c.id !== id);
  saveToStorage();
};

export const getBanners = (): Banner[] => [...adminBanners];
export const getBanner = (id: string): Banner | undefined =>
  adminBanners.find((b) => b.id === id);
export const createBanner = (banner: Banner): void => {
  adminBanners.push(banner);
  saveToStorage();
};
export const updateBanner = (id: string, updates: Partial<Banner>): void => {
  const index = adminBanners.findIndex((b) => b.id === id);
  if (index !== -1) {
    adminBanners[index] = { ...adminBanners[index], ...updates };
    saveToStorage();
  }
};
export const deleteBanner = (id: string): void => {
  adminBanners = adminBanners.filter((b) => b.id !== id);
  saveToStorage();
};
