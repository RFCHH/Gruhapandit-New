import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 mx-auto"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 mx-auto"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4 mx-auto"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-2/3 mb-2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
