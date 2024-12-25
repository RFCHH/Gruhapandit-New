import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgetImg from "../assets/ForgotPassword.png";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};

    if (!emailOrPhone) {
      validationErrors.emailOrPhone = "Email or phone number is required.";
    } else if (/^\d+$/.test(emailOrPhone)) {
      if (emailOrPhone.length !== 10) {
        validationErrors.emailOrPhone =
          "Phone number must be exactly 10 digits.";
      }
    } else if (!/^\S+@\S+\.\S+$/.test(emailOrPhone)) {
      validationErrors.emailOrPhone = "Please enter a valid email address.";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setShowPopup(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/PasswordVerification", { state: { emailOrPhone } });
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden pt-16">
      <div className="absolute top-10 left-10 text-pink-300 text-2xl">★</div>
      <div className="absolute top-20 right-7 text-blue-300 text-xl">•</div>
      <div className="absolute bottom-24 left-16 text-purple-300 text-3xl">
        ✦
      </div>
      <div className="absolute bottom-12 right-24 text-pink-300 text-2xl">
        •
      </div>
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-blue-300 text-lg">
        ✦
      </div>
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center p-10 md:p-16 space-y-10 md:space-y-0 md:space-x-16 max-w-5xl relative z-20">
        <div className="flex-shrink-0">
          <img
            src={forgetImg}
            alt="Forgot Password Illustration"
            className="w-auto md:w-96 transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>

        <div className="flex-grow bg-[#F4EBFF] shadow-xl w-full md:w-3/4 p-8 sm:p-12 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
              FORGOT PASSWORD
            </h2>
            <div className="w-40 sm:w-48 h-0.5 bg-[#F44D99] mb-8" />
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                maxLength="10"
                placeholder="Email / Phone Number *"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 ${
                  errors.emailOrPhone ? "border-red-500" : "border-purple-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.emailOrPhone
                    ? "focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
              />
              {errors.emailOrPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrPhone}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-40 sm:w-56 py-3 sm:py-4 bg-[#FFFFFF] text-[#000000] font-bold rounded-md border-2 hover:border-blue-300 shadow-xl flex items-center justify-center hover:bg-purple-500 hover:text-white transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already Registered?{" "}
              <a href="/LoginPage" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
            <div className="flex justify-center items-center mb-4">
              <span className="text-green-500 text-4xl">✔</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Success
            </h2>
            <p className="text-gray-600 mb-6">
              Your email/phone number has been successfully submitted!
            </p>
            <button
              className="w-24 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handlePopupClose}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="800"
          viewBox="0 0 1920 800"
          fill="none"
          className="w-full h-auto"
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
    </div>
  );
};

export default ForgotPassword;
