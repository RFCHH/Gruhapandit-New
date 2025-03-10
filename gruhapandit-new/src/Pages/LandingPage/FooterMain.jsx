import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/1.png"
function Footer() {
  return (
    <div className="bg-[#1e293b] text-white py-10 px-6 relative">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-700 opacity-10 pointer-events-none"></div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
        {/* Logo & Motto */}
        
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h1 className="text-3xl font-bold tracking-wider text-blue-300">
            Gruhapandit
          </h1>
          <p className="text-sm text-gray-100 text-center md:text-left">
            Your guide to academic excellence. Discover innovative learning
            solutions with us.
          </p>
          <p className="text-sm text-gray-100 text-center md:text-left">
            Empowering students with expert tuition services tailored to their
            unique needs.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Quick Links
          </h3>
          <ul className="space-y-1 text-center">
            <li>
              <Link to="/" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-blue-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/OurServices" className="hover:text-blue-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" className="hover:text-blue-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies Links */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Company
          </h3>
          <ul className="space-y-1 text-center">
            <li>
              <a
                href="/"
                className="hover:text-blue-300"
                onClick={() => window.open("/TermsAndConditions_4.pdf")}
              >
                Terms and Conditions
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-blue-300"
                onClick={() => window.open("/PrivacyPolicy1.pdf")}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-blue-300"
                onClick={() => window.open("/RefundPolicy.pdf")}
              >
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
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
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Contact Us
          </h3>
          <p className="text-sm text-gray-100">
            Email:{" "}
            <a
              href="mailto:gruhapandittutions@gmail.com"
              className="text-blue-500 underline"
            >
              gruhapandittutions@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-100">Phone: +91 9618853331</p>
          <p className="text-sm text-gray-100">
            Address: Hyderabad, Telangana, India
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400 relative z-10">
        <p>© {new Date().getFullYear()} Gruhapandit Tuitions. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
