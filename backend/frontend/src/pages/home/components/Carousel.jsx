import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Carousel = ({ images, darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className={`relative w-full max-w-7xl mx-auto transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`rounded-3xl overflow-hidden relative sm:h-72 md:h-full `}>
        <div
          className="whitespace-nowrap transition-transform duration-500 "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="inline-block w-full h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="mx-auto w-full sm:h-72 md:h-96 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full ${
            darkMode ? ' text-white' : ' text-white'
          }`}
        >
          <ChevronLeftIcon className="h-12 w-12"/>
        </button>
        <button
          onClick={nextSlide}
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full ${
            darkMode ? ' text-white' : ' text-white'
          }`}
        >
          <ChevronRightIcon className="h-12 w-12"/>
        </button>
      </div>
      <div className={`carousel-indicators flex justify-center mb-4 mt-2 `}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentIndex === index ? (darkMode ? 'bg-gray-300' : 'bg-slate-900') : (darkMode ? 'bg-gray-600' : 'bg-gray-500')
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;