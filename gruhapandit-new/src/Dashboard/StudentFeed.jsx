import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/Mainlayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyFeedStudent = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const size = 10; // Define the size per page

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("UserId");
      if (!token || !userId) {
        console.log("token, userId are missing");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/requests/feed?userId=${userId}&page=${currentPage}&size=${size}`
        );

        // Check if response.data and response.data.content exist
        if (response.data && Array.isArray(response.data)) {
          console.log("Fetched Feed Data:", response.data); // Debugging line
          setFeedData(response.data); // Set feedData directly from response
          setTotalPages(Math.ceil(response.data.length / size)); // Update total pages based on length
        } else {
          setFeedData([]); // Set to an empty array if no content
          setTotalPages(0); // Reset total pages if no content
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <MainLayout>
      <div className="bg-blue-50 min-h-screen pl-16 sm:pl-16 p-4">
   
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

        <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {loading ? (
              <p>Loading...</p>
            ) : feedData.length === 0 ? (
              <p>No data found</p>
            ) : (
              feedData.map((item, index) => (
                <div
                  key={index}
                  className="p-5 mx-auto bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
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

         
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyFeedStudent;