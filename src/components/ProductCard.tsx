import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getBrands } from '../store/adminStore';
import { getCurrentClient, toggleFavorite, isFavorite, addToCart, isInCart } from '../store/clientStore';
import { getAuth } from '../utils/auth';
import { getEffectiveUnitPrice, formatMoney, isProductOnOffer } from '../utils/pricing';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const brands = getBrands();
  const brand = brands.find((b) => b.id === product.brandId);
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : undefined;
  const client = getCurrentClient();
  const auth = getAuth();
  const canSeePrices = auth.isClient || auth.isAdmin;

  useEffect(() => {
    if (client) {
      setFavorite(isFavorite(product.id));
      setInCart(isInCart(product.id));
    } else {
      setFavorite(false);
      setInCart(false);
    }

    const handleFavoritesChanged = () => {
      if (client) setFavorite(isFavorite(product.id));
    };
    const handleCartChanged = () => {
      if (client) setInCart(isInCart(product.id));
    };

    window.addEventListener('pietra_favorites_changed', handleFavoritesChanged);
    window.addEventListener('pietra_cart_changed', handleCartChanged);
    return () => {
      window.removeEventListener('pietra_favorites_changed', handleFavoritesChanged);
      window.removeEventListener('pietra_cart_changed', handleCartChanged);
    };
  }, [client, product.id]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!client) {
      // Si no está logueado, redirigir a login
      window.location.href = '/login';
      return;
    }
    toggleFavorite(product.id);
    // Actualizar estado local inmediatamente
    setFavorite(!favorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (client) {
      addToCart(product.id, quantity);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }
  };

  const isOnOffer = isProductOnOffer(product);
  const effectivePrice = client
    ? getEffectiveUnitPrice(product, client.discountRate)
    : product.priceList;
  const showListStrike = canSeePrices && effectivePrice < product.priceList;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full relative">
      {/* Badge de oferta - esquina superior izquierda */}
      {isOnOffer && (
        <div className="absolute top-2 left-2 z-20">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            Oferta
          </span>
        </div>
      )}

      {/* Botón favorito - esquina superior derecha */}
      {client && (
        <button
          onClick={handleFavoriteToggle}
          className="absolute z-20 top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-sm"
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span className={`text-xl ${favorite ? 'text-red-500' : 'text-gray-400'}`}>
            {favorite ? '❤️' : '🤍'}
          </span>
        </button>
      )}

      {/* Imagen */}
      <Link to={`/producto/${product.id}`}>
        <div className="relative w-full h-48 bg-brandGray overflow-hidden">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>';
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Sin imagen
            </div>
          )}
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-4 flex-grow flex flex-col">
        {brand && (
          <p className="text-xs text-brandBlue font-medium mb-1">{brand.name}</p>
        )}
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-brandBlue transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-3">SKU: {product.sku}</p>

        <div className="mt-auto">
          {canSeePrices ? (
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-lg font-bold ${isOnOffer ? 'text-brandOrange' : 'text-brandBlue'}`}>
                ${formatMoney(effectivePrice)}
              </span>
              {showListStrike && (
                <span className="text-sm text-gray-500 line-through">
                  ${formatMoney(product.priceList)}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-3 italic">
              Iniciá sesión para ver precios
            </p>
          )}
        </div>

        {/* Agregar al carrito (solo si está logueado) */}
        {client ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-600">Cantidad:</label>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, val));
                  }}
                  className="w-12 text-center border border-gray-300 rounded text-sm py-1"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(quantity + 1);
                  }}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className={`btn-primary w-full text-center text-sm py-2 ${showAdded || inCart ? 'bg-green-600' : ''}`}
            >
              {showAdded ? '✓ Agregado' : inCart ? '✓ En carrito' : 'Agregar al carrito'}
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn-secondary w-full text-center text-sm py-2"
          >
            Ingresá para comprar
          </Link>
        )}

        {/* Botón Ver */}
        <Link
          to={`/producto/${product.id}`}
          className="btn-secondary w-full text-center text-sm py-2 mt-2"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
