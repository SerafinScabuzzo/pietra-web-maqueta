import { Catalog } from '../types';
import { brands } from '../data/mocks/brands';

interface CatalogCardProps {
  catalog: Catalog;
}

const CatalogCard = ({ catalog }: CatalogCardProps) => {
  const brand = catalog.brandId
    ? brands.find((b) => b.id === catalog.brandId)
    : undefined;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Portada */}
      <div className="relative w-full h-64 bg-brandGray overflow-hidden">
        {catalog.coverUrl ? (
          <img
            src={catalog.coverUrl}
            alt={catalog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sin portada
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Marca */}
        {brand && (
          <p className="text-xs text-brandBlue font-medium mb-1">{brand.name}</p>
        )}

        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {catalog.title}
        </h3>

        {/* Tipo/Rubro */}
        {catalog.type && (
          <p className="text-xs text-gray-500 mb-2 capitalize">
            {catalog.type}
          </p>
        )}

        {/* Fecha */}
        <p className="text-sm text-gray-600 mb-4">
          {formatDate(catalog.date)}
        </p>

        {/* Botón Descargar */}
        <div className="mt-auto">
          {catalog.pdfUrl ? (
            <a
              href={catalog.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center block"
            >
              Descargar PDF
            </a>
          ) : (
            <button
              disabled
              className="btn-primary w-full text-center opacity-50 cursor-not-allowed"
            >
              PDF no disponible
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
