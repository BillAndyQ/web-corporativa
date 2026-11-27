import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceCardCarouselProps {
  images: React.ReactNode[];
}

const ServiceCardCarousel: React.FC<ServiceCardCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-64 overflow-hidden bg-gray-200 md:h-full md:min-h-[18rem]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
          aria-hidden={index !== currentIndex}
        >
          {image}
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur transition hover:bg-black/50"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur transition hover:bg-black/50"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceCardCarousel;
