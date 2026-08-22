import { Link } from 'react-router-dom';
import { Brand } from '../types';

interface BrandGridProps {
  brands: Brand[];
}

const BrandGrid = ({ brands }: BrandGridProps) => {
  // Función para obtener la URL de imagen con prioridad: heroImageUrl > logoUrl
  const getBrandImageUrl = (brand: Brand): string | undefined => {
    return brand.heroImageUrl || brand.logoUrl;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
      {brands.map((brand) => {
        const imageUrl = getBrandImageUrl(brand);
        
        return (
          <Link
            key={brand.id}
            to={`/buscar?brand=${encodeURIComponent(brand.id)}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full group"
          >
            {/* Imagen - ocupa todo el recuadro superior */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-brandGray">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-brandGray"><span class="text-brandBlue font-semibold text-center px-2">' + brand.name + '</span></div>';
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brandGray">
                    <span className="text-brandBlue font-semibold text-center px-2">{brand.name}</span>
                  </div>
              )}
            </div>
            
            {/* Nombre de la marca */}
            <div className="p-4 flex-grow flex items-center justify-center">
              <h3 className="text-sm md:text-base font-semibold text-gray-800 text-center group-hover:text-brandBlue transition-colors">
                {brand.name}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BrandGrid;
