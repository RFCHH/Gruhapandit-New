import React from "react";
import MainLayout from "../Layout/Mainlayout";

const MyFeedStudent = () => {
  return (
    <MainLayout>
      <div className="bg-blue-100 min-h-screen">
        
        <nav className="flex justify-between items-center px-4 py-4">
          <button className="bg-blue-500 text-white px-8 py-2 ml-40 mb-10 rounded-tr-xl rounded-bl-xl hover:bg-blue-600">
            My Feed
          </button>
          <button className="bg-blue-500 text-white px-8 py-2 mr-36 mt-16 rounded-tr-xl rounded-bl-xl hover:bg-blue-600">
            Exam
          </button>
        </nav>

       
        <div className="container mx-auto  ml-44 p-4 bg-white rounded-lg shadow-lg w-3/4">
          
          <div className="grid grid-cols-3 gap-8 p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
              >
                <p className="text-sm">
                  <span className="font-semibold">User ID:</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Name:</span> 
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span>{" "}
                  
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Subject:</span> 
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyFeedStudent;
