import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
        <div className="flex flex-col items-center ">
            <div className="flex space-x-10">
                <FaFacebookF className="text-xl text-blue-500" />
                <FaTwitter className="text-xl text-blue-500" />
                <FaInstagram className="text-xl text-blue-500" />
                <FaLinkedinIn className="text-xl text-blue-500" />
            </div>
            <span className="text-green-950 font-medium">Follow us on Media</span>
        </div>
    )
}
export default Footer;