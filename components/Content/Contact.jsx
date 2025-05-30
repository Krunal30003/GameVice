import React from "react";
import Navbar from "../Navbar/Navbar";

const Contact = () => (
  <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold text-green-400 mb-4">Contact Page</h1>
      <p className="text-lg text-gray-200 max-w-xl">
        This is the Contact page. You can add your contact form or details here.
      </p>
    </div>
  </>
);

export default Contact;
