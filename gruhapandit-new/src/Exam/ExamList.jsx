import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // React icon for Cancel button
import axiosInstance from "../axiosInstance";
import MainLayout from "../Layout/Mainlayout";

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newExam, setNewExam] = useState({
    examName: "",
    startDate: "",
    endDate: "",
    percentage: "",
    noOfAttempts: "",
    assigned: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam({ ...newExam, [name]: value });
  };

  const handleCreateExam = async () => {
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
    console.log(userId);

    if(!userId || !token){
        console.log("userId,token are came");
        return;
    }

    const payload = {
      userId:userId,
      examName: newExam.examName,
      startDate: newExam.startDate,
      endDate: newExam.endDate,
      passPercentage: parseInt(newExam.percentage, 10) || 0,
      numberOfAttempts: parseInt(newExam.noOfAttempts, 10) || 0,
      examDuration: parseInt(newExam.assigned, 10) || 0, // Assuming `assigned` represents duration
    };

    try {
      const response = await axiosInstance.post(`/exams/createExams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setExams([...exams, data]); // Add the new exam to the list
        setShowPopup(false);
        setNewExam({
          examName: "",
          startDate: "",
          endDate: "",
          percentage: "",
          noOfAttempts: "",
          assigned: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to create exam: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("An error occurred while creating the exam.");
    }
  };

  return (
    <MainLayout>
    <div className="p-5 bg-gray-100 min-h-screen mt-16 ml-14">
      <button
        className="mb-4 bg-blue-600 text-white py-2 px-6 rounded shadow hover:bg-blue-700 transition duration-300"
        onClick={() => setShowPopup(true)}
      >
        Create Exam
      </button>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-50">
            <tr>
              <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
                Exam Name
              </th>
              <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
                Start Date
              </th>
              <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
                End Date
              </th>
              <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
                Percentage
              </th>
              <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
                No. of Attempts
              </th>
              <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
                Assigned
              </th>
              <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={index} className="text-center even:bg-gray-50">
                <td className="border px-6 py-3">{exam.examName}</td>
                <td className="border px-6 py-3">{exam.startDate}</td>
                <td className="border px-6 py-3">{exam.endDate}</td>
                <td className="border px-6 py-3">{exam.passPercentage}%</td>
                <td className="border px-6 py-3">{exam.numberOfAttempts}</td>
                <td className="border px-6 py-3">{exam.examDuration}</td>
                <td className="border px-6 py-3">
                  <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300">
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-300"
              onClick={() => setShowPopup(false)}
            >
              <AiOutlineClose size={24} />
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-medium">Exam Name</label>
                <input
                  type="text"
                  name="examName"
                  value={newExam.examName}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={newExam.startDate}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={newExam.endDate}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Assigned</label>
                <input
                  type="text"
                  name="assigned"
                  value={newExam.assigned}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                onClick={handleCreateExam}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </MainLayout>
  );
};

export default ExamList;
