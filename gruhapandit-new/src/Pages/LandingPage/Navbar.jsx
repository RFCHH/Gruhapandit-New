// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();

//   const homeClick = () => {
//     navigate("/")
//   }

//   const aboutClick = () => {
//     navigate("/About");
//   };

//   const servicesClick = () => {
//     navigate("/OurServices");
//   }

//   const reviewsClick = () => {
//     navigate("/Reviews");
//   }

//   const contactClick = () => {
//     navigate("/ContactUs");
//   }




//   return (
//     <div className="flex flex-row justify-end gap-4 mr-4 p-4 border-black bg-blue-400">
//       <h1 onClick={homeClick} style={{ cursor: 'pointer' }}>Home</h1>
//       <h1 onClick={aboutClick} style={{ cursor: 'pointer' }}>About Us</h1>
//       <h1 onClick={servicesClick} style={{ cursor: 'pointer' }}>Our Services</h1>
//       <h1 onClick={reviewsClick} style={{ cursor: 'pointer' }}>Reviews</h1>
//       <h1 onClick={contactClick} style={{ cursor: 'pointer' }}>Contact Us</h1>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gruhapandit from "../../assets/1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); 
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full h-20 z-50">
      <div className="container mx-auto flex justify-between items-center h-full px-6 sm:px-8">
        <div className="flex items-center justify-center">
          <img
            src={gruhapandit}
            alt="Gruhapandit Logo"
            className="w-36 h-36 sm:w-28 sm:h-28 md:w-36 md:h-36 max-w-full rounded-full object-cover mt-5"
            onClick={() => navigateTo("/")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigateTo("/")}
            className={`font-bold px-3 py-2 transition-all duration-300 hover:bg-purple-50 ${
              isActive("/") ? "text-purple-500" : "text-gray-800"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo("/About")}
            className={`font-bold px-3 py-2 transition-all duration-300 hover:bg-purple-50 ${
              isActive("/About") ? "text-purple-500" : "text-gray-800"
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => navigateTo("/OurServices")}
            className={`font-bold px-3 py-2 transition-all duration-300 hover:bg-purple-50 ${
              isActive("/OurServices") ? "text-purple-500" : "text-gray-800"
            }`}
          >
            Our Services
          </button>
          <button
            onClick={() => navigateTo("/Reviews")}
            className={`font-bold px-3 py-2 transition-all duration-300 hover:bg-purple-50 ${
              isActive("/Reviews") ? "text-purple-500" : "text-gray-800"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => navigateTo("/ContactUs")}
            className={`font-bold px-3 py-2 transition-all duration-300 hover:bg-purple-50 ${
              isActive("/ContactUs") ? "text-purple-500" : "text-gray-800"
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => navigateTo("/LoginPage")}
            className={`bg-gradient-to-r from-[#0A97B0] to-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-[#0288D1] hover:to-green-600 transition-all duration-300 transform hover:scale-105 ${
              isActive("/LoginPage") ? "ring-2 ring-green-500" : ""
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => navigateTo("/UserSelection")}
            className={`bg-gradient-to-r from-[#0A97B0] to-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-[#0288D1] hover:to-green-600 transition-all duration-300 transform hover:scale-105 ${
              isActive("/SignUp") ? "ring-2 ring-green-500" : ""
            }`}
          >
            Sign Up
          </button>
        </nav>

        <button
          className="md:hidden text-gray-700 text-4xl hover:text-gray-900 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg fixed top-20 left-0 w-full z-50">
          <nav className="flex flex-col space-y-4 p-6">
            <button
              onClick={() => navigateTo("/")}
              className={`font-bold px-3 py-2 transition-all duration-300 ${
                isActive("/") ? "text-purple-500" : "text-gray-800"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo("/About")}
              className={`font-bold px-3 py-2 transition-all duration-300 ${
                isActive("/About") ? "text-purple-500" : "text-gray-800"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo("/OurServices")}
              className={`font-bold px-3 py-2 transition-all duration-300 ${
                isActive("/OurServices") ? "text-purple-500" : "text-gray-800"
              }`}
            >
              Our Services
            </button>
            <button
              onClick={() => navigateTo("/Reviews")}
              className={`font-bold px-3 py-2 transition-all duration-300 ${
                isActive("/Reviews") ? "text-purple-500" : "text-gray-800"
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => navigateTo("/ContactUs")}
              className={`px-4 py-2 rounded-full border-2 border-purple-500 font-medium transition-all duration-300 ${
                isActive("/ContactUs") ? "text-white bg-purple-500" : "text-purple-500"
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => navigateTo("/UserSelection")}
              className={`bg-gradient-to-r from-[#0A97B0] to-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-[#0288D1] hover:to-green-600 transition-all duration-300 ${
                isActive("/SignUp") ? "ring-2 ring-green-500" : ""
              }`}
            >
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

