import { Brand, Category, Product, Subcategory } from '../types';

export interface CatalogInvariantIssue {
  code: string;
  message: string;
}

export function checkCatalogInvariants(input: {
  brands: Brand[];
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
}): CatalogInvariantIssue[] {
  const issues: CatalogInvariantIssue[] = [];
  const brandIds = new Set(input.brands.map((b) => b.id));
  const categoryIds = new Set(input.categories.map((c) => c.id));
  const subById = new Map(input.subcategories.map((s) => [s.id, s]));

  for (const category of input.categories) {
    if (Object.prototype.hasOwnProperty.call(category, 'brandId')) {
      issues.push({
        code: 'category-has-brandId',
        message: `El rubro ${category.id} todavía tiene brandId`,
      });
    }
  }

  for (const sub of input.subcategories) {
    if (!categoryIds.has(sub.categoryId)) {
      issues.push({
        code: 'sub-parent-missing',
        message: `El subrubro ${sub.id} apunta a rubro inexistente ${sub.categoryId}`,
      });
    }
  }

  for (const product of input.products) {
    if (!brandIds.has(product.brandId)) {
      issues.push({
        code: 'product-brand',
        message: `Producto ${product.id}: marca ${product.brandId} no existe`,
      });
    }
    if (!categoryIds.has(product.categoryId)) {
      issues.push({
        code: 'product-category',
        message: `Producto ${product.id}: rubro ${product.categoryId} no existe`,
      });
    }
    const sub = subById.get(product.subcategoryId);
    if (!sub) {
      issues.push({
        code: 'product-sub',
        message: `Producto ${product.id}: subrubro ${product.subcategoryId} no existe`,
      });
    } else if (sub.categoryId !== product.categoryId) {
      issues.push({
        code: 'product-sub-parent',
        message: `Producto ${product.id}: subcategory.categoryId !== product.categoryId`,
      });
    }
    if (typeof product.isOffer !== 'boolean') {
      issues.push({
        code: 'product-isOffer',
        message: `Producto ${product.id}: isOffer no está definido`,
      });
    }
    if (typeof product.isFeatured !== 'boolean') {
      issues.push({
        code: 'product-isFeatured',
        message: `Producto ${product.id}: isFeatured no está definido`,
      });
    }
  }

  return issues;
}
