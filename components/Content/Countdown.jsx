import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Countdown = () => {
  const countdownRef = useRef(null);

  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-05-26T00:00:00');
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate on scroll
    if (countdownRef.current) {
      gsap.fromTo(
        countdownRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: countdownRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={countdownRef} className="mt-8 flex flex-col items-center justify-center">
      <h4 className="text-3xl font-extrabold text-green-400 mb-4 tracking-widest font-century-gothic uppercase animate-pulse drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]">
        Launching Soon !!!
      </h4>
      <div className="flex gap-8 text-green-100 text-lg font-century-gothic bg-gradient-to-r from-green-900/40 via-green-700/30 to-green-400/10 rounded-2xl px-10 py-6 shadow-2xl backdrop-blur-lg border border-green-400/30">
        { [
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center mx-2">
            <span className="text-5xl font-extrabold text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)] animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>{String(item.value).padStart(2, '0')}</span>
            <span className="uppercase text-xs tracking-widest mt-2 text-green-200/80 letter-spacing-wider animate-fade-in">
              {item.label}
            </span>
          </div>
        )) }
      </div>
      <div className="mt-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-400 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
        <span className="text-green-200 text-sm font-century-gothic tracking-wide animate-fade-in">Mark your calendars for the big day !</span>
      </div>
    </div>
  );
};

export default Countdown;
