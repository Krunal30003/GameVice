import React, { useRef, useEffect } from "react";

const Carousel = ({ images, current, setCurrent }) => {
  const length = images.length;
  const intervalRef = useRef(null);

  useEffect(() => {
    const startAutoPlay = () => {
      stopAutoPlay();
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
      }, 3000);
    };
    const stopAutoPlay = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    startAutoPlay();
    return () => stopAutoPlay();
  }, [length, setCurrent]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  // Pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
  };

  return (
    <div
      className="relative w-[98vw] h-[75vh] max-w-7xl mx-auto mt-8 rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      style={{ minHeight: '400px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Images with sliding effect */}
      <div className="flex transition-transform duration-700 h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className="w-full h-full object-cover object-center rounded-xl flex-shrink-0"
            style={{ minWidth: '100%' }}
            draggable="false"
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x256?text=Image+Not+Found';
            }}
          />
        ))}
      </div>
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl pointer-events-none" />
      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-green-400/80 hover:text-gray-900 text-green-400 p-2 rounded-full shadow-lg transition-colors duration-200 z-20"
        aria-label="Previous Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-green-400/80 hover:text-gray-900 text-green-400 p-2 rounded-full shadow-lg transition-colors duration-200 z-20"
        aria-label="Next Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border-2 border-green-400 transition bg-green-400/80 ${current === idx ? 'scale-125 shadow-lg' : 'bg-gray-700'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
