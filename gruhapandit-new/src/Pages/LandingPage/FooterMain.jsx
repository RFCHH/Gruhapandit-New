import React from "react";
import gruhapandit from "../../assets/1.png";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const currentYear = new Date().getFullYear(); // Get the current year dynamically


const Footer = () => {
  return (
    <footer className="bg-blue-500 bg-opacity-10 text-black py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-section flex flex-col items-center md:items-start text-center md:text-left">
          <img
            className="w-[200px] h-[200px] mb-4   "
            src={gruhapandit}
            alt="Gruhapandit Logo" 
          />
          <p className="text-black">
            Providing quality tuitions and educational services to help you
            achieve academic excellence.
          </p>
        </div>

        <div className="footer-section text-black">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/About" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/LoginPage" className="hover:underline">
                Sign In
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section text-black">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              <span>+91 9618859004</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              <a
                href="mailto:gruhapandittuitions@gmail.com"
                className="hover:underline"
              >
                gruhapandittuitions@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4 text-black">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/people/Gruhapandit-Tuitions/61566845707627/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition transform hover:scale-110"
          >
            <FaFacebook size="32" />
          </a>
          <a
            href="https://www.youtube.com/@GruhapanditTuitions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 transition transform hover:scale-110"
          >
            <FaYoutube size="32" />
          </a>
          <a
            href="https://www.instagram.com/gruhapandit_tuitions/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition transform hover:scale-110"
          >
            <FaInstagram size="32" />
          </a>
          <a
            href="https://x.com/gruhapandi47996"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition transform hover:scale-110"
          >
            <FaSquareXTwitter size="32" />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto text-center text-black">
          &copy; {currentYear} Gruhapandit Tuitions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 