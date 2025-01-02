import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {

  const handleClearLocalStorage = () => {
    localStorage.clear();
  };
  return (
    <div  className="text-center text-2xl mt-60">
      <h1>Unauthorized Access</h1>
      <p className="mb-5"> You do not have permission to view this page.</p>

      <Link to="/LoginPage"  onClick={handleClearLocalStorage} className="border-solid bg-green-500 rounded-lg  ">Go to Login</Link>
      
    </div>
  );
};

export default Unauthorized;
