import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/Mainlayout";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyFeedStudent = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const role =localStorage.getItem("role");
  const navigate =useNavigate();
  const UserRole=localStorage.getItem("UserRole");

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
      <div className="bg-blue-100 min-h-screen">
        <nav className="flex justify-between items-center px-4 py-4">
          <button className="bg-blue-500 text-white px-8 py-2 ml-40 mb-10 rounded-tr-xl rounded-bl-xl hover:bg-blue-600">
            My Feed
          </button>
          <button className="bg-blue-500 text-white px-8 py-2 mr-36 mt-16 rounded-tr-xl rounded-bl-xl hover:bg-blue-600"
            onClick={()=>navigate('/ExamList')
            }> Exam
          </button>
        </nav>

        <div className="container mx-auto ml-44 p-4 bg-white rounded-lg shadow-lg w-3/4">
          <div className="grid grid-cols-3 gap-8 p-6">
            {loading ? (
              <p>Loading...</p>
            ) : feedData.length === 0 ? (
              <p>No data found</p> // Display message when no data is found
            ) : (
              feedData.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
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
