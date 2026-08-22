import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBrands, getCategories } from '../store/adminStore';

const OfferFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const brands = getBrands();
  const categories = getCategories();

  const selectedBrands = searchParams.getAll('brand');
  const selectedCategories = searchParams.getAll('category');
  const sort = searchParams.get('sort') || 'discount_desc';

  const handleBrandToggle = (brandId: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentBrands = newParams.getAll('brand');
    
    if (currentBrands.includes(brandId)) {
      const filtered = currentBrands.filter((b) => b !== brandId);
      newParams.delete('brand');
      filtered.forEach((b) => newParams.append('brand', b));
    } else {
      newParams.append('brand', brandId);
    }
    
    setSearchParams(newParams);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentCategories = newParams.getAll('category');
    
    if (currentCategories.includes(categoryId)) {
      const filtered = currentCategories.filter((c) => c !== categoryId);
      newParams.delete('category');
      filtered.forEach((c) => newParams.append('category', c));
    } else {
      newParams.append('category', categoryId);
    }
    
    setSearchParams(newParams);
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('brand');
    newParams.delete('category');
    newParams.set('sort', 'discount_desc');
    setSearchParams(newParams);
  };

  const hasActiveFilters = selectedBrands.length > 0 || selectedCategories.length > 0;

  const filtersContent = (
    <div className="space-y-6">
      {/* Ordenar */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ordenar por</h3>
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandOrange focus:border-brandOrange hover:border-brandOrange transition-colors"
        >
          <option value="discount_desc">Mayor descuento</option>
          <option value="price_asc">Menor precio</option>
          <option value="price_desc">Mayor precio</option>
          <option value="name_asc">Nombre (A-Z)</option>
        </select>
      </div>

      {/* Marcas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Marcas</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.id)}
                onChange={() => handleBrandToggle(brand.id)}
                className="w-5 h-5 text-brandOrange border-gray-300 rounded focus:ring-brandOrange hover:border-brandOrange transition-colors"
              />
              <span className="ml-3 text-gray-700">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rubros */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Rubros</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="w-5 h-5 text-brandOrange border-gray-300 rounded focus:ring-brandOrange hover:border-brandOrange transition-colors"
              />
              <span className="ml-3 text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Limpiar filtros */}
      {hasActiveFilters && (
        <button 
          onClick={handleClearFilters} 
          className="w-full bg-white text-brandOrange border-2 border-brandOrange px-4 py-2 rounded-lg font-medium hover:bg-brandOrange hover:text-white transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: Panel lateral */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white/70 backdrop-blur-md border border-slate-200/70 rounded-lg shadow-sm p-6 sticky top-24 border-l-4 border-brandOrange">
          <h2 className="text-xl font-bold text-blue-900 mb-6">
            <span className="text-brandOrange">Filtros</span>
          </h2>
          {filtersContent}
        </div>
      </aside>

      {/* Mobile: Botón y panel colapsable */}
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
          <div className="mt-4 bg-white/70 backdrop-blur-md border border-slate-200/70 rounded-lg shadow-sm p-6">
            {filtersContent}
          </div>
        )}
      </div>
    </>
  );
};

export default OfferFilters;
