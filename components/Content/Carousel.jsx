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

  // Carousel content
  const carouselContent = (
    <div
      ref={carouselRef}
      className="relative w-full h-[55vw] max-w-7xl mx-auto mt-8 overflow-hidden shadow-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-[300px] sm:min-h-[400px] md:h-[65vh] lg:h-[75vh] max-h-[80vh] aspect-[16/7] rounded-none sm:rounded-xl"
      style={{ minHeight: undefined }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Images with sliding effect */}
      <div
        className="flex transition-transform duration-700 h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className="w-full h-full object-cover object-center rounded-xl flex-shrink-0 min-w-0 min-h-0"
            style={{ minWidth: "100%" }}
            draggable="false"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/600x256?text=Image+Not+Found";
            }}
          />
        ))}
      </div>
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl pointer-events-none" />
      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-green-400/80 hover:text-gray-900 text-green-400 p-1.5 sm:p-2 rounded-full shadow-lg transition-colors duration-200 z-20"
        aria-label="Previous Slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-green-400/80 hover:text-gray-900 text-green-400 p-1.5 sm:p-2 rounded-full shadow-lg transition-colors duration-200 z-20"
        aria-label="Next Slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-green-400 transition bg-green-400/80 ${
              current === idx
                ? "scale-110 sm:scale-125 shadow-lg"
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
        className="w-[90vw] max-w-7xl mx-auto mb-16 mt-14 sm:mt-20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-century-gothic text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)] tracking-wider uppercase">
            {typedText}
            <span className="inline-block animate-pulse">|</span>
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
      {/* Description Card */}
      <div
        ref={cardRef}
        className="w-[90vw] max-w-5xl mx-auto mt-14 mb-10 p-6 rounded-lg shadow-lg text-green-200 text-center bg-white/5 backdrop-blur-md drop-shadow-[0_0_16px_rgba(34,197,94,0.3)] font-century-gothic tracking-wide"
        style={{ position: "relative", zIndex: 30 }}
      >
        <h3 className="text-3xl font-semibold mb-2 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)] font-century-gothic uppercase tracking-widest">
          GameVice
        </h3>
        <p className="text-green-100 text-lg leading-relaxed font-century-gothic">
         Stackly is the ultimate destination for gamers eagerly following the launch of GTA 6 and other top-tier titles. As hype builds around Rockstar's most anticipated release, Stackly keeps you in the loop with the latest news, leaks, trailers, and community discussions all in one place. Dive into detailed breakdowns of GTA 6’s storyline, characters, and gameplay features, or join fellow fans in speculating and sharing theories. Stackly also lets you create personalized stacks to track Rockstar games, compare GTA titles, and see how GTA 6 ranks against other open-world giants. Whether you're a longtime fan of the Grand Theft Auto series or new to the franchise, Stackly is your go-to hub for everything GTA 6 and beyond.
        </p>
      </div>
    </>
  );
};

export default Carousel;