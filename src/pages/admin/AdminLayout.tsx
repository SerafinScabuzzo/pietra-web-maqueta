import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { setAdminMode } from '../../utils/auth';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutAdmin = () => {
    setAdminMode(false);
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/productos', label: 'Productos', icon: '📦' },
    { path: '/admin/marcas', label: 'Marcas', icon: '🏷️' },
    { path: '/admin/rubros', label: 'Rubros', icon: '📁' },
    { path: '/admin/catalogos', label: 'Catálogos', icon: '📚' },
    { path: '/admin/banners', label: 'Banners', icon: '🖼️' },
    { path: '/admin/clientes', label: 'Clientes', icon: '👥' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header fijo */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/70 z-40 flex items-center justify-between px-4 shadow-sm">
        <h1 className="text-xl font-bold text-blue-900">Admin Panel</h1>
        <button
          onClick={handleLogoutAdmin}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
          title="Salir del modo administrador"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Salir de Admin
        </button>
      </header>

      {/* Sidebar Desktop - fijo con offset del header y efecto glass */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:pt-16">
        <div className="flex flex-col flex-grow bg-white/70 backdrop-blur-md border-r border-slate-200/70 overflow-y-auto shadow-sm">
          <nav className="mt-5 flex-1 px-2 space-y-1 pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-brandBlue text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Botón Salir de Admin en la parte inferior del sidebar */}
          <div className="px-2 pb-4 border-t border-gray-200 pt-4">
            <button
              onClick={handleLogoutAdmin}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="Salir del modo administrador"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir de Admin
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - con padding para header y sidebar */}
      <div className="lg:pl-64 pt-16">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/70 backdrop-blur-md border-b border-slate-200/70 px-4 py-3 flex items-center justify-between shadow-sm">
          <h1 className="text-lg font-bold text-blue-900">Admin Panel</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogoutAdmin}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="Salir del modo administrador"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir de Admin
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-700 hover:text-brandBlue"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-white/70 backdrop-blur-md border-r border-slate-200/70 shadow-xl">
              <div className="flex flex-col h-full pt-5 pb-4">
                <div className="flex items-center justify-between px-4 mb-5">
                  <h1 className="text-xl font-bold text-blue-900">Admin Panel</h1>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-brandBlue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
                {/* Botón Salir de Admin en mobile sidebar */}
                <div className="px-2 pb-4 border-t border-gray-200 pt-4 mt-auto">
                  <button
                    onClick={() => {
                      handleLogoutAdmin();
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    title="Salir del modo administrador"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Salir de Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="py-6 px-4">
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/70 rounded-2xl shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
