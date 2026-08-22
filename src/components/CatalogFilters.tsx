import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBrands } from '../store/adminStore';

const CatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const brands = getBrands();

  const selectedBrand = searchParams.get('brand') || '';
  const selectedType = searchParams.get('type') || '';
  const sort = searchParams.get('sort') || 'date_desc';

  const handleBrandChange = (brandId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (brandId) {
      newParams.set('brand', brandId);
    } else {
      newParams.delete('brand');
    }
    setSearchParams(newParams);
  };

  const handleTypeChange = (type: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (type) {
      newParams.set('type', type);
    } else {
      newParams.delete('type');
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
    newParams.delete('type');
    newParams.set('sort', 'date_desc');
    setSearchParams(newParams);
  };

  const hasActiveFilters = selectedBrand !== '' || selectedType !== '';

  const filtersContent = (
    <div className="space-y-6">
      {/* Ordenar */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ordenar por</h3>
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue"
        >
          <option value="date_desc">Fecha (Más reciente)</option>
          <option value="date_asc">Fecha (Más antiguo)</option>
          <option value="title_asc">Título (A-Z)</option>
          <option value="title_desc">Título (Z-A)</option>
        </select>
      </div>

      {/* Tipo/Rubro */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tipo/Rubro</h3>
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue"
        >
          <option value="">Todos</option>
          <option value="general">General</option>
          <option value="ofertas">Ofertas</option>
          <option value="nuevos">Nuevos</option>
          <option value="especializado">Especializado</option>
        </select>
      </div>

      {/* Marca */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Marca</h3>
        <select
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue"
        >
          <option value="">Todas</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Limpiar filtros */}
      {hasActiveFilters && (
        <button onClick={handleClearFilters} className="w-full btn-secondary">
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: Panel lateral */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h2 className="text-xl font-bold text-brandBlue mb-6">Filtros</h2>
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
          <div className="mt-4 bg-white rounded-lg shadow-md p-6">
            {filtersContent}
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogFilters;
