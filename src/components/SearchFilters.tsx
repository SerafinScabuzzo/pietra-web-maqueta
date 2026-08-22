import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBrands, getCategories, getProducts, getSubcategories } from '../store/adminStore';
import {
  availableCategoryIds,
  availableSubcategoryIds,
  normalizeCatalogSearchParams,
  readCatalogParams,
} from '../utils/catalogParams';

interface SearchFiltersProps {
  onClose?: () => void;
}

const SearchFilters = ({ onClose: _onClose }: SearchFiltersProps) => {
  void _onClose;
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const products = getProducts();
  const brands = getBrands();
  const validBrandIds = new Set(brands.map((b) => b.id));
  const params = readCatalogParams(searchParams);

  const selectedBrands = params.brands;
  const selectedCategories = params.categories;
  const selectedSubcategories = params.subcategories;
  const offerOnly = params.offerOnly;
  const sort = params.sort || '';

  const visibleCategoryIds = availableCategoryIds(products, {
    q: params.q,
    brands: selectedBrands,
    offerOnly,
  });
  const visibleCategories = getCategories()
    .filter((c) => visibleCategoryIds.has(c.id))
    .sort((a, b) => a.order - b.order);

  const visibleSubcategoryIds = availableSubcategoryIds(products, {
    q: params.q,
    brands: selectedBrands,
    categories: selectedCategories,
    offerOnly,
  });
  const visibleSubcategories = getSubcategories()
    .filter((s) => visibleSubcategoryIds.has(s.id))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const commit = (mutate: (draft: URLSearchParams) => void) => {
    const draft = new URLSearchParams(searchParams);
    mutate(draft);
    setSearchParams(normalizeCatalogSearchParams(draft, products, validBrandIds, { resetPage: true }));
  };

  const toggleMulti = (key: 'brand' | 'category' | 'subcategory', id: string) => {
    commit((draft) => {
      const current = draft.getAll(key);
      draft.delete(key);
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      next.forEach((item) => draft.append(key, item));
    });
  };

  const handleOfferToggle = (checked: boolean) => {
    commit((draft) => {
      if (checked) draft.set('offer', '1');
      else draft.delete('offer');
    });
  };

  const handleSortChange = (value: string) => {
    commit((draft) => {
      if (value) draft.set('sort', value);
      else draft.delete('sort');
    });
  };

  const handleClearFilters = () => {
    commit((draft) => {
      draft.delete('brand');
      draft.delete('category');
      draft.delete('subcategory');
      draft.delete('offer');
      draft.delete('sort');
      draft.delete('page');
    });
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSubcategories.length > 0 ||
    offerOnly ||
    sort !== '';

  const filtersContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ordenar por</h3>
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue"
        >
          <option value="">Por defecto (Pietra A–Z)</option>
          <option value="name_asc">Nombre (A-Z)</option>
          <option value="price_asc">Precio (Menor a Mayor)</option>
          <option value="price_desc">Precio (Mayor a Menor)</option>
        </select>
      </div>

      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={offerOnly}
            onChange={(e) => handleOfferToggle(e.target.checked)}
            className="w-5 h-5 text-brandOrange border-gray-300 rounded focus:ring-brandOrange"
          />
          <span className="ml-3 text-gray-700 font-medium">Solo ofertas</span>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Marcas</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.id)}
                onChange={() => toggleMulti('brand', brand.id)}
                className="w-5 h-5 text-brandBlue border-gray-300 rounded focus:ring-brandBlue"
              />
              <span className="ml-3 text-gray-700">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Rubros</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {visibleCategories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleMulti('category', category.id)}
                className="w-5 h-5 text-brandBlue border-gray-300 rounded focus:ring-brandBlue"
              />
              <span className="ml-3 text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Subrubros</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {visibleSubcategories.length > 0 ? (
            visibleSubcategories.map((sub) => (
              <label key={sub.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub.id)}
                  onChange={() => toggleMulti('subcategory', sub.id)}
                  className="w-5 h-5 text-brandBlue border-gray-300 rounded focus:ring-brandBlue"
                />
                <span className="ml-3 text-gray-700">{sub.name}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No hay subrubros para los filtros actuales.</p>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={handleClearFilters} className="w-full btn-secondary">
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h2 className="text-xl font-bold text-brandBlue mb-6">Filtros</h2>
          {filtersContent}
        </div>
      </aside>

      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full btn-secondary flex items-center justify-between"
        >
          <span>Filtros</span>
          <svg
            className={`w-5 h-5 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showMobileFilters && (
          <div className="mt-4 bg-white rounded-lg shadow-md p-6">
            {filtersContent}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFilters;
