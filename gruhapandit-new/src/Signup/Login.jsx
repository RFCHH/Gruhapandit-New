import React, { useState } from "react";
import loginImg from '../assets/Login.png'; 
import Sign1 from "../assets/Login1.png"; 
import userIdIcon from "../assets/email.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from '../axiosInstance';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("--select--"); 
  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    role: ""
  });
  const navigate=useNavigate();

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
  
    let formErrors = { userId: "", password: "", role: "" };
  
    if (!userId) {
      formErrors.userId = "Please enter a userId.";
    } else if (!validateuserId(userId)) {
      formErrors.userId = "Please enter a valid userId.";
    }
  
    
    if (!validatePassword(password)) {
      formErrors.password =
        "Password must be 8-15 characters long, include uppercase, lowercase, a number, and a special character.";
    }
  
    if (role === "--select--") {
      formErrors.role = "Please select a role.";
    }
  
    setErrors(formErrors);
  
    if (!formErrors.userId && !formErrors.password && !formErrors.role) {
      const formData = {
        userId,
        password,
        type: role.toUpperCase(), 
      };
  
      try {
        const response = await axiosInstance.post(
          "https://tution-application.onrender.com/tuition-application/authentication/login",
          formData
        );
  
        if (response.status === 200) {
          alert(response.data.message || "Login successful!");
        } else {
          alert("Something went wrong. Please try again later.");
        }
        navigate("/successfull")
        setTimeout(() => {
          navigate("/Dashboard");
        }, 3000);
      } catch (error) {
        console.error(
          "API Error:",
          error.response?.data?.message || error.message
        );
        alert("Failed to submit form. Please check your details and try again.");
      }
    }
  };
  

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden">
      <div className="relative bg-white shadow-lg rounded-lg flex flex-col md:flex-row max-w-6xl w-full overflow-hidden z-20 mt-8 mx-auto">
        
        <div className="flex justify-center items-center w-full bg-white p-6 md:w-1/2 md:justify-start">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-full max-w-[450px] object-cover transform md:scale-100 scale-110"
          />
        </div>

        <div className="flex flex-col justify-center p-8 w-full md:w-1/2 bg-[#F4EBFF] shadow-2xl rounded-md my-auto mx-4 md:mx-8">
          <div className="flex justify-center">
            <img src={Sign1} alt="Login" className="h-20 w-20 object-contain" />
          </div>
          <h2 className="text-2xl text-gray-800 text-center mb-4 font-bold">Login with Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="relative">
              <label htmlFor="userId" className="sr-only">UserId</label>
              <div className="absolute left-3 top-5 -translate-y-1/2 flex items-center justify-center">
                <img src={userIdIcon} alt="userId Icon" className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="userId"
                placeholder="Enter your user Id"
                value={userId}
                maxLength={10}
                onKeyDown={(e) => e.key === " " && e.preventDefault()}
                onChange={(e) => setuserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none pl-10"
              />
              {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
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
                className="absolute right-3 top-6 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

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
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            <div className="flex justify-center mt-4">
              <button
              onClick={() => navigate("/successfull")}
                type="submit"
                className="w-48 py-3 bg-[#FFFFFF] text-[#000000] font-bold rounded-md border-2 hover:bg-[#F4EBFF] hover:border-blue-300 shadow-xl"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;