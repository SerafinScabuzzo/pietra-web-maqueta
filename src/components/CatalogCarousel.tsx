import { useState, useEffect } from 'react';
import { Catalog } from '../types';

interface CatalogCarouselProps {
  catalogs: Catalog[];
}

const CatalogCarousel = ({ catalogs }: CatalogCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Si no hay catálogos, mostrar fallback
  if (catalogs.length === 0) {
    return (
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg bg-brandGray">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Catálogos</h2>
            <p className="text-lg">Catálogos disponibles próximamente</p>
          </div>
        </div>
      </div>
    );
  }

  // Autoplay con pausa al hover
  useEffect(() => {
    if (isPaused || catalogs.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % catalogs.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isPaused, catalogs.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + catalogs.length) % catalogs.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % catalogs.length);
  };

  const currentCatalog = catalogs[currentIndex];
  const imageUrl = currentCatalog.coverUrl || '/uploads/banner principal.jpg';

  return (
    <div
      className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Imagen del slide */}
      <img
        src={imageUrl}
        alt={currentCatalog.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/uploads/banner principal.jpg';
        }}
      />

      {/* Overlay oscuro con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Contenido del slide */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-12 text-white max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentCatalog.title}</h2>
          <p className="text-lg md:text-xl mb-6 text-gray-100">
            Descubrí nuestra colección de productos
          </p>
          {currentCatalog.pdfUrl && (
            <a
              href={currentCatalog.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-accent inline-block"
            >
              Ver catálogo
            </a>
          )}
        </div>
      </div>

      {/* Flechas de navegación */}
      {catalogs.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Anterior"
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
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Siguiente"
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
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicadores (puntos) */}
      {catalogs.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {catalogs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogCarousel;
