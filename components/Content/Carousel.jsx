import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Carousel = ({ images, current, setCurrent }) => {
  const length = images.length;
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);
  const cardRef = useRef(null);
  const newsSectionRef = useRef(null);
  const trailerRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const newsTitle = "Latest News & Leaks";

  // Typewriter effect on scroll for News & Leaks
  useEffect(() => {
    let timeout;
    let i = 0;
    function typeWriter() {
      if (i <= newsTitle.length) {
        setTypedText(newsTitle.slice(0, i));
        i++;
        timeout = setTimeout(typeWriter, 45);
      }
    }
    let trigger;
    if (newsSectionRef.current) {
      trigger = ScrollTrigger.create({
        trigger: newsSectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => typeWriter(),
      });
    }
    return () => {
      clearTimeout(timeout);
      if (trigger) trigger.kill();
    };
  }, []);

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

  // GSAP scroll animation for carousel
  useEffect(() => {
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // News section animation
    if (newsSectionRef.current) {
      gsap.fromTo(
        newsSectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: newsSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // Card animation
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // Trailer section animation
    if (trailerRef.current) {
      gsap.fromTo(
        trailerRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: trailerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [length, setCurrent]);

  // Infinite loop carousel logic
  const [isTransitioning, setIsTransitioning] = useState(false);
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  // Adjusted current index for extendedImages
  const [slideIndex, setSlideIndex] = useState(current + 1);

  // Sync external current with internal slideIndex
  useEffect(() => {
    setSlideIndex(current + 1);
  }, [current]);

  // Handle transition end for infinite effect
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (slideIndex === 0) {
      setSlideIndex(images.length);
      setCurrent(images.length - 1);
    } else if (slideIndex === images.length + 1) {
      setSlideIndex(1);
      setCurrent(0);
    }
  };

  // Next/Prev slide handlers for infinite effect
  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev + 1);
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }
  };
  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev - 1);
      setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    }
  };

  // Pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
  };

  // Carousel content
  const carouselContent = (
    <div
      ref={carouselRef}
      className="relative w-full h-[55vw] max-w-7xl mx-auto mt-8 overflow-hidden shadow-2xl bg-gradient-to-r from-green-900/80 via-gray-900/90 to-green-400/10 min-h-[300px] sm:min-h-[400px] md:h-[65vh] lg:h-[75vh] max-h-[80vh] aspect-[16/7] rounded-none sm:rounded-3xl animate-fade-in"
      style={{ minHeight: undefined }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Images with sliding effect */}
      <div
        className="flex h-full transition-transform duration-[2000ms] ease-in-out animate-slide-left"
        style={{
          transform: `translateX(-${slideIndex * 100}%)`,
          transition: isTransitioning ? 'transform 2s ease-in-out, opacity 2s ease-in-out' : 'none',
          opacity: isTransitioning ? 1 : 0.8,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((img, idx) => (
          <div key={idx} className={`relative w-full h-full flex-shrink-0 min-w-0 min-h-0 group`} style={{ minWidth: "100%" }}>
            <img
              src={img}
              alt={`slide-${idx}`}
              className="w-full h-full object-cover object-center rounded-3xl flex-shrink-0 min-w-0 min-h-0 group-hover:scale-105 transition-transform duration-700"
              draggable="false"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/600x256?text=Image+Not+Found";
              }}
            />
            {/* Animated overlay for active slide */}
            {slideIndex === idx && idx !== 0 && idx !== extendedImages.length - 1 && (
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent rounded-3xl pointer-events-none animate-fade-in" />
            )}
          </div>
        ))}
      </div>
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-3xl pointer-events-none" />
      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-green-400/80 hover:bg-green-500 text-gray-900 p-2 sm:p-3 rounded-full shadow-xl transition-all duration-200 z-20 border-2 border-green-300 animate-bounce"
        aria-label="Previous Slide"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-green-400/80 hover:bg-green-500 text-gray-900 p-2 sm:p-3 rounded-full shadow-xl transition-all duration-200 z-20 border-2 border-green-300 animate-bounce"
        aria-label="Next Slide"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSlideIndex(idx + 1);
              setCurrent(idx);
            }}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-400 transition bg-green-400/80 ${
              current === idx
                ? "scale-125 shadow-xl animate-pulse"
                : "bg-gray-700"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );

  // Render the card outside the carousel div
  return (
    <>
      {/* Carousel */}
      {carouselContent}
      {/* News & Leaks Section */}
      <section
        ref={newsSectionRef}
        className="w-[90vw] max-w-7xl mx-auto mb-16 mt-14 sm:mt-20 animate-fade-in"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-century-gothic text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] tracking-wider uppercase flex items-center gap-2">
            <span className="animate-typewriter">{typedText}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="bg-[#181818] rounded-lg overflow-hidden shadow-md flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl active:scale-105 focus:scale-105 focus:shadow-2xl cursor-pointer touch-manipulation"
            tabIndex={0}
          >
            <div className="h-36 sm:h-40 md:h-44 bg-gray-800 flex items-center justify-center">
              <img
                src="/4.jpg"
                alt="news1"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg sm:text-xl font-bold font-century-gothic text-[#f3e7c4] leading-tight mb-2 uppercase">
                Map Size Repastadly Twice As Big As Gta V's
              </h3>
              <p className="text-xs text-[#b3a98c] font-century-gothic tracking-wide">
                {" "}
                • 1 hour ago
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div
            className="bg-[#181818] rounded-lg overflow-hidden shadow-md flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl active:scale-105 focus:scale-105 focus:shadow-2xl cursor-pointer touch-manipulation"
            tabIndex={0}
          >
            <div className="h-36 sm:h-40 md:h-44 bg-gray-800 flex items-center justify-center">
              <img
                src="/5.jpg"
                alt="news2"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg sm:text-xl font-bold font-century-gothic text-[#f3e7c4] leading-tight mb-2 uppercase">
                Dynamiz Weather Systemic Hatine
              </h3>
              <p className="text-xs text-[#b3a98c] font-century-gothic tracking-wide">
                {" "}
                • 3 hours ago
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div
            className="bg-[#181818] rounded-lg overflow-hidden shadow-md flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl active:scale-105 focus:scale-105 focus:shadow-2xl cursor-pointer touch-manipulation"
            tabIndex={0}
          >
            <div className="h-36 sm:h-40 md:h-44 bg-gray-800 flex items-center justify-center">
              <img
                src="/6.jpg"
                alt="news3"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg sm:text-xl font-bold font-century-gothic text-[#f3e7c4] leading-tight mb-2 uppercase">
                Gta Online Progress Won't Carry Over
              </h3>
              <p className="text-xs text-[#b3a98c] font-century-gothic tracking-wide">
                {" "}
                • 6 hours ago
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Trailer Section - Title and YouTube Video with scroll animation */}
      <div ref={trailerRef} className="flex flex-col items-center mt-10 mb-16 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-century-gothic text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] tracking-wider uppercase mb-6 text-center animate-pulse">
          Trailer
        </h2>
        <div className="w-full aspect-video max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-4 border-green-400/30 animate-fade-in">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/QdBZY2fkU-0"
            title="GTA 6 Official Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Carousel;