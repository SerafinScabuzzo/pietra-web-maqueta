import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CatalogCard from '../components/CatalogCard';
import CatalogFilters from '../components/CatalogFilters';
import { getCatalogs } from '../store/adminStore';

const Catalogo = () => {
  const [searchParams] = useSearchParams();
  const catalogs = getCatalogs();

  const selectedBrand = searchParams.get('brand') || '';
  const selectedType = searchParams.get('type') || '';
  const sort = searchParams.get('sort') || 'date_desc';

  // Filtrar y ordenar catálogos
  const filteredCatalogs = useMemo(() => {
    let result = [...catalogs];

    // Filtro por marca
    if (selectedBrand) {
      result = result.filter((c) => c.brandId === selectedBrand);
    }

    // Filtro por tipo
    if (selectedType) {
      result = result.filter((c) => c.type === selectedType);
    }

    // Ordenamiento
    result.sort((a, b) => {
      switch (sort) {
        case 'date_desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date_asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title_asc':
          return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
        case 'title_desc':
          return b.title.localeCompare(a.title, 'es', { sensitivity: 'base' });
        default:
          return 0;
      }
    });

    return result;
  }, [selectedBrand, selectedType, sort, catalogs]);

  // Buscar el catálogo principal (Pietra 2025)
  const mainCatalog = catalogs.find((c) => c.id === 'catalog-2025-pietra');

  return (
    <div className="min-h-screen">
      {/* Banner principal del catálogo */}
      {mainCatalog && (
        <div className="relative w-full h-80 md:h-96 bg-brandGray overflow-hidden mb-8">
          <img 
            src="/uploads/banner principal.jpg" 
            alt="Catálogo Pietra 2025" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Catálogo Pietra 2025</h1>
              <a
                href={mainCatalog.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-block bg-brandOrange hover:bg-brandOrange-dark text-white"
              >
                Ver catálogo
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-brandBlue mb-6">Catálogos</h1>

        <div className="flex gap-8">
          {/* Filtros */}
          <CatalogFilters />

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            {filteredCatalogs.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">
                  {filteredCatalogs.length}{' '}
                  {filteredCatalogs.length === 1 ? 'catálogo' : 'catálogos'} disponible
                  {filteredCatalogs.length === 1 ? '' : 's'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCatalogs.map((catalog) => (
                    <CatalogCard key={catalog.id} catalog={catalog} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">
                  No se encontraron catálogos
                </p>
                <p className="text-gray-500 mb-6">
                  Intentá ajustar los filtros para ver más resultados.
                </p>
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('brand');
                    newParams.delete('type');
                    newParams.set('sort', 'date_desc');
                    window.location.search = newParams.toString();
                  }}
                  className="btn-secondary"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
