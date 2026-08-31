import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCurrentClient } from '../store/clientStore';
import { getProducts } from '../store/adminStore';

const Favoritos = () => {
  const client = getCurrentClient();
  const allProducts = getProducts();

  const favoriteProducts = useMemo(() => {
    if (!client) return [];
    return allProducts.filter((p) => client.favorites.includes(p.id));
  }, [client, allProducts]);

  if (!client) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acceso requerido</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tus favoritos.</p>
          <Link to="/login" className="btn-primary">
            Ingresar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brandBlue mb-6">Mis Favoritos</h1>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 mb-4">
            Todavía no agregaste favoritos.
          </p>
          <p className="text-gray-500 mb-6">
            Explorá nuestros productos y agregá los que más te gusten haciendo clic en el corazón ❤️
          </p>
          <Link to="/buscar" className="btn-primary">
            Ver productos
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favoritos;
