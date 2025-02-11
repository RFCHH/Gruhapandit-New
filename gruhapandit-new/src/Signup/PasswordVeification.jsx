import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import verificationImg from "../assets/ForgotPassword.png";
import { FiArrowLeft } from "react-icons/fi";
import axiosInstance from "../axiosInstance";

const PasswordVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setuserId] = useState(location.state?.userId || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (otpTimer > 0) {
      const timerId = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [otpTimer]);

  const validateForm = () => {
    const newErrors = {};
    if (!userId) {
      newErrors.userId = "UserId is required.";
    }
    if (!otp) {
      newErrors.otp = "OTP is required.";
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character.";
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation failed:", validationErrors);
      return;
    }

    setLoading(true);

    try {
      console.log("Sending API request with:", { userId, password, otp });

      const response = await axiosInstance.patch(
        `/authentication/resetPassword?userId=${userId}&password=${password}&otp=${otp}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Your password has been successfully created!");
        navigate("/LoginPage");
      }
    } catch (error) {
      console.error("API call error:", error);

      if (error.response?.status === 400) {
        const apiError = error.response.data?.message || "Invalid OTP";
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: apiError,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: "Invalid OTP",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpTimer(30);
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `/authentication/forgotPassword?userId=${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert(
          "Your OTP has successfully been sent to your registered Email / Phone Number."
        );

        // Clear the input fields
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
      }
    } catch (error) {
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center p-6 md:p-10 lg:p-12 space-y-6 md:space-y-0 md:space-x-6 max-w-5xl mx-auto mt-16 z-20">
        <div className="flex-shrink-0">
          <img
            src={verificationImg}
            alt="Character Illustration"
            className="w-64 md:w-72 lg:w-80 max-w-full transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>

        <div className="flex-grow bg-[#F4EBFF] shadow-xl w-full px-4 py-6 md:px-6 lg:px-8 rounded-lg">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#000000] mb-2">
            FORGOT PASSWORD
          </h2>
          <div className="w-24 md:w-32 lg:w-40 h-0.5 bg-[#F44D99] mb-4" />

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={userId}
                readOnly
                onChange={(e) => setuserId(e.target.value)}
                placeholder="Email/Phone Number *"
                className={`w-full px-3 py-2 border-2 ${
                  errors.userId ? "border-red-500" : "border-purple-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.userId ? "focus:ring-red-500" : "focus:ring-purple-500"
                }`}
              />
              {errors.userId && (
                <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
              )}
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP *"
                className={`flex-grow px-3 py-2 border-2 ${
                  errors.otp ? "border-red-500" : "border-purple-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.otp ? "focus:ring-red-500" : "focus:ring-purple-500"
                }`}
              />
              <button
                type="button"
                disabled={otpTimer > 0}
                onClick={handleResendOtp}
                className={`ml-2 px-4 py-2 rounded-lg text-white ${
                  otpTimer > 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } transition duration-300`}
              >
                {otpTimer > 0 ? `Resend OTP in ${otpTimer} sec` : "Resend OTP"}
              </button>
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
            )}

            <div className="relative h-[50px]">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password *"
                className={`w-full px-3 py-2 border-2 ${
                  errors.password ? "border-red-500" : "border-purple-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative h-[100px] pt-8">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password *"
                className={`w-full px-3 py-2 border-2 ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-purple-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full md:w-36 lg:w-48 py-2 bg-[#FFFFFF] text-[#000000] font-bold rounded-md border-2 hover:border-blue-300 shadow-xl hover:bg-purple-500 hover:text-white transition duration-300"
                onClick={handleSubmit}
              >
                Create Password
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

export default PasswordVerification;
