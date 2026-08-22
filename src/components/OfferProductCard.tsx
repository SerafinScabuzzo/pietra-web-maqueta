import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getBrands } from '../store/adminStore';
import { calculateDiscountPercentage } from '../utils/pricing';
import { getAuth } from '../utils/auth';

interface OfferProductCardProps {
  product: Product;
}

const OfferProductCard = ({ product }: OfferProductCardProps) => {
  const brands = getBrands();
  const brand = brands.find((b) => b.id === product.brandId);
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : undefined;
  const auth = getAuth();
  const canSeePrices = auth.isClient || auth.isAdmin;
  
  const discountPercentage = canSeePrices && product.priceOffer
    ? calculateDiscountPercentage(product.priceList, product.priceOffer)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full relative border-2 border-brandOrange">
      {/* Badge de descuento - naranja destacado */}
      {canSeePrices && discountPercentage > 0 && (
        <div className="absolute z-10 m-2">
          <span className="bg-brandOrange text-white text-lg font-bold px-4 py-2 rounded-lg shadow-lg">
            -{discountPercentage}% OFF
          </span>
        </div>
      )}
      {/* Badge genérico para guest */}
      {!canSeePrices && product.priceOffer && (
        <div className="absolute z-10 m-2">
          <span className="bg-brandOrange text-white text-sm font-bold px-3 py-1 rounded-lg">
            OFERTA
          </span>
        </div>
      )}

      {/* Imagen */}
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

      {/* Contenido */}
      <div className="p-4 flex-grow flex flex-col">
        {brand && (
          <p className="text-xs text-brandBlue font-medium mb-1">{brand.name}</p>
        )}
        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        <p className="text-xs text-gray-500 mb-3">SKU: {product.sku}</p>

        {/* Precios destacados */}
        <div className="mt-auto mb-3 p-3 bg-orange-50 rounded-lg border-2 border-brandOrange">
          {canSeePrices ? (
            <>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-brandOrange">
                  ${product.priceOffer?.toLocaleString('es-AR')}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.priceList.toLocaleString('es-AR')}
                </span>
              </div>
              <p className="text-xs text-brandOrange font-bold">
                Ahorrás ${(product.priceList - (product.priceOffer || 0)).toLocaleString('es-AR')}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600 italic">
              Iniciá sesión para ver precios
            </p>
          )}
        </div>

        {/* Botón Ver producto - estilo naranja */}
        <Link
          to={`/producto/${product.id}`}
          className="bg-brandOrange text-white w-full text-center text-sm py-2.5 rounded-lg font-semibold hover:bg-brandOrange-dark transition-colors shadow-md hover:shadow-lg"
        >
          Ver producto
        </Link>
      </div>
    </div>
  );
};

export default OfferProductCard;
