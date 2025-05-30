import React from "react";
import Navbar from "../Navbar/Navbar";

const About = () => (
  <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold text-green-400 mb-4">About Page</h1>
      <p className="text-lg text-gray-200 max-w-xl">
        Welcome to the About page!<br />
        This is a sample About section. You can add more information about your app or team here.
      </p>
    </div>
  </>
);

export default About;
