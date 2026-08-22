import { Link, useParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { getCategory, getSubcategoriesByCategory } from '../store/adminStore';

const CategoriaRubro = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? getCategory(categoryId) : undefined;
  const subcategories = categoryId ? getSubcategoriesByCategory(categoryId) : [];

  if (!categoryId || !category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Rubro no encontrado</h1>
          <Link to="/categorias" className="btn-primary">
            Volver a Categorías
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-gray-600">
          <li>
            <Link to="/" className="hover:text-brandBlue transition-colors">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/categorias" className="hover:text-brandBlue transition-colors">
              Categorías
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-medium">{category.name}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-brandBlue mb-8">{category.name}</h1>

      {subcategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subcategories.map((sub) => (
            <CategoryCard
              key={sub.id}
              to={`/buscar?category=${encodeURIComponent(category.id)}&subcategory=${encodeURIComponent(sub.id)}`}
              name={sub.name}
              imageUrl={sub.imageUrl || category.imageUrl}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg mb-4">
            Todavía no hay subrubros en este rubro.
          </p>
          <Link to="/categorias" className="btn-primary">
            Ver otras categorías
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoriaRubro;
