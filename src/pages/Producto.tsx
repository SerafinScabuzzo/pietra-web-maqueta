import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getProducts, getBrands, getCategories } from '../store/adminStore';
import { getAuth } from '../utils/auth';
import { getCurrentClient, addToCart, toggleFavorite, isFavorite } from '../store/clientStore';
import { getEffectiveUnitPrice, formatMoney, isProductOnOffer } from '../utils/pricing';

const Producto = () => {
  const { productId } = useParams<{ productId: string }>();
  const products = getProducts();
  const brands = getBrands();
  const categories = getCategories();
  const auth = getAuth();
  const canSeePrices = auth.isClient || auth.isAdmin;
  const client = getCurrentClient();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(() => (client ? isFavorite(productId || '') : false));
  
  const product = products.find((p) => p.id === productId);
  const brand = product ? brands.find((b) => b.id === product.brandId) : undefined;
  const category = product ? categories.find((c) => c.id === product.categoryId) : undefined;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
        <p className="text-gray-600">El producto que buscas no existe.</p>
      </div>
    );
  }

  const mainImage = product.images && product.images.length > 0 ? product.images[0] : undefined;
  const onOffer = isProductOnOffer(product);
  const effectivePrice = client
    ? getEffectiveUnitPrice(product, client.discountRate)
    : product.priceList;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-96 bg-brandGray flex items-center justify-center text-gray-400">Sin imagen</div>';
                  }
                }}
              />
            ) : (
              <div className="w-full h-96 bg-brandGray flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
          </div>
          {/* Thumbnails (si hay más imágenes) */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div>
          {/* Badge de oferta */}
          {onOffer && (
            <div className="mb-4">
              <span className="badge-offer">OFERTA</span>
            </div>
          )}

          {/* Marca */}
          {brand && (
            <p className="text-brandBlue font-medium mb-2">{brand.name}</p>
          )}

          {/* Nombre */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

          {/* SKU */}
          <div className="mb-6 space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">SKU:</span> {product.sku}
            </p>
          </div>

          {/* Rubro */}
          {category && (
            <p className="text-sm text-gray-600 mb-6">
              <span className="font-semibold">Rubro:</span> {category.name}
            </p>
          )}

          {/* Precios */}
          <div className="mb-8 p-6 bg-brandGray rounded-lg">
            {canSeePrices ? (
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  {onOffer ? 'Precio de oferta' : 'Precio'}
                </p>
                <p className={`text-4xl font-bold mb-2 ${onOffer ? 'text-brandOrange' : 'text-brandBlue'}`}>
                  ${formatMoney(effectivePrice)}
                </p>
                {effectivePrice < product.priceList && (
                  <p className="text-lg text-gray-500 line-through">
                    ${formatMoney(product.priceList)}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-2">Precio</p>
                <p className="text-lg text-gray-600 italic">
                  Iniciá sesión para ver precios
                </p>
              </div>
            )}
          </div>

          {client ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Cantidad:</label>
                <button
                  type="button"
                  className="w-8 h-8 border border-gray-300 rounded"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded py-1"
                />
                <button
                  type="button"
                  className="w-8 h-8 border border-gray-300 rounded"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`btn-primary flex-1 ${added ? 'bg-green-600' : ''}`}
                  onClick={() => {
                    addToCart(product.id, quantity);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2000);
                  }}
                >
                  {added ? '✓ Agregado' : 'Agregar al carrito'}
                </button>
                <button
                  type="button"
                  className="btn-secondary flex-1"
                  onClick={() => {
                    toggleFavorite(product.id);
                    setFavorite(!favorite);
                  }}
                >
                  {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="btn-primary flex-1 text-center">
                Ingresá para comprar
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Producto;
