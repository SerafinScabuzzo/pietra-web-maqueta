import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import CatalogCard from '../components/CatalogCard';
import OffersLoginModal from '../components/OffersLoginModal';
import { getBanners, getProducts, getCategories, getCatalogs } from '../store/adminStore';
import { getAuth } from '../utils/auth';

const Home = () => {
  const navigate = useNavigate();
  const products = getProducts();
  const banners = getBanners();
  const catalogs = getCatalogs();
  const [showOffersGate, setShowOffersGate] = useState(false);

  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.isFeatured === true).slice(0, 6);
  }, [products]);

  const offerProducts = useMemo(() => {
    return products.filter((p) => p.isOffer === true).slice(0, 6);
  }, [products]);

  const homeCategories = useMemo(() => {
    return [...getCategories()].sort((a, b) => a.order - b.order).slice(0, 12);
  }, []);

  const handleSeeAllOffers = () => {
    if (getAuth().isClient) {
      navigate('/buscar?offer=1');
      return;
    }
    setShowOffersGate(true);
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero / banners */}
      <section className="mb-8 sm:mb-12">
        <BannerSlider banners={banners} />
      </section>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* 2. Rubros (estilo Genebre: entrada visual por familia) */}
        <section className="mb-12 sm:mb-16">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-brandOrange mb-1">Explorá por rubro</p>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Categorías</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {homeCategories.map((category) => (
              <CategoryCard
                key={category.id}
                to={`/categorias/${category.id}`}
                name={category.name}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link to="/categorias" className="btn-see-all">
              Ver todas →
            </Link>
          </div>
        </section>

        {/* 3. Catálogos */}
        <section className="mb-12 sm:mb-16">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-brandOrange mb-1">Descargas</p>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Catálogos</h2>
          </div>
          {catalogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {catalogs.slice(0, 3).map((catalog) => (
                <CatalogCard key={catalog.id} catalog={catalog} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No hay catálogos disponibles.</p>
          )}
          <div className="mt-8 flex justify-center">
            <Link to="/catalogo" className="btn-see-all">
              Ver todos →
            </Link>
          </div>
        </section>

        {/* 4. Destacados */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
            Productos destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {featuredProducts.length === 0 && (
            <p className="text-gray-600 text-center py-8">No hay productos destacados</p>
          )}
        </section>

        {/* 5. Ofertas */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
            Ofertas especiales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {offerProducts.length === 0 && (
            <p className="text-gray-600 text-center py-8">No hay ofertas disponibles</p>
          )}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button type="button" onClick={handleSeeAllOffers} className="btn-see-all">
              Ver todas →
            </button>
            <Link to="/buscar" className="btn-see-all-accent">
              Ver todos los productos
            </Link>
          </div>
        </section>
      </div>

      <OffersLoginModal
        isOpen={showOffersGate}
        onClose={() => setShowOffersGate(false)}
        onLogin={() => {
          setShowOffersGate(false);
          navigate('/login');
        }}
        onBecomeClient={() => {
          setShowOffersGate(false);
          navigate('/quiero-ser-cliente');
        }}
      />
    </div>
  );
};

export default Home;
