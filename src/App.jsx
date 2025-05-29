import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/Content/Carousel";

// Images for the carousel and background
const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
];

function App() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Blurred background matching current carousel item */}
      <div
        className="fixed inset-0 -z-10 bg-black/80"
        style={{
          backgroundImage: `url(${images[current]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(24px) brightness(0.7)',
          transition: 'background-image 0.7s',
        }}
        aria-hidden="true"
      />
      {/* Overlay for extra darkening */}
      <div className="fixed inset-0 -z-10 bg-black/60" aria-hidden="true" />
      <Navbar />
      <Carousel images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
}

export default App;