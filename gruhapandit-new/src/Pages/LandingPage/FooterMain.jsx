import React from "react";
// import gruhapandit from "../../assets/1.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#1e293b] text-white py-10 px-6 relative">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-700 opacity-10 pointer-events-none"></div>

      <div className="footer-section flex flex-col items-center md:items-start text-center md:text-left">
        {/* Logo & Motto (Image on the Left and Text on the Right) */}
        {/* <div className="flex items-center space-x-4 mb-6">
          <img
            className="w-[100px] h-[80px]"
            src={gruhapandit}
          /> */}
          <h1 className="text-3xl font-bold tracking-wider text-blue-300">
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {/* Logo & Motto */}
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-3xl font-bold tracking-wider text-blue-300">
              Gruhapandit
            </h1>
            <p className="text-sm text-gray-100">
              Your guide to academic excellence. Discover innovative learning
              solutions with us.
            </p>
            <p className="text-sm text-gray-100">
              Empowering students with expert tuition services tailored to their
              unique needs.
            </p>
          </div>

          {/* Navigation Links (Centered) */}
          <div className="flex flex-col items-center space-y-3">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Quick Links
            </h3>
            <ul className="space-y-1 text-center">
              <li>
                <a href="#home" className="hover:text-blue-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links (Centered) */}
          <div className="flex flex-col items-center space-y-3">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Stay Connected
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/people/Gruhapandit-Tuitions/61566845707627/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-blue-500 text-white hover:scale-110 transition-transform"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/gruhapandi47996"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-blue-400 text-white hover:scale-110 transition-transform"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/gruhapandit_tuitions/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-purple-500 text-white hover:scale-110 transition-transform"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@GruhapanditTuitions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-red-500 text-white hover:scale-110 transition-transform"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Contact Us
            </h3>
            <p className="text-sm text-gray-100">Email: info@gruhapandit.com</p>
            <p className="text-sm text-gray-100">Phone: +91 12345 67890</p>
            <p className="text-sm text-gray-100">
              Address: Hyderabad, Telangana, India
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400 relative z-10">
          <p>© 2025 Gruhapandit Tuitions. All rights reserved.</p>
        </div>
      </div>
  );
}

export default Footer;
