import React, { useState } from "react";
import passwordImg from '../assets/password.png';
import { useNavigate } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!selectedOption) {
      newErrors.dropdown = "Please select how you heard about us.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      console.log("Form validation failed. Please check the inputs.");
      return;
    }
     
    const formDetails = JSON.parse(localStorage.getItem("formDetails"));
    if (!formDetails) {
      alert("Signup details are missing. Please sign up again.");
      return;
    }

    const {
      address,
      type,
      fullName,
      emailId,
      countryCode,
      mobileNumber,
      dateOfBirth,
      gender,
      country,
    } = formDetails;

    const postData = {
      type: type,
      fullName: fullName,
      emailId: emailId,
      countryCode: countryCode,
      mobileNumber: mobileNumber,
      dateOfBirth: dateOfBirth,
      gender: gender,
      country: country,
      address: address,
      password: password,
    };

    try {
      const response = await axiosInstance.post(
        `/users/`,
        postData
      );

      alert("Password created successfully!");
      // console.log(response.data);

      navigate("/LoginPage");
    } catch (error) {
      console.error("Error creating password:", error);
      if (error.response && error.response.status === 409) {
        alert("Email already exists");
        localStorage.clear();
        navigate("/userselection");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.includes(" ")) {
      e.preventDefault();
    } else {
      setPassword(newPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    if (newConfirmPassword.includes(" ")) {
      e.preventDefault();
    } else {
      setConfirmPassword(newConfirmPassword);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center p-12 space-y-8 md:space-y-0 md:space-x-12 max-w-6xl relative mt-28 z-20">
        <div className="absolute top-10 left-20 text-pink-300 text-2xl">★</div>
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

        <div className="flex-shrink-0">
          <img
            src={passwordImg}
            alt="Character Illustration"
            className="w-auto md:w-80 transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>

        <div className="flex-grow bg-[#F4EBFF] shadow-xl transform hover:scale-105 transition duration-300 ease-in-out w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
          <div className="bg-purple-50 p-6 sm:p-8 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#000000] mb-2">
                CREATE PASSWORD
              </h2>
              <div className="w-32 sm:w-40 h-0.5 bg-[#F44D99] mb-6" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  id="password"
                  maxLength={15}
                  minLength={8}
                  onChange={handlePasswordChange}
                  placeholder="Password *"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 ${
                    errors.password ? "border-red-500" : "border-purple-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-gray-500 w-5 h-5" />
                  ) : (
                    <FaEye className="text-gray-500 w-5 h-5" />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  id="confirmPassword"
                  onChange={handleConfirmPasswordChange}
                  maxLength={15}
                  minLength={8}
                  placeholder="Confirm Password *"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-purple-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? (
                    <FaEyeSlash className="text-gray-500 w-5 h-5" />
                  ) : (
                    <FaEye className="text-gray-500 w-5 h-5" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="relative">
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 ${
                    errors.dropdown ? "border-red-500" : "border-purple-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors.dropdown
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                >
                  <option value="">How did you hear about us?</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friends">Friends</option>
                  <option value="Advertisements">Advertisements</option>
                </select>
                {errors.dropdown && (
                  <p className="text-red-500 text-sm mt-1">{errors.dropdown}</p>
                )}
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-36 sm:w-48 py-2 sm:py-3 bg-[#FFFFFF] text-[#000000] font-bold rounded-md border-2 hover:border-blue-300 shadow-xl flex items-center justify-center hover:bg-purple-500 hover:text-white transition duration-300"
                >
                  Sign Up
                  <IoArrowForwardOutline className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full mb-48">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="536"
          viewBox="0 0 1920 536"
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

export default CreatePassword;
