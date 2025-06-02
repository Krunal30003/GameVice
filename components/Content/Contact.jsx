import React, { useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formSectionRef = useRef(null);

  useEffect(() => {
    if (formSectionRef.current) {
      gsap.fromTo(
        formSectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      <div
        ref={formSectionRef}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12 px-4 sm:px-0"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold font-century-gothic text-green-400 drop-shadow-[0_0_16px_rgba(34,197,94,0.8)] tracking-widest uppercase mb-2 animate-pulse">
          Contact Us
        </h1>
        <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto font-century-gothic animate-fade-in">
          Have a question, suggestion, or just want to say hi? Fill out the form
          below and our team will get back to you as soon as possible!
        </p>
        <form
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col gap-6 border border-green-400/30 animate-fade-in"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for contacting us!");
          }}
        >
          <div className="flex flex-col text-left">
            <label
              htmlFor="name"
              className="text-green-400 font-semibold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-gray-900/80 text-green-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-300 border border-green-700 transition-all duration-200 shadow-inner hover:scale-[1.02]"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col text-left">
            <label
              htmlFor="email"
              className="text-green-400 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-gray-900/80 text-green-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-300 border border-green-700 transition-all duration-200 shadow-inner hover:scale-[1.02]"
              placeholder="you@email.com"
            />
          </div>
          <div className="flex flex-col text-left">
            <label
              htmlFor="message"
              className="text-green-400 font-semibold mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="bg-gray-900/80 text-green-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-300 border border-green-700 resize-none transition-all duration-200 shadow-inner hover:scale-[1.02]"
              placeholder="Type your message..."
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-green-400 via-green-300 to-green-500 text-gray-900 font-extrabold py-3 rounded-lg shadow-lg hover:scale-105 hover:from-green-500 hover:to-green-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 tracking-widest uppercase animate-pulse"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 flex flex-col items-center gap-2 animate-fade-in">
          <span className="text-green-200 text-base font-century-gothic tracking-wide">
            We love hearing from you!
          </span>
        </div>
      </div>
    </>
  );
};

export default Contact;
