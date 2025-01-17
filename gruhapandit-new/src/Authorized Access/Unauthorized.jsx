import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/Mainlayout";

const Unauthorized = () => {
  // const handleClearLocalStorage = () => {
  //   localStorage.clear();
  // };
  return (
    <MainLayout>
    <div className="text-center text-2xl mt-60">
      <h1>Unauthorized Access</h1>
      <p className="mb-5"> You do not have permission to view this page.</p>

      <Link 
        to="/Payment" 
        // onClick={handleClearLocalStorage} 
        className="border-solid bg-green-500 rounded-lg px-4 py-2 text-white"
      >
        Go to Payment
      </Link>
    </div>
    </MainLayout>
  );
};

export default Unauthorized;
