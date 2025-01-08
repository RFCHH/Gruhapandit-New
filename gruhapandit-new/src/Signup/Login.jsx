import { useState } from "react";
import loginImg from "../assets/Login.png";
import Sign1 from "../assets/Login1.png";
import userIdIcon from "../assets/email.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("--select--");
  const [termsAccepted, setTermsAccepted] = useState(false); 

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    role: "",
    termsAccepted:""
  });
  
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateuserId = (userId) => {
    const userIdRegex = /^[a-zA-Z]\d+$/;
    return userIdRegex.test(userId);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formErrors = { userId: "", password: "", role: "", termsAccepted: "" };
  
    if (!userId) {
      formErrors.userId = "Please enter a userId.";
    } else if (!validateuserId(userId)) {
      formErrors.userId = "Please enter a valid userId.";
    }
  
    if (!password) {
      formErrors.password = "Please enter a password.";
    } else if (!validatePassword(password)) {
      formErrors.password =
        "Password must be 8-15 characters long, include uppercase, lowercase, a number, and a special character.";
    }
  
    if (role === "--select--") {
      formErrors.role = "Please select a role.";
    }
  
    if (!termsAccepted) {
      formErrors.termsAccepted = "You must agree to the Terms and Conditions.";
    }
  
    setErrors(formErrors);
  
    if (
      !formErrors.userId &&
      !formErrors.password &&
      !formErrors.role &&
      !formErrors.termsAccepted
    ) {
      const formData = {
        userId,
        password,
        type: role.toUpperCase(),
      };
  
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
  
      try {
        const response = await axiosInstance.post(
          `/authentication/login`,
          formData
        );
  
        if (response.status === 200) {
          const data = response.data;
          console.log("Login successful:", data);
  
          alert(response.data.message || "Login successful!");
  
          const { token, userRole, userId } = data;
  
          localStorage.setItem("UserId", userId);
          localStorage.setItem("Token", token);
          localStorage.setItem("UserRole", userRole);
  
          if (userRole === "ROLE_ADMIN") {
            navigate("/Registration");
          } else if (userRole === "ROLE_PREMIUM_USER") {
            navigate("/successfull");
            setTimeout(() => {
              navigate(`/Dashboard/${userId}`);
            }, 3000);
          } else if (userRole === "ROLE_REGULAR_USER") {
            navigate("/successfull");
            setTimeout(() => {
              navigate(`/Dashboard/${userId}`);
            }, 3000);
          } else {
            console.log("Navigated to employeeDashboard");
            navigate(`/userdashboard`);
          }
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            serverError: data?.message || "Login failed. Please try again.",
          }));
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          serverError: "Login failed. Please try again.",
        }));
      }
    }
  };
  

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden px-4 sm:px-8 py-8 sm:py-12 top-10">
      <div className="relative bg-white shadow-lg rounded-lg flex flex-col md:flex-row max-w-6xl w-full overflow-hidden z-20 mx-auto p-6 md:p-8 space-y-6 md:space-y-0">
        <div className="flex justify-center items-center w-full bg-white p-6 md:w-1/2 md:justify-start">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-full max-w-[400px] object-cover transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 w-full md:w-1/2 bg-[#F4EBFF] shadow-2xl rounded-md mx-4 md:mx-8 space-y-4 hover:scale-105 transition duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <img
              src={Sign1}
              alt="Login"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            />
          </div>
          <h2 className="text-lg sm:text-2xl text-gray-800 text-center mb-4 font-bold">
            Login with Password
          </h2>
          {errors.serverError && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.serverError}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="userId" className="sr-only">
                UserId
              </label>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src={userIdIcon} alt="UserId Icon" className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="userId"
                placeholder="Enter your User ID"
                value={userId}
                maxLength={10}
                onKeyDown={(e) => e.key === " " && e.preventDefault()}
                onChange={(e) => setuserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none pl-10"
              />
              {errors.userId && (
                <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                value={password}
                minLength={8}
                maxLength={15}
                onKeyDown={(e) => e.key === " " && e.preventDefault()}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <p className="text-right text-sm mt-1">
              <a
                onClick={() => navigate("/ForgotPassword")}
                className="text-blue-500 hover:text-blue-700 transition duration-300 cursor-pointer"
              >
                Forgot Password?
              </a>
            </p>

            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="--select--">Select Role</option>
                <option value="STUDENT">STUDENT</option>
                <option value="TUTOR">TUTOR</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agreeCheckbox"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <p className="text-sm">
                  I have read and agree to the {" "}
                  <a
                    onClick={() => window.open('/TermsAndConditions_4.pdf', '_blank')}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a>
                </p>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.termsAccepted}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-48 py-3 bg-[#FFFFFF] text-[#000000] font-bold rounded-md border-2 hover:bg-[#F4EBFF] hover:border-blue-300 shadow-xl"
              >
                Sign In
              </button>
            </div>
            <p className="text-center text-sm text-black mt-4 font-semibold">
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/SignUp")}
                className="text-[#2AB0FF] hover:text-purple-500 transition duration-300"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full">
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

export default LoginPage;
