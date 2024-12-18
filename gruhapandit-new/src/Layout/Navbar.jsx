import React from "react";
import { FaBell } from "react-icons/fa";
import Logo from './../../src/assets/1.png';
import { IoPersonSharp } from "react-icons/io5";


const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-white text-black shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={Logo}
          alt="Logo"
          className="mr-2 w-14 "
        />
        <span className="font-semibold text-lg">Gruhapandit</span>
      </div>

      <div className="flex items-center space-x-4">
        <FaBell className="cursor-pointer" />
        {/* <IoPersonSharp /> */}
        <img
          src={<IoPersonSharp/>}
          alt="User"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
