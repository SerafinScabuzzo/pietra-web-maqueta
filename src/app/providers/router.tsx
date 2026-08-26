import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Catalogo from '../../pages/Catalogo';
import Ofertas from '../../pages/Ofertas';
import Empresa from '../../pages/Empresa';
import QuieroSerCliente from '../../pages/QuieroSerCliente';
import Marca from '../../pages/Marca';
import Rubro from '../../pages/Rubro';
import Buscar from '../../pages/Buscar';
import Categorias from '../../pages/Categorias';
import CategoriaRubro from '../../pages/CategoriaRubro';
import Marcas from '../../pages/Marcas';
import Producto from '../../pages/Producto';
import Favoritos from '../../pages/Favoritos';
import MiCuenta from '../../pages/MiCuenta';
import MisPedidos from '../../pages/MisPedidos';
import MisFacturas from '../../pages/MisFacturas';
import RevisarPedido from '../../pages/RevisarPedido';
import AdminLayout from '../../pages/admin/AdminLayout';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminProductos from '../../pages/admin/AdminProductos';
import AdminMarcas from '../../pages/admin/AdminMarcas';
import AdminRubros from '../../pages/admin/AdminRubros';
import AdminSubrubros from '../../pages/admin/AdminSubrubros';
import AdminCatalogos from '../../pages/admin/AdminCatalogos';
import AdminListas from '../../pages/admin/AdminListas';
import AdminBanners from '../../pages/admin/AdminBanners';
import AdminClientes from '../../pages/admin/AdminClientes';
import AdminPedidos from '../../pages/admin/AdminPedidos';
import AdminRoute from '../../components/AdminRoute';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* FONDO GLOBAL AZUL CLARITO - Ajustar colores aquí si se desea cambiar la paleta */}
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Fondo base: gradiente azul clarito (sky/blue/indigo claro - azul más notorio) */}
        <div className="fixed inset-0 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100"></div>
        
        {/* Blobs decorativos suaves con blur - capas de profundidad (opacidad ajustada) */}
        <div className="fixed top-0 left-0 w-96 h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="fixed top-0 right-0 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 left-0 w-80 h-80 bg-orange-200/12 rounded-full blur-3xl pointer-events-none -z-10"></div>
        
        {/* Textura grid muy suave para look moderno */}
        <div 
          className="fixed inset-0 opacity-20 pointer-events-none -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)',
            backgroundSize: '26px 26px'
          }}
        ></div>
        
        {/* Capa de contenido - todo el sitio va aquí */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/quiero-ser-cliente" element={<QuieroSerCliente />} />
            <Route path="/marca/:brandId" element={<Marca />} />
            <Route path="/marca/:brandId/rubro/:categoryId" element={<Rubro />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:categoryId" element={<CategoriaRubro />} />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/producto/:productId" element={<Producto />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/mi-cuenta" element={<MiCuenta />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} />
            <Route path="/mis-facturas" element={<MisFacturas />} />
            <Route path="/revisar-pedido" element={<RevisarPedido />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="marcas" element={<AdminMarcas />} />
              <Route path="rubros" element={<AdminRubros />} />
              <Route path="subrubros" element={<AdminSubrubros />} />
              <Route path="catalogos" element={<AdminCatalogos />} />
              <Route path="listas" element={<AdminListas />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="clientes" element={<AdminClientes />} />
              <Route path="pedidos" element={<AdminPedidos />} />
            </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
