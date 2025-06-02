import React, { useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const gameViceRef = useRef(null);

  useEffect(() => {
    if (gameViceRef.current) {
      gsap.fromTo(
        gameViceRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: gameViceRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      {/* GameVice Section */}
      <div ref={gameViceRef} className="w-[90vw] max-w-5xl mx-auto mt-14 mb-10 p-6 rounded-lg shadow-lg text-green-200 text-center bg-white/5 backdrop-blur-md drop-shadow-[0_0_16px_rgba(34,197,94,0.3)] font-century-gothic tracking-wide" style={{ position: "relative", zIndex: 30 }}>
        <h3 className="text-3xl font-semibold mb-2 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)] font-century-gothic uppercase tracking-widest">
          GameVice
        </h3>
        <p className="text-green-100 text-lg leading-relaxed font-century-gothic">
          GameVice is the ultimate destination for gamers eagerly following the launch of GTA 6 and other top-tier titles. As hype builds around Rockstar's most anticipated release, GameVice keeps you in the loop with the latest news, leaks, trailers, and community discussions all in one place. Dive into detailed breakdowns of GTA 6’s storyline, characters, and gameplay features, or join fellow fans in speculating and sharing theories. GameVice also lets you create personalized stacks to track Rockstar games, compare GTA titles, and see how GTA 6 ranks against other open-world giants. Whether you're a longtime fan of the Grand Theft Auto series or new to the franchise, GameVice is your go-to hub for everything GTA 6 and beyond.
        </p>
      </div>
    </>
  );
};

export default About;
