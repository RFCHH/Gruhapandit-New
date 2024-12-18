import React, { useState } from "react";
import person from "../assets/person.png";
import student from "../assets/student1.png";
import tutor from "../assets/tutor1.png";
import { useNavigate } from "react-router-dom";

const UserSelection = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(selectedOption){

      const upperCaseOption = selectedOption.toUpperCase();

      localStorage.setItem("type",upperCaseOption);
      navigate("/SignUp");
    }
  }

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="absolute top-0 left-0 w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="536"
          viewBox="0 0 1920 536"
          fill="none"
          className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-white"
        >
          <path
            d="M-857 185.27L-733.417 231.924C-609.833 279.454 -362.667 371.447 -115.5 348.887C131.667 325.451 378.833 185.27 626 161.834C873.167 139.274 1120.33 231.267 1367.5 220.316C1614.67 209.364 1861.83 91.0868 1985.42 33.4815L2109 -25V535.721H1985.42C1861.83 535.721 1614.67 535.721 1367.5 535.721C1120.33 535.721 873.167 535.721 626 535.721C378.833 535.721 131.667 535.721 -115.5 535.721C-362.667 535.721 -609.833 535.721 -733.417 535.721H-857V185.27Z"
            fill="url(#paint0_radial_377_608)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_377_608"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(257 -506.059) rotate(90) scale(1002.96 5305.27)"
            >
              <stop offset="0.266" stopColor="#26A3C9" />
              <stop offset="1" stopColor="#FAF6FF" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center p-8 lg:py-16 space-y-6 md:space-y-0 md:space-x-8 max-w-5xl mt-40">
        <div className="flex-shrink-0 hover:scale-110 transition-transform duration-200">
          <img
            src={person}
            alt="Character Illustration"
            className="w-56 h-72"
          />
        </div>
        <div className="flex-grow w-full">
          <div className="space-y-4">
            <div
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 ${
                selectedOption === "student"
                  ? "bg-purple-200 border-purple-400"
                  : "border-purple-300 hover:bg-purple-50"
              }`}
              onClick={() => handleSelection("student")}
            >
              <div>
                <h3 className="text-lg font-semibold text-purple-600">
                  I am Student
                </h3>
                <p className="text-sm text-gray-500">
                  Unlock your potential with us—join today!
                </p>
              </div>
              <div className="ml-6">
                <img src={student} alt="Student Icon" className="w-12 h-12 md:w-24 md:h-24" />
              </div>
            </div>

            <div
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 ${
                selectedOption === "tutor"
                  ? "bg-purple-200 border-purple-400"
                  : "border-purple-300 hover:bg-purple-50"
              }`}
              onClick={() => handleSelection("tutor")}
            >
              <div>
                <h3 className="text-lg font-semibold text-purple-600">
                  I am Tutor
                </h3>
                <p className="text-sm text-gray-500">
                  Inspire minds, shape futures—join us as a tutor!
                </p>
              </div>
              <div className="ml-6">
                <img src={tutor} alt="Tutor Icon" className="w-16 h-16 md:w-24 md:h-24" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              className={`px-6 py-2 rounded-lg ${
                selectedOption
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              // onSubmit={handlesubmit}
              disabled={!selectedOption}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
