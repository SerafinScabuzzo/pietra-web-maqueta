import { useSearchParams } from 'react-router-dom';
import { getBrands, getCategories, getProducts, getSubcategories } from '../store/adminStore';
import { normalizeCatalogSearchParams, readCatalogParams } from '../utils/catalogParams';

const ActiveFiltersChips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brands = getBrands();
  const categories = getCategories();
  const subcategories = getSubcategories();
  const products = getProducts();
  const validBrandIds = new Set(brands.map((b) => b.id));
  const params = readCatalogParams(searchParams);

  const selectedBrands = params.brands;
  const selectedCategories = params.categories;
  const selectedSubcategories = params.subcategories;
  const offerOnly = params.offerOnly;
  const sort = params.sort;

  const commit = (mutate: (draft: URLSearchParams) => void) => {
    const draft = new URLSearchParams(searchParams);
    mutate(draft);
    setSearchParams(normalizeCatalogSearchParams(draft, products, validBrandIds, { resetPage: true }));
  };

  const removeMulti = (key: 'brand' | 'category' | 'subcategory', id: string) => {
    commit((draft) => {
      const current = draft.getAll(key);
      draft.delete(key);
      current.filter((item) => item !== id).forEach((item) => draft.append(key, item));
    });
  };

  const removeOffer = () => {
    commit((draft) => {
      draft.delete('offer');
    });
  };

  const removeSort = () => {
    commit((draft) => {
      draft.delete('sort');
    });
  };

  const clearAll = () => {
    commit((draft) => {
      draft.delete('brand');
      draft.delete('category');
      draft.delete('subcategory');
      draft.delete('offer');
      draft.delete('sort');
      draft.delete('page');
    });
  };

  const hasFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSubcategories.length > 0 ||
    offerOnly ||
    sort !== null;

  if (!hasFilters) return null;

  const sortLabels: Record<string, string> = {
    name_asc: 'Nombre (A-Z)',
    price_asc: 'Precio (Menor a Mayor)',
    price_desc: 'Precio (Mayor a Menor)',
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Filtros activos:</span>

      {selectedBrands.map((brandId) => {
        const brand = brands.find((b) => b.id === brandId);
        if (!brand) return null;
        return (
          <span
            key={`brand-${brandId}`}
            className="inline-flex items-center gap-2 bg-brandBlue text-white px-3 py-1 rounded-full text-sm"
          >
            {brand.name}
            <button
              onClick={() => removeMulti('brand', brandId)}
              className="hover:text-brandGray-light"
              aria-label={`Quitar filtro ${brand.name}`}
            >
              ×
            </button>
          </span>
        );
      })}

      {selectedCategories.map((categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return null;
        return (
          <span
            key={`category-${categoryId}`}
            className="inline-flex items-center gap-2 bg-brandBlue text-white px-3 py-1 rounded-full text-sm"
          >
            {category.name}
            <button
              onClick={() => removeMulti('category', categoryId)}
              className="hover:text-brandGray-light"
              aria-label={`Quitar filtro ${category.name}`}
            >
              ×
            </button>
          </span>
        );
      })}

      {selectedSubcategories.map((subId) => {
        const sub = subcategories.find((s) => s.id === subId);
        if (!sub) return null;
        return (
          <span
            key={`subcategory-${subId}`}
            className="inline-flex items-center gap-2 bg-brandBlue text-white px-3 py-1 rounded-full text-sm"
          >
            {sub.name}
            <button
              onClick={() => removeMulti('subcategory', subId)}
              className="hover:text-brandGray-light"
              aria-label={`Quitar filtro ${sub.name}`}
            >
              ×
            </button>
          </span>
        );
      })}

      {offerOnly && (
        <span className="inline-flex items-center gap-2 bg-brandOrange text-white px-3 py-1 rounded-full text-sm">
          Solo ofertas
          <button
            onClick={removeOffer}
            className="hover:text-brandOrange-light"
            aria-label="Quitar filtro solo ofertas"
          >
            ×
          </button>
        </span>
      )}

      {sort && (
        <span className="inline-flex items-center gap-2 bg-brandBlue text-white px-3 py-1 rounded-full text-sm">
          {sortLabels[sort] || sort}
          <button
            onClick={removeSort}
            className="hover:text-brandGray-light"
            aria-label="Quitar ordenamiento"
          >
            ×
          </button>
        </span>
      )}

      <button
        onClick={clearAll}
        className="text-sm text-brandBlue hover:text-brandBlue-dark font-medium underline"
      >
        Limpiar todo
      </button>
    </div>
  );
};

export default ActiveFiltersChips;
