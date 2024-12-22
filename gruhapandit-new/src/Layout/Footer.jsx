import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex space-x-10 ">
        <a
          href="https://www.facebook.com/people/Gruhapandit-Tuitions/61566845707627/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-xl" style={{ color: "#1877F2" }} />
        </a>
        <a
          href="https://x.com/gruhapandi47996"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="text-xl" style={{ color: "#1DA1F2" }} />
        </a>
        <a
          href="https://www.instagram.com/gruhapandit_tuitions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-xl" style={{ color: "#E1306C" }} />
        </a>
        <a
          href="https://www.youtube.com/@GruhapanditTuitions"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="text-xl" style={{ color: "#FF0000" }} />
        </a>
      </div>
      <span className="text-[#049548] font-medium mt-2">
        Follow us on Social Media
      </span>
    </div>
  );
}

export default Footer;
