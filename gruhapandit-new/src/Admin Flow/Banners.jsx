import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/Mainlayout";

const Banners = () => {
  return (
    <MainLayout>
      <div className="bg-blue-50 min-h-screen p-4">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Active Banners</h2>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Banner
        </button>
      </div>
    </MainLayout>
  );
};

export default Banners;
