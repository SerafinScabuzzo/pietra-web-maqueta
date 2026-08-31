import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, logout } from '../utils/auth';
import { getCurrentClient, getCartItemCount } from '../store/clientStore';
import SearchBar from './SearchBar';

const orderBtnClass =
  'inline-flex items-center justify-center rounded-lg bg-sky-100 text-blue-800 border border-blue-200 px-2.5 py-1 text-xs xl:text-sm font-semibold hover:bg-sky-200 transition-colors whitespace-nowrap';

const orderBtnMobileClass =
  'block w-full text-center rounded-lg bg-sky-100 text-blue-800 border border-blue-200 px-3 py-2 text-sm font-semibold hover:bg-sky-200 transition-colors mb-1';

const linkClass = 'text-slate-700 hover:text-blue-800 font-medium transition-colors whitespace-nowrap text-sm xl:text-base';
const mobileLinkClass = 'block text-slate-700 font-medium py-2.5 hover:text-blue-800 transition-colors';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [auth, setAuth] = useState(getAuth());
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateAuth = () => {
      setAuth(getAuth());
      const client = getCurrentClient();
      if (client) {
        setCartCount(getCartItemCount());
      } else {
        setCartCount(0);
      }
    };
    updateAuth();
    window.addEventListener('storage', updateAuth);
    window.addEventListener('pietra_auth_changed', updateAuth);
    window.addEventListener('pietra_cart_changed', updateAuth);
    const interval = setInterval(updateAuth, 1000);
    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('pietra_auth_changed', updateAuth);
      window.removeEventListener('pietra_cart_changed', updateAuth);
      clearInterval(interval);
    };
  }, []);

  // Cerrar menú al pasar a desktop ancho
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = () => {
      if (mq.matches) setShowMobileMenu(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(getAuth());
    setShowMobileMenu(false);
    navigate('/');
  };

  const closeMobile = () => setShowMobileMenu(false);

  const desktopMenu = auth.isClient ? (
    <>
      <Link to="/" className={linkClass}>Inicio</Link>
      <div className="flex flex-col gap-1">
        <Link to="/buscar" className={linkClass}>Hacer Pedido</Link>
        <Link to="/pedido-codigo" className={orderBtnClass}>Pedido Código</Link>
        <Link to="/pedido-excel" className={orderBtnClass}>Pedido Excel</Link>
      </div>
      <Link to="/categorias" className={linkClass}>Categorías</Link>
      <Link to="/marcas" className={linkClass}>Marcas</Link>
      <Link to="/catalogo" className={linkClass}>Catálogos</Link>
      <Link to="/favoritos" className={linkClass} title="Favoritos">Favoritos</Link>
      <Link
        to="/revisar-pedido"
        className={`${linkClass} flex items-center gap-1 relative`}
        title="Carrito"
      >
        <span aria-hidden>🛒</span>
        <span className="hidden 2xl:inline">Carrito</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
      <Link to="/mi-cuenta" className={linkClass}>Mi Cuenta</Link>
      <button type="button" onClick={handleLogout} className={linkClass}>
        Salir
      </button>
    </>
  ) : (
    <>
      <Link to="/" className={linkClass}>Inicio</Link>
      <Link to="/buscar" className={linkClass}>Productos</Link>
      <Link to="/categorias" className={linkClass}>Categorías</Link>
      <Link to="/marcas" className={linkClass}>Marcas</Link>
      <Link to="/catalogo" className={linkClass}>Catálogos</Link>
      <Link to="/empresa" className={linkClass}>Quiénes somos</Link>
      <Link to="/login" className={linkClass}>Ingresar</Link>
      <Link to="/quiero-ser-cliente" className="btn-accent whitespace-nowrap text-sm xl:text-base">
        Quiero ser cliente
      </Link>
    </>
  );

  const mobileMenu = auth.isClient ? (
    <>
      <Link to="/" className={mobileLinkClass} onClick={closeMobile}>Inicio</Link>
      <Link to="/buscar" className={mobileLinkClass} onClick={closeMobile}>Hacer Pedido</Link>
      <Link to="/pedido-codigo" className={orderBtnMobileClass} onClick={closeMobile}>
        Pedido Código
      </Link>
      <Link to="/pedido-excel" className={orderBtnMobileClass} onClick={closeMobile}>
        Pedido Excel
      </Link>
      <Link to="/categorias" className={mobileLinkClass} onClick={closeMobile}>Categorías</Link>
      <Link to="/marcas" className={mobileLinkClass} onClick={closeMobile}>Marcas</Link>
      <Link to="/catalogo" className={mobileLinkClass} onClick={closeMobile}>Catálogos</Link>
      <Link to="/favoritos" className={mobileLinkClass} onClick={closeMobile}>Favoritos</Link>
      <Link to="/revisar-pedido" className={mobileLinkClass} onClick={closeMobile}>
        Carrito{cartCount > 0 ? ` (${cartCount})` : ''}
      </Link>
      <Link to="/mi-cuenta" className={mobileLinkClass} onClick={closeMobile}>Mi Cuenta</Link>
      <button
        type="button"
        onClick={handleLogout}
        className="w-full text-left text-slate-700 font-medium py-2.5 hover:text-blue-800 transition-colors"
      >
        Salir
      </button>
    </>
  ) : (
    <>
      <Link to="/" className={mobileLinkClass} onClick={closeMobile}>Inicio</Link>
      <Link to="/buscar" className={mobileLinkClass} onClick={closeMobile}>Productos</Link>
      <Link to="/categorias" className={mobileLinkClass} onClick={closeMobile}>Categorías</Link>
      <Link to="/marcas" className={mobileLinkClass} onClick={closeMobile}>Marcas</Link>
      <Link to="/catalogo" className={mobileLinkClass} onClick={closeMobile}>Catálogos</Link>
      <Link to="/empresa" className={mobileLinkClass} onClick={closeMobile}>Quiénes somos</Link>
      <Link to="/login" className={mobileLinkClass} onClick={closeMobile}>Ingresar</Link>
      <Link
        to="/quiero-ser-cliente"
        className="btn-accent block text-center mt-2"
        onClick={closeMobile}
      >
        Quiero ser cliente
      </Link>
    </>
  );

  return (
    <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200/70">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Desktop / laptop ancho: menú completo (xl+) */}
        <nav className="hidden xl:flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-90 transition-opacity">
            <img
              src="/uploads/LOGO PIETRA 4.1.png"
              alt="PietraItaly"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className="text-2xl font-bold text-blue-900">PietraItaly</span>
          </Link>

          <div className="flex-1 flex justify-center min-w-0 px-2">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0 max-w-[55%]">
            {desktopMenu}
            {auth.isAdmin && (
              <Link to="/admin" className={linkClass}>Admin</Link>
            )}
          </div>
        </nav>

        {/* Móvil + tablet: logo, búsqueda y hamburguesa */}
        <nav className="xl:hidden">
          <div className="flex items-center justify-between gap-2 mb-3">
            <Link to="/" className="flex items-center gap-2 min-w-0 hover:opacity-90 transition-opacity">
              <img
                src="/uploads/LOGO PIETRA 4.1.png"
                alt="PietraItaly"
                className="h-8 w-auto object-contain flex-shrink-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <span className="text-lg sm:text-xl font-bold text-blue-900 truncate">PietraItaly</span>
            </Link>
            <div className="flex items-center gap-1 flex-shrink-0">
              {auth.isClient && (
                <Link
                  to="/revisar-pedido"
                  className="relative p-2 text-gray-700 hover:text-brandBlue"
                  aria-label="Carrito"
                >
                  <span aria-hidden>🛒</span>
                  {cartCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              <button
                type="button"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-700 hover:text-brandBlue transition-colors"
                aria-label="Menu"
                aria-expanded={showMobileMenu}
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
                  {showMobileMenu ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-1">
            <SearchBar />
          </div>

          {showMobileMenu && (
            <div className="border-t border-slate-200/70 pt-3 mt-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {mobileMenu}
              {auth.isAdmin && (
                <Link to="/admin" className={mobileLinkClass} onClick={closeMobile}>
                  Admin
                </Link>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
