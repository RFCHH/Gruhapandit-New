import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { useSpring, animated } from "react-spring";
import SchoolImage from "./../../src/assets/5.png";
import CollegeImage from "./../../src/assets/6.png";
import Technical from "./../../src/assets/7.png";
import Global from "./../../src/assets/8.png";
import Competitive from "./../../src/assets/9.png";
import Soft from "./../../src/assets/10.png";
import Government from "./../../src/assets/31.png";
import Entrance from "./../../src/assets/12.png";
import MainLayout from "../Layout/Mainlayout";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Tutions from "../assets/tutions-g.webp";
import studentimg from "../assets/Studentimg.png";
import studyImg from "../assets/studyImg.webp";
import Professor from "../assets/Professor.png";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// import { motion, AnimatePresence } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem("UserId");
  const userRole = localStorage.getItem("UserRole");
  const profile = localStorage.getItem("Profile");

  const navigate = useNavigate();

  const images = [Tutions, studentimg, Professor, studyImg];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Auto-rotate every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const animatedCount = (count) => {
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: count },
      config: { tension: 100, friction: 15 },
    });
    return number.to((n) => Math.floor(n).toString() + "+");
  };

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ["#10b981", "#e5e7eb"],
        hoverBackgroundColor: ["#059669", "#d1d5db"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        const data = response.data;
        setFullname(data.fullName);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/categoryCount?userId=${userId}`
        );
        console.log("API Response:", response.data);

        const transformedData = response.data.reduce(
          (acc, { category, count }) => {
            acc[category] = count;
            return acc;
          },
          {}
        );
        setCategoryCounts(transformedData);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, [userId]);

  const handlePaymentNavigation = () => {
    navigate("/Payment");
  };

  return (
    <>
      <MainLayout>
        <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-200 pl-12 lg:pl-2 md:pl-2">
          <main className="flex-1 p-4 sm:p-6 md:ml-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow flex items-center">
                <img
                  src={profile}
                  alt="Profile Icon"
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mr-4 sm:mr-8"
                />
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold">
                    {loading ? "Loading..." : `Welcome ${fullname}`}
                  </h2>
                  <p className="text-sm sm:text-lg text-black mt-2 sm:mt-4">
                    Each step you take today is a brick in the foundation of
                    your future. Build wisely, dream boldly, and create your own
                    path!
                  </p>
                </div>
              </div>

              <div className="bg-white p-3 md:p-6 rounded-lg shadow flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8">
                  <div className="relative w-24 h-24 md:w-40 md:h-40">
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex md:ml-2 md:mb-5 ml-2 lg:mt-5 items-center justify-center text-green-600 font-bold text-xs md:text-lg">
                      40%
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3 md:space-y-6">
                    <h3 className="text-xs md:text-md font-bold text-gray-700 text-center md:text-left">
                      Complete Your Profile
                    </h3>
                    <button
                      className="bg-blue-500 text-white text-sm px-2 py-1 md:px-4 md:py-2 rounded-lg"
                      onClick={() => navigate(`/Profile/${userId}`)}
                    >
                      Profile{" "}
                    </button>
                    {localStorage.getItem("role") === "TUTOR" && (
                      <button
                        onClick={() => navigate(`/National/${userId}`)}
                        className="bg-green-500 text-white text-xs px-2 py-1 md:px-4 md:py-2 rounded-lg"
                      >
                        KYC
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full mt-6 mb-6">
              <div className="overflow-hidden rounded-lg shadow-xl relative">
                <img
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex + 1}`}
                  className="w-full max-h-[200px] md:max-h-[400px] object-cover rounded-lg transition-opacity duration-500 ease-in-out"
                  loading="lazy"
                />
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-2 md:p-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 ease-in-out backdrop-blur-sm"
                  aria-label="Previous slide"
                >
                  <MdArrowBackIos className="w-4 h-4 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-2 md:p-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 ease-in-out backdrop-blur-sm"
                  aria-label="Next slide"
                >
                  <MdArrowForwardIos className="w-4 h-4 md:w-6 md:h-6" />
                </button>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  title: "School Education",
                  name: "SCHOOL_EDUCATION",
                  icon: SchoolImage,
                },
                {
                  title: "Under/Post Graduate",
                  name: "UG_PG_EDUCATION",
                  icon: CollegeImage,
                },
                {
                  title: "Technical Skills",
                  name: "TECHNICAL_SKILLS",
                  icon: Technical,
                },
                {
                  title: "Competitive Exams",
                  name: "COMPETITIVE_EXAMS",
                  icon: Competitive,
                },
                {
                  title: "Entrance Exams",
                  name: "ENTRANCE_EXAMS",
                  icon: Entrance,
                },
                {
                  title: "Global Language",
                  name: "GLOBAL_LANGUAGES",
                  icon: Global,
                },
                { title: "Soft Skills", name: "SOFT_SKILLS", icon: Soft },
                { title: "HOBBIES", name: "HOBBIES", icon: Government },
              ].map((card, index) => {
                const count = categoryCounts[card.name];

                return (
                  <div
                    className="option-card border rounded-2xl bg-white p-4 md:p-6 shadow-md hover:shadow-lg transition"
                    key={index}
                    onClick={() => {
                      if (userRole === "ROLE_PREMIUM_USER") {
                        navigate(`/subject/${userId}`, {
                          state: { category: card.name },
                        });
                      } else {
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    <div className="text-center">
                      <img
                        src={card.icon}
                        alt={`${card.title} Icon`}
                        className="w-12 h-12 md:w-16 md:h-16 mx-auto"
                      />
                    </div>
                    <h3 className="text-sm md:text-lg text-center font-semibold mb-2 md:mb-4">
                      {card.title}
                    </h3>
                    <animated.p className="text-xl md:text-3xl text-center font-extrabold">
                      {animatedCount(count)}
                    </animated.p>
                  </div>
                );
              })}
            </div>
          </main>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg text-center relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={() => setIsModalOpen(false)}
                >
                  <IoClose size={24} />
                </button>
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-blue-600">
                  Complete Your Payment
                </h2>
                <p className="mb-4 md:mb-6">
                  To proceed, kindly make a payment to continue exploring
                  additional options.
                </p>
                <button
                  className="bg-purple-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg"
                  onClick={handlePaymentNavigation}
                >
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Dashboard;
