import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ExamPopUp from "./ExamPopUp";
import axiosInstance from '../axiosInstance';

const CreateExam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamData = async () => {
      const userId=localStorage.getItem("UserId");
      try {
        const response = await axiosInstance.get(`/exams/getAllExams/${userId}`);
        if (response.data && Array.isArray(response.data)) {
          setTableData(response.data);
        } else {
          console.error('API response is not in expected format.');
        }
      } catch (error) {
        console.error('Error fetching exam data:', error);
      }
    };
    fetchExamData();
  }, []);

  const handleAddButtonClick = () => {
    setIsEditing(false);
    setCurrentData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setCurrentData(tableData[index]);
    setIsModalOpen(true);
  };

  const handleSave = (newData) => {
    // Validate fields before saving
    const { examName, startDate, endDate, examDuration, numberOfAttempts, assignedTo } = newData;

    if (!examName || !startDate || !endDate || !examDuration || !numberOfAttempts || !d || assignedTo.length === 0) {
      alert('Please fill in all fields.');
      return;
    }

    if (isEditing) {
      const updatedData = [...tableData];
      updatedData[editingIndex] = newData;
      setTableData(updatedData);
    } else {
      setTableData([...tableData, newData]);
    }
    setIsModalOpen(false);
  };


  const handleView = (examId) => {
    navigate(`/CreateQuestion/${examId}`);
  };

  const handleBackNavigation = () => {
    navigate('/adminDashboard');
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem("Token");
    const examId = tableData[index]?.examId; 
    const userId = localStorage.getItem("UserId");
  
    if (!examId) {
      alert("Exam ID is undefined. Please check the data.");
      console.error("Exam ID is missing for index:", index);
      return;
    }
  
    try {
      console.log("Deleting Exam ID:", examId); // Log the examId for debugging
      const response = await axiosInstance.delete(
        `https://tution-application.onrender.com/tuition-application/exams/${examId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Exam deleted successfully!");
        // Remove the deleted exam from the tableData state
        const updatedTableData = tableData.filter((_, i) => i !== index);
        setTableData(updatedTableData);
      } else {
        alert("Failed to delete exam.");
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error deleting exam:", error.response?.data || error.message);
      alert(
        error.response?.data?.detail || "An error occurred while deleting the exam."
      );
    }
  };
  

  
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <button
            onClick={handleBackNavigation}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={handleAddButtonClick}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Create Exam 
          </button>
        </div>

        <table className="min-w-full border-collapse border rounded-sm border-gray-300">
          <thead className="bg-black text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Exam Name</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Duration</th>
              <th className="border border-gray-300 px-4 py-2">No. of Attempts</th>
              <th className="border border-gray-300 px-4 py-2">passPercentage</th>
              <th className="border border-gray-300 px-4 py-2">Assigned</th>
              <th className="border border-gray-300 px-4 py-2">View</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">No exams available</td>
              </tr>
            ) : (
              tableData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 text-center px-4 py-2">{row.examName}</td>
                  <td className="border border-gray-300 text-center px-4 py-2">{row.startDate}</td>
                  <td className="border border-gray-300 text-center px-4 py-2">{row.endDate}</td>
                  <td className="border border-gray-300 text-center px-4 py-2">{row.examDuration}</td>
                  <td className="border border-gray-300 text-center px-4 py-2">{row.numberOfAttempts}</td>
                  <td className="border border-gray-300 text-center px-4 py-2">{row.passPercentage}</td>
                  <td className="border border-gray-300 text-center px-4 py-2">
                    {row.assignedTo && Array.isArray(row.assignedTo) ? row.assignedTo.join(', ') : 'N/A'}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <AiOutlineEye
                      size={21}
                      color="black"
                      className="text-blue-500 cursor-pointer"
                      title="View"
                      onClick={() => handleView(row.examId)}  // Pass the examId here
                    />
                  </td>
                  <td className="border border-gray-300 text-center px-4 py-3 flex justify-center space-x-2">
                    <AiOutlineEdit
                      size={21}
                      color="black"
                      className="text-green-500 cursor-pointer"
                      title="Edit"
                      onClick={() => handleEdit(index)}
                    />
                    <AiOutlineDelete
                      size={21}
                      className="text-red-500 cursor-pointer"
                      title="Delete"
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {isModalOpen && (
          <ExamPopUp
            initialData={currentData}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default CreateExam;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
// import axiosInstance from '../axiosInstance';
// import MainLayout from '../Layout/Mainlayout';

// const CreateExam = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [tableData, setTableData] = useState([]);
//   const [currentData, setCurrentData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExamData = async () => {
//       try {
//         const response = await axiosInstance.get('/exams/getAllExams/T106');
//         if (response.data && Array.isArray(response.data)) {
//           setTableData(response.data);
//         } else {
//           console.error('API response is not in expected format.');
//         }
//       } catch (error) {
//         console.error('Error fetching exam data:', error);
//       }
//     };
//     fetchExamData();
//   }, []);

//   const handleAddButtonClick = () => {
//     setIsEditing(false);
//     setCurrentData(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (index) => {
//     setIsEditing(true);
//     setEditingIndex(index);
//     setCurrentData(tableData[index]);
//     setIsModalOpen(true);
//   };

//   const handleSave = (newData) => {
//     // Validate fields before saving
//     const { examName, startDate, endDate, duration, maxAttempts, departmentId } = newData;

//     if (!examName || !startDate || !endDate || !duration || !maxAttempts || !departmentId || departmentId.length === 0) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     if (isEditing) {
//       const updatedData = [...tableData];
//       updatedData[editingIndex] = newData;
//       setTableData(updatedData);
//     } else {
//       setTableData([...tableData, newData]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleDelete = async (index) => {
//     const examToDelete = tableData[index];
//     try {
//       await axiosInstance.delete(`hrmsapplication/exam/delete/${examToDelete.examId}`);
//       const updatedData = tableData.filter((_, i) => i !== index);
//       setTableData(updatedData);
//     } catch (error) {
//       console.error('Error deleting exam:', error);
//     }
//   };

//   const handleView = (examId) => {
//     navigate(`/CreateQuestion/${examId}`);
//   };

//   const handleBackNavigation = () => {
//     navigate('/adminDashboard');
//   };

//   return (
//     <>
//     <MainLayout>
//       <div className="p-4">
//         <div className="flex justify-between mb-4">
//           <button
//             onClick={handleBackNavigation}
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleAddButtonClick}
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Create Exam
//           </button>
//         </div>

//         <table className="min-w-full border-collapse border rounded-sm border-gray-300">
//           <thead className="bg-black text-white">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2">Exam Name</th>
//               <th className="border border-gray-300 px-4 py-2">Start Date</th>
//               <th className="border border-gray-300 px-4 py-2">End Date</th>
//               <th className="border border-gray-300 px-4 py-2">Duration</th>
//               <th className="border border-gray-300 px-4 py-2">No. of Attempts</th>
//               <th className="border border-gray-300 px-4 py-2">passPercentage</th>
//               <th className="border border-gray-300 px-4 py-2">Assigned</th>
//               <th className="border border-gray-300 px-4 py-2">View</th>
//               <th className="border border-gray-300 px-4 py-2">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {tableData.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-4">No exams available</td>
//               </tr>
//             ) : (
//               tableData.map((row, index) => (
//                 <tr key={index} className="odd:bg-white even:bg-gray-50">
//                   <td className="border border-gray-300 text-center px-4 py-2">{row.examName}</td>
//                   <td className="border border-gray-300 text-center px-4 py-2">{row.startDate}</td>
//                   <td className="border border-gray-300 text-center px-4 py-2">{row.endDate}</td>
//                   <td className="border border-gray-300 text-center px-4 py-2">{row.examDuration}</td>
//                   <td className="border border-gray-300 text-center px-4 py-2">{row.numberOfAttempts}</td>
//                   <td className="border border-gray-300 text-center px-4 py-2">{row.passPercentage}</td>
//                   <td className="border border-gray-300 text-center px-4 py-2">
//                     {row.assignedTo && Array.isArray(row.assignedTo) ? row.assignedTo.join(', ') : 'N/A'}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <AiOutlineEye
//                       size={21}
//                       color="black"
//                       className="text-blue-500 cursor-pointer"
//                       title="View"
//                       onClick={() => handleView(row.examId)}
//                     />
//                   </td>
//                   <td className="border border-gray-300 text-center px-4 py-3 flex justify-center space-x-2">
//                     <AiOutlineEdit
//                       size={21}
//                       color="black"
//                       className="text-green-500 cursor-pointer"
//                       title="Edit"
//                       onClick={() => handleEdit(index)}
//                     />
//                     <AiOutlineDelete
//                       size={21}
//                       className="text-red-500 cursor-pointer"
//                       title="Delete"
//                       onClick={() => handleDelete(index)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {isModalOpen && (
//           <ExamPopUp
//             initialData={currentData}
//             onSave={handleSave}
//             onClose={() => setIsModalOpen(false)}
//           />
//         )}
//       </div>
//       </MainLayout>
//     </>
//   );
// };

// export default CreateExam;

// import React, { useState } from "react";
// import { AiOutlineClose } from "react-icons/ai"; // React icon for Cancel button
// import axiosInstance from "../axiosInstance";
// import MainLayout from "../Layout/Mainlayout";
// import { FaLessThan } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";

// const ExamList = () => {
//   const [exams, setExams] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [newExam, setNewExam] = useState({
//     examName: "",
//     startDate: "",
//     endDate: "",
//     passPercentage: "",
//     numberOfAttempts: "",
//     examDuration:"",
//     assigned: "",
//   });

// const navigate=useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewExam({ ...newExam, [name]: value });
//   };

//   // const handleCreateExam = async () => {
//   //   const token = localStorage.getItem("Token");
//   //   const userId = localStorage.getItem("UserId");

//   //   console.log(userId);

//   //   if(!userId || !token){
//   //       console.log("userId,token are came");
//   //       return;
//   //   }

//   //   const payload = {
//   //     userId:userId,
//   //     examName: newExam.examName,
//   //     startDate: newExam.startDate,
//   //     endDate: newExam.endDate,
//   //     passPercentage: parseInt(newExam.passPercentage, 10) || 0,
//   //     numberOfAttempts: parseInt(newExam.numberOfAttempts, 10) || 0,
//   //     examDuration: parseInt(newExam.assigned, 10) || 0, // Assuming `assigned` represents duration
//   //   };

//   //   try {
//   //     const response = await axiosInstance.post(`/exams/createExams`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify(payload),
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       setExams([...exams, data]); // Add the new exam to the list
//   //       setShowPopup(false);
//   //       setNewExam({
//   //         examName: "",
//   //         startDate: "",
//   //         endDate: "",
//   //         passPercentage: "",
//   //         numberOfAttempts: "",
//   //         examDuration:"",
//   //         assigned: "",
//   //       });
//   //     } else {
//   //       const errorData = await response.json();
//   //       alert(`Failed to create exam: ${errorData.message}`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error creating exam:", error);
//   //     alert("An error occurred while creating the exam.");
//   //   }
//   // };


//   const [isLoading, setIsLoading] = useState(false);

//   const handleCreateExam = async () => {
//     const token = localStorage.getItem("Token");
//     const userId = localStorage.getItem("UserId");
  
//     if (!userId || !token) {
//       alert("User is not authenticated. Please log in again.");
//       return;
//     }
  
//     // Validate input fields
//     if (!newExam.examName || !newExam.startDate || !newExam.endDate) {
//       alert("Please fill in all required fields.");
//       return;
//     }
  
//     const passPercentage = parseInt(newExam.passPercentage, 10);
//     const numberOfAttempts = parseInt(newExam.numberOfAttempts, 10);
//     const examDuration = parseInt(newExam.examDuration, 10);
  
//     // Build the payload object
//     const payload = {
//       userId: userId,
//       examName: newExam.examName,
//       startDate: newExam.startDate,
//       endDate: newExam.endDate,
//       passPercentage: passPercentage >= 0 ? passPercentage : 0,
//       numberOfAttempts: numberOfAttempts >= 0 ? numberOfAttempts : 0,
//       examDuration: examDuration >= 0 ? examDuration : 0,
//       assignedTo: newExam.assigned
//         ? newExam.assigned.split(",").map((id) => id.trim())
//         : [],
//     };
  
//     try {
//       // Set loading state
//       setIsLoading(true);
  
//       const response = await axiosInstance.post(`/exams/createExams`, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.status === 201 || response.status === 200) {
//         const data = response.data;
  
//         // Update state with new exam
//         setExams([...exams, data]);
//         setShowPopup(false); // Close the popup
//         setNewExam({
//           examName: "",
//           startDate: "",
//           endDate: "",
//           passPercentage: "",
//           numberOfAttempts: "",
//           examDuration: "",
//           assigned: "",
//         });
//       } else {
//         console.error(`Failed to create exam. Status: ${response.status}`);
//         alert(`Failed to create exam: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error creating exam:", error);
//       alert(error.response?.data?.message || "An error occurred while creating the exam.");
//     } finally {
//       // Reset loading state
//       setIsLoading(false);
//     }
//   };

//   const handlebackclick = ((event) => {
//     event.preventDefault();
//     navigate(-1);
//   })
  
//   return (
//     <MainLayout>
//        <div className="flex items-center justify-center px-2 py-2  border-2 border-gray-800 rounded-md w-40 ml-14 mb-5 mt-5">
//                             <FaLessThan className="text-black mr-2" />
//                             <button onClick={handlebackclick}><span className="font-semibold text-black">Previous Page</span></button>
//                         </div>
//     <div className="p-5 bg-gray-100 min-h-screen mt-16 ml-14">
//       <button
//         className="mb-4 bg-blue-600 text-white py-2 px-6 rounded shadow hover:bg-blue-700 transition duration-300"
//         onClick={() => setShowPopup(true)}
//       >
//         Create Exam
//       </button>

//       <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 Exam Name
//               </th>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 Start Date
//               </th>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 End Date
//               </th>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 Percentage
//               </th>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 No. of Attempts
//               </th>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 Exam Duration
//               </th>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 Assigned
//               </th>
//               <th className="border px-6 py-3 text-blue-900 font-medium text-sm">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {exams.map((exam, index) => (
//               <tr key={index} className="text-center even:bg-gray-50">
//                 <td className="border px-6 py-3">{exam.examName}</td>
//                 <td className="border px-6 py-3">{exam.startDate}</td>
//                 <td className="border px-6 py-3">{exam.endDate}</td>
//                 <td className="border px-6 py-3">{exam.passPercentage}%</td>
//                 <td className="border px-6 py-3">{exam.numberOfAttempts}</td>
//                 <td className="border px-6 py-3">{exam.examDuration}</td>
//                 <td className="border px-6 py-3">{exam.assignedTo}</td>
//                 <td className="border px-6 py-3">
//                   <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300">
//                     View More
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-300"
//               onClick={() => setShowPopup(false)}
//             >
//               <AiOutlineClose size={24} />
//             </button>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-600 font-medium">Exam Name</label>
//                 <input
//                   type="text"
//                   name="examName"
//                   value={newExam.examName}
//                   onChange={handleInputChange}
//                   className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">Start Date</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={newExam.startDate}
//                   onChange={handleInputChange}
//                   className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">End Date</label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={newExam.endDate}
//                   onChange={handleInputChange}
//                   className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">Percentage</label>
//                 <input
//                   type="text"
//                   name="passPercentage"
//                   value={newExam.passPercentage}
//                   onChange={handleInputChange}
//                   className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">No of Attempts</label>
//                 <input
//                   type="text"
//                   name="numberOfAttempts"
//                   value={newExam.numberOfAttempts}
//                   onChange={handleInputChange}
//                   className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">ExamDruation</label>
//                 <input
//                   type="text"
//                   name="examDuration"
//                   value={newExam.examDuration}
//                   onChange={handleInputChange}
//                   className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 font-medium">Assigned</label>
//                 <input
//                   type="text"
//                   name="assigned"
//                   value={newExam.assigned}
//                   onChange={handleInputChange}
//                   className="w-full border rounded p-2 text-gray-800 focus:outline-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button
//                 className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//                 onClick={handleCreateExam}
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </MainLayout>
//   );
// };

// export default ExamList;


