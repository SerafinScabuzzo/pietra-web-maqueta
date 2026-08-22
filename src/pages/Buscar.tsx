import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchFilters from '../components/SearchFilters';
import ActiveFiltersChips from '../components/ActiveFiltersChips';
import CartPanel from '../components/CartPanel';
import { getBrands, getProducts } from '../store/adminStore';
import { getAuth } from '../utils/auth';
import { matchesQuery, applyFilters, applySort, applyDefaultSort } from '../utils/search';
import {
  PAGE_SIZE,
  readCatalogParams,
  writeCatalogParams,
  normalizeCatalogSearchParams,
} from '../utils/catalogParams';

const Buscar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(() => getAuth().isClient);
  const products = useMemo(() => getProducts(), []);
  const validBrandIds = useMemo(() => new Set(getBrands().map((b) => b.id)), []);

  useEffect(() => {
    const sync = () => setIsClient(getAuth().isClient);
    window.addEventListener('pietra_auth_changed', sync);
    return () => window.removeEventListener('pietra_auth_changed', sync);
  }, []);

  useEffect(() => {
    const normalized = normalizeCatalogSearchParams(searchParams, products, validBrandIds);
    if (normalized.toString() !== searchParams.toString()) {
      setSearchParams(normalized, { replace: true });
    }
  }, [searchParams, setSearchParams, products, validBrandIds]);

  const params = readCatalogParams(searchParams);
  const { q: query, brands, categories, subcategories, offerOnly, sort, page: rawPage } = params;

  const filteredProducts = useMemo(() => {
    let result = products;

    if (query.trim()) {
      result = result.filter((p) => matchesQuery(p, query));
    }

    result = applyFilters(result, {
      brands: brands.length > 0 ? brands : undefined,
      categories: categories.length > 0 ? categories : undefined,
      subcategories: subcategories.length > 0 ? subcategories : undefined,
      offerOnly,
    });

    if (sort) {
      result = applySort(result, sort);
    } else {
      result = applyDefaultSort(result);
    }

    return result;
  }, [query, brands, categories, subcategories, offerOnly, sort, products]);

  const total = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = rawPage > totalPages ? 1 : rawPage;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = filteredProducts.slice(start, start + PAGE_SIZE);
  const showingFrom = total === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PAGE_SIZE, total);

  const goToPage = (nextPage: number) => {
    setSearchParams(writeCatalogParams({ ...params, page: nextPage }));
  };

  const handleClear = () => {
    navigate('/buscar', { replace: true });
  };

  const hasActiveFilters =
    query.trim() ||
    brands.length > 0 ||
    categories.length > 0 ||
    subcategories.length > 0 ||
    offerOnly ||
    sort !== null;

  const catalogTitle = isClient ? 'ARMAR PEDIDO' : 'PRODUCTOS';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          {query.trim() ? (
            <>
              <h1 className="text-3xl font-bold text-brandBlue mb-2">{catalogTitle}</h1>
              <p className="text-gray-600">
                Resultados para: <span className="text-gray-800 font-medium">{query}</span>
                {' · '}
                {total} {total === 1 ? 'producto' : 'productos'}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-brandBlue mb-2">{catalogTitle}</h1>
              <p className="text-gray-600">
                {total} {total === 1 ? 'producto' : 'productos'} disponibles
              </p>
            </>
          )}
        </div>
        <button
          onClick={handleClear}
          className="btn-secondary whitespace-nowrap"
          disabled={!hasActiveFilters}
        >
          Limpiar
        </button>
      </div>

      <div className={`flex flex-col lg:flex-row gap-6 ${isClient ? 'lg:items-start' : 'gap-8'}`}>
        <SearchFilters />

        <div className="flex-1 min-w-0">
          <ActiveFiltersChips />

          {total > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Mostrando {showingFrom} a {showingTo} de {total}
              </p>

              <div className={`grid grid-cols-1 sm:grid-cols-2 ${isClient ? 'xl:grid-cols-2' : 'lg:grid-cols-2 xl:grid-cols-3'} gap-6`}>
                {pageProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Paginación">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goToPage(n)}
                      className={
                        n === currentPage
                          ? 'bg-brandBlue text-white px-4 py-2 rounded-lg font-medium'
                          : 'btn-secondary'
                      }
                      aria-current={n === currentPage ? 'page' : undefined}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                {query.trim() ? `No se encontraron productos para "${query}"` : 'No hay productos disponibles'}
              </p>
              <p className="text-gray-500 mb-6">
                {query.trim()
                  ? 'Intentá con otros términos de búsqueda o revisá los filtros aplicados.'
                  : 'Ajustá los filtros para ver más resultados.'}
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleClear} className="btn-secondary">
                  Limpiar filtros
                </button>
                <button onClick={() => navigate('/')} className="btn-primary">
                  Volver al inicio
                </button>
              </div>
            </div>
          )}
        </div>

        {isClient && <CartPanel />}
      </div>
    </div>
  );
};

export default Buscar;
