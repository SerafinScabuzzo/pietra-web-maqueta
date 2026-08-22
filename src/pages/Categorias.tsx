import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { getCategories } from '../store/adminStore';

const Categorias = () => {
  const categories = [...getCategories()].sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brandBlue mb-8">Categorías</h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              to={`/categorias/${category.id}`}
              name={category.name}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">No hay categorías disponibles.</p>
      )}

      <p className="mt-8 text-sm text-gray-500">
        <Link to="/" className="text-brandBlue hover:underline">
          Volver al inicio
        </Link>
      </p>
    </div>
  );
};

export default Categorias;
