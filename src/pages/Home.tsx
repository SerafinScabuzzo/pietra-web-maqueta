import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductCard';
import OffersLoginModal from '../components/OffersLoginModal';
import { getBanners, getProducts } from '../store/adminStore';
import { getAuth } from '../utils/auth';

const Home = () => {
  const navigate = useNavigate();
  const products = getProducts();
  const banners = getBanners();
  const [showOffersGate, setShowOffersGate] = useState(false);

  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.isFeatured === true).slice(0, 6);
  }, [products]);

  const offerProducts = useMemo(() => {
    return products.filter((p) => p.isOffer === true).slice(0, 6);
  }, [products]);

  const handleSeeAllOffers = () => {
    if (getAuth().isClient) {
      navigate('/buscar?offer=1');
      return;
    }
    setShowOffersGate(true);
  };

  return (
    <div className="min-h-screen">
      <section className="mb-12">
        <BannerSlider banners={banners} />
      </section>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
            Productos destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {featuredProducts.length === 0 && (
            <p className="text-gray-600 text-center py-8">
              No hay productos destacados
            </p>
          )}
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Ofertas especiales
            </h2>
            <button
              type="button"
              onClick={handleSeeAllOffers}
              className="text-blue-800 hover:text-blue-900 font-medium"
            >
              Ver todas →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {offerProducts.length === 0 && (
            <p className="text-gray-600 text-center py-8">
              No hay ofertas disponibles
            </p>
          )}
          <div className="mt-8 text-center">
            <Link to="/buscar" className="btn-accent inline-block">
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
