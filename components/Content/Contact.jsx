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
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold font-century-gothic text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)] tracking-wider uppercase mb-4">
          Contact Us
        </h1>
        <form
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 flex flex-col gap-5 border border-green-400/30"
          onSubmit={e => { e.preventDefault(); alert('Thank you for contacting us!'); }}
        >
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="text-green-400 font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 border border-gray-700"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="text-green-400 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 border border-gray-700"
              placeholder="you@email.com"
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="message" className="text-green-400 font-semibold mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 border border-gray-700 resize-none"
              placeholder="Type your message..."
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-green-400 text-gray-900 font-bold py-2 rounded-lg shadow-lg hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
