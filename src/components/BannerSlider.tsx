import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '../store/adminStore';

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider = ({ banners }: BannerSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  if (banners.length === 0) {
    return (
      <div className="w-full h-[240px] sm:h-[340px] md:h-[460px] lg:h-[560px] bg-brandGray flex items-center justify-center">
        <div className="text-gray-500">No hay banners disponibles</div>
      </div>
    );
  }

  const banner = banners[currentIndex];
  const isExternal = /^https?:\/\//i.test(banner.buttonLink);

  return (
    <div
      className="relative w-full h-[240px] sm:h-[340px] md:h-[460px] lg:h-[560px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <img
        src={banner.imageUrl}
        alt={banner.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/uploads/portadaCatalogo.png';
        }}
      />
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="px-4 sm:px-8 md:px-16 text-white max-w-3xl">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 leading-tight">{banner.title}</h2>
          {banner.subtitle && (
            <p className="text-sm sm:text-lg md:text-2xl mb-4 sm:mb-6 text-gray-100 line-clamp-2 sm:line-clamp-none">{banner.subtitle}</p>
          )}
          {isExternal ? (
            <a
              href={banner.buttonLink}
              target="_blank"
              rel="noreferrer"
              className="btn-accent inline-block text-sm sm:text-base"
            >
              {banner.buttonText}
            </a>
          ) : (
            <Link to={banner.buttonLink} className="btn-accent inline-block text-sm sm:text-base">
              {banner.buttonText}
            </Link>
          )}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
            }
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1.5 sm:p-2 rounded-full transition-colors"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1.5 sm:p-2 rounded-full transition-colors"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
                aria-label={`Ir al banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;
