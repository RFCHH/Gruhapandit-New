import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import MainLayout from "../Layout/Mainlayout";

function Exam() {
  const [savedData, setsavedData] = useState([]);
  const [error, setError] = useState(null);
  const UserRole =localStorage.getItem("UserRole");
  const role =localStorage.getItem("role");

  const { examId } = useParams();

  const userId = localStorage.getItem("UserId");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchedData = async () => {
      const token = localStorage.getItem("Token");
      try {
        const response = await axiosInstance.get(
          `/exams/getAllStudentExams/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log("Fetched Data:", data);
        setsavedData(data);
      } catch (error) {
        console.error("Error in fetching data", error);

        let errorMessage = "Error in fetching data. Please try again.";
        if (error.response?.data) {
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
      }
    };

    fetchedData();
  }, []);

  const handlebackclick = (event) => {
    event.preventDefault();
    navigate(`/Feeds/${userId}`);
  };
  return (
    <>
      <MainLayout>
        <div className="flex items-center justify-center px-2 py-2  border-2 border-gray-800 rounded-md w-40 ml-14 mb-5 mt-5">
          <FaLessThan className="text-black mr-2" />
          <button onClick={handlebackclick}>
            <span className="font-semibold text-black">Previous Page</span>
          </button>
        </div>
        <div className="container mx-auto p-4">
          <div className="mt-4">
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border border-solid border-black p-1 text-center">
                      Exam Name
                    </th>
                    <th className="border border-solid border-black p-1 text-center">
                      Start Date
                    </th>
                    <th className="border border-solid border-black p-1 text-center">
                      End Date
                    </th>
                    <th className="border border-solid border-black p-1 text-center">
                      Duration
                    </th>
                    <th className="border border-solid border-black p-1 text-center">
                      No of Attempts
                    </th>
                    <th className="border border-solid border-black p-1 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedData.length > 0 ? (
                    savedData.map((data) => {
                      console.log("Data for each exam:", data);
                      const examId = data.id || data.examId;
                      return (
                        <tr key={examId} className="text-center">
                          <td className="border border-solid border-gray-400 p-1">
                            {data.examName}
                          </td>
                          <td className="border border-solid border-gray-400 p-1">
                            {data.startDate}
                          </td>
                          <td className="border border-solid border-gray-400 p-1">
                            {data.endDate}
                          </td>
                          <td className="border border-solid border-gray-400 p-1">
                            {data.examDuration}
                          </td>
                          <td className="border border-solid border-gray-400 p-1">
                            {data.numberOfAttempts}
                          </td>

                          <td className="border border-solid border-gray-400 p-1">
                            <button
                              onClick={() => navigate(`/examstart/${examId}`)}
                              className={`px-4 py-2 rounded-md ${
                                data.numberOfAttempts === 0
                                  ? "bg-gray-400 text-white cursor-not-allowed"
                                  : "bg-green-500 text-white"
                              }`}
                              disabled={data.numberOfAttempts === 0}
                            >
                              Start
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Exam;
