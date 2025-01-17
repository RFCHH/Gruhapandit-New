import React, { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaStar,
  FaSignOutAlt,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { SiGooglesheets } from "react-icons/si";
import { FaBoxOpen } from "react-icons/fa6";
import { MdPersonSearch, MdPolicy } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "./../../src/assets/1.png";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsPersonCircle, BsPersonCheckFill } from "react-icons/bs";
import { BiLogoGmail, BiSolidReport } from "react-icons/bi";
import { FcAdvertising } from "react-icons/fc";
import axiosInstance from "../axiosInstance";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("UserId");
  const userRole = localStorage.getItem("UserRole");
  const role = localStorage.getItem("role");

  // console.log(userRole);

  const userMenuItems = [
    {
      path: `/Dashboard/${userId}`,
      label: "Dashboard",
      icon: <TbLayoutDashboardFilled className="text-gray-700 text-lg" />,
    },
    {
      path: `/Profile/${userId}`,
      label: "Person",
      icon: <FaUser className="text-gray-700 text-lg" />,
    },

    ...(role === "TUTOR"
      ? [
          {
            path: `/National/${userId}`,
            label: "National ID",
            icon: <FaIdCard className="text-gray-700 text-lg" />,
          },
        ]
      : []),

    {
      path: `/Feeds/${userId}`,
      label: "My Feeds",
      icon: <SiGooglesheets className="text-gray-700 text-lg" />,
    },
    {
      path: `/plans/${userId}`,
      label: "My Plans",
      icon: <FaBoxOpen className="text-gray-700 text-lg" />,
    },
    {
      path: `/Request/${userId}`,
      label: "My Requests",
      icon: <MdPersonSearch className="text-gray-700 text-xl" />,
    },
    {
      path: `/review`,
      label: "Reviews",
      icon: <FaStar className="text-gray-700 text-lg" />,
    },
    {
      path: `/PrivacyPolicy_2.pdf`,
      label: "Policy",
      icon: <MdPolicy className="text-gray-700 text-lg" />,
      action:() => window.open("/PrivacyPolicy1.pdf", "_blank"),
    },
  ];
  const adminMenuItems = [
    {
      path: `/Registration`,
      label: "Registration",
      icon: <BsPersonCircle className="text-gray-700 text-lg" />,
    },
    {
      path: `/email-templates`,
      label: "Email",
      icon: <BiLogoGmail className="text-gray-700 text-lg" />,
    },
    {
      path: `/banner`,
      label: "Banner",
      icon: <FcAdvertising className="text-gray-700 text-lg" />,
    },
    {
      path: `/reports`,
      label: "Reports",
      icon: <BiSolidReport className="text-gray-700 text-lg" />,
    },
    {
      path: `/Request`,
      label: "Request Approval",
      icon: <BsPersonCheckFill className="text-gray-700 text-xl" />,
    },
  ];

  const menuItems = userRole === "ROLE_ADMIN" ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");

    if (!token || !userId) {
      console.log("Token or userId is missing");
      alert("You are not logged in.");
      return;
    }

    try {
      axiosInstance
        .delete(`/authentication/logout?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Logout successful", response.data);

          localStorage.clear();
          navigate("/LoginPage");
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            console.error("Access Denied: Invalid Token");
            alert(
              "Your session has expired or the token is invalid. Please log in again."
            );
            localStorage.clear();
            navigate("/LoginPage");
          } else {
            console.error("Error during logout", error);
            alert("Error during logout, please try again.");
          }
        });
    } catch (error) {
      console.error("Error in logout function", error);
      alert("Unexpected error, please try again.");
    }
  };

  return (
    <div className="relative flex h-screen">
      <aside
        className={`fixed left-0 top-16 bottom-24 h-auto bg-white shadow-md rounded-2xl flex flex-col justify-between transition-all duration-300 ${
          isExpanded ? "w-40" : "w-14"
        }`}
      >
        <div className="flex items-center justify-center p-3">
          <img
            src={Logo}
            alt="Logo"
            className={`${isExpanded ? "w-28 h-28" : "w-12 h-12"}`}
          />
        </div>

        <nav className="flex-1">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => (item.action ? item.action() :navigate(item.path))}
                className={`flex items-center py-3 px-4 cursor-pointer  transition-all ${
                  location.pathname === item.path
                    ? "bg-gray-200"
                    : "hover:bg-blue-100"
                }`}
              >
                {item.icon}
                {isExpanded && (
                  <span className="ml-3 text-gray-700">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="flex items-center px-3 py-3 hover:bg-blue-100 cursor-pointer justify-end"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-red-500 text-lg" />
          {isExpanded && (
            <span className="ml-3 font-bold text-red-500">Logout</span>
          )}
        </div>

        <div className="flex justify-end p-3">
          <button
            onClick={toggleSidebar}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {isExpanded ? (
              <FaAngleDoubleLeft size={20} />
            ) : (
              <FaAngleDoubleRight size={20} />
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
