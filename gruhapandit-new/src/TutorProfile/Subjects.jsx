// import React from "react";
import MainLayout from "../Layout/Mainlayout";

const tutors = [
  { name: "Sneha", location: "Hyderabad", subject: "Mathematics", ratings: 5 },
  { name: "Roshini", location: "Delhi", subject: "English", ratings: 4 },
  { name: "Saikumar", location: "Mumbai", subject: "Hindi", ratings: 5 },
  { name: "Saikiran", location: "Bangalore", subject: "Science", ratings: 4 },
  { name: "Venky", location: "England", subject: "Social", ratings: 5 },
  { name: "Sanath", location: "Australia", subject: "Hindi", ratings: 5 },
];

const Subjects = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4 sm:px-8">
        <div className="bg-blue-50 px-4 py-4 ml-10 sm:p-8 lg:p-12 w-full max-w-7xl rounded-lg shadow-lg">
          {/* {/ Header /} */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 lg:mb-8 bg-white px-4 py-4 lg:px-6 lg:py-5 rounded-lg shadow-md">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 text-center">
              Subject Request
            </h1>
            <div className="relative w-full sm:w-72 mt-4 lg:mt-0">
              <label htmlFor="search" className="sr-only">
                Search Tutors
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search"
                className="border rounded-full px-4 py-2 w-full focus:outline-none shadow-sm text-gray-600"
              />
              <button
                className="absolute right-4 top-2.5 text-gray-400 hover:text-gray-600"
                aria-label="Search"
              >
                🔍
              </button>
            </div>
          </div>

          {/* {/ Cards Grid /} */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {tutors.map((tutor, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">
                    Name: <span className="font-normal">{tutor.name}</span>
                  </p>
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">
                    Location:{" "}
                    <span className="font-normal">{tutor.location}</span>
                  </p>
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">
                    Subject: <span className="font-normal">{tutor.subject}</span>
                  </p>
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">
                    Ratings:
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`text-yellow-400 ${
                          starIndex < tutor.ratings ? "" : "opacity-30"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <button className="bg-blue-500 text-white font-medium rounded py-2 hover:bg-blue-600">
                  Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Subjects;
