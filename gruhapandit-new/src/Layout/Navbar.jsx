import React from "react";
import { FaBell } from "react-icons/fa";
import Logo from "../assets/GruhapandithIcon.png";
import { IoPersonSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black shadow-md border rounded-lg px-4">
      <div className="flex items-center space-x-2">
        <img
          src={Logo}
          alt="Logo"
          className="w-44 h-14 object-contain"
          style={{
            filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>

      <div className="flex items-center space-x-6">
        <FaBell className="text-blue-500 text-lg cursor-pointer" />
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <IoPersonSharp className="text-red-500 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
