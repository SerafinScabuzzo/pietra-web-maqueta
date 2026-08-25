import { Link } from 'react-router-dom';
import {
  getProducts,
  getBrands,
  getCategories,
  getSubcategories,
  getCatalogs,
  getPriceLists,
  getBanners,
  getOrders,
} from '../../store/adminStore';
import { getClients } from '../../store/clientStore';

const AdminDashboard = () => {
  const products = getProducts();
  const brands = getBrands();
  const categories = getCategories();
  const subcategories = getSubcategories();
  const catalogs = getCatalogs();
  const priceLists = getPriceLists();
  const banners = getBanners();
  const clients = getClients();
  const orders = getOrders();

  const stats = [
    { label: 'Productos', count: products.length, link: '/admin/productos', color: 'bg-brandBlue' },
    { label: 'Marcas', count: brands.length, link: '/admin/marcas', color: 'bg-brandOrange' },
    { label: 'Rubros', count: categories.length, link: '/admin/rubros', color: 'bg-yellow-500' },
    { label: 'SubRubros', count: subcategories.length, link: '/admin/subrubros', color: 'bg-amber-700' },
    { label: 'Catálogos', count: catalogs.length, link: '/admin/catalogos', color: 'bg-green-600' },
    { label: 'Listas', count: priceLists.length, link: '/admin/listas', color: 'bg-teal-600' },
    { label: 'Banners', count: banners.length, link: '/admin/banners', color: 'bg-purple-600' },
    { label: 'Clientes', count: clients.length, link: '/admin/clientes', color: 'bg-red-600' },
    { label: 'Pedidos', count: orders.length, link: '/admin/pedidos', color: 'bg-slate-600' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-brandBlue mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`${stat.color} text-white rounded-lg p-4 mb-4`}>
              <h3 className="text-2xl font-bold">{stat.count}</h3>
            </div>
            <p className="text-gray-700 font-medium">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
