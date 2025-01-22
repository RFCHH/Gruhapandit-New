import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/Mainlayout";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyFeedStudent = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const UserRole = localStorage.getItem("UserRole");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("UserId");
      if (!token || !userId) {
        console.log("token, userId are missing");
        return;
      }

      try {
        const page = 0; // Define the page value
        const size = 10; // Define the size per page
        const response = await axiosInstance.get(
          `/requests/feed?userId=${userId}&page=${page}&size=${size}`
        );
        setFeedData(response.data); // Assuming response.data contains the feed data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchUserData();
  }, []);

  return (
    <MainLayout>
    <div className="bg-blue-50 min-h-screen pl-16 sm:pl-16 p-4">
      {/* Navigation */}
      <nav className="flex flex-col md:grid-cols-1 justify-between items-center px-4 py-4">
  <p className="text-center mx-auto md:flex-row text-xl bg-blue-200 text-black font-semibold w-full sm:w-auto md:px-48 md:ml-16 px-6 sm:px-8 lg:px-96 lg:ml-36 py-2 mb-10 rounded-tr-xl rounded-bl-xl">
    My Feed
  </p>
  <button
    className="bg-blue-500 text-white px-6 md:mr-[73px] py-2 mt-4 sm:mt-0 lg:mt-4 md:mt-2 sm:ml-auto mr-0 sm:mr-0 lg:mr-36 rounded-tr-xl rounded-bl-xl hover:bg-blue-600"
    onClick={() => {
      if (role === "TUTOR") {
        navigate('/ExamList');
      } else {
        navigate('/SelfExam');
      }
    }}
  >
    Exam
  </button>
</nav>

  
      {/* Main Content */}
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : feedData.length === 0 ? (
            <p>No data found</p> // Display message when no data is found
          ) : (
            feedData.map((item, index) => (
              <div
                key={index}
                className="p-3 mx-auto bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
              >
                <p className="text-sm">
                  <span className="font-semibold">User ID:</span> {item.userId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Name:</span> {item.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {item.emailId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Subject:</span> {item.subject}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </MainLayout>
  

  );
};

export default MyFeedStudent;
