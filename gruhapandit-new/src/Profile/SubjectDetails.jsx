import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FaEdit, FaTrash } from 'react-icons/fa';

const SubjectDetails = ({
  subjects,
  setSubjects,
  isModalOpen,
  setIsModalOpen,
  category,
  setCategory,
  subject,
  setSubject,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [errors,setErrors]=useState({category:"", subject:""})

  const validateFields = () => {
    const newErrors = {};
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!subject.trim()) newErrors.subject = "Subject is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleAddSubject = async () => {
    if(!validateFields()) return;

    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
    const type = localStorage.getItem("role");

    if (!token || !userId || !type) {
      console.log("Token, userId, or role are missing");
      return;
    }

    if (category && subject) {
      const SubjectDetails = {
        category,
        subject,
        type,
        userId,
        isActive:true,
      };

      setSubjects([...subjects, { category, subject, isActive: false }]);
      setCategory("");
      setSubject("");
      setIsModalOpen(false);

      try {
        const response = await axiosInstance.post(`/subject/`, SubjectDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Subject added successfully", response.data);
      } catch (error) {
        console.error("Error adding subject", error);
      }
    } else {
      alert("Please fill out both fields.");
    }
  };

  const handleEditSubject = async () => {
    if(!validateFields()) return;

    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
  
    if (!token || !userId) {
      console.log("Token, userId, or role are missing");
      return;
    }
  
    if (category && subject && editIndex !== null) {
      const updatedSubjects = [...subjects];
      const subjectToUpdate = updatedSubjects[editIndex];
      subjectToUpdate.category = category;
      subjectToUpdate.subject = subject;
  
      setSubjects(updatedSubjects);
      setCategory("");
      setSubject("");
      setIsModalOpen(false);
      setEditIndex(null);
  
      try {
        const response = await axiosInstance.patch(
          `/subject/`,
          {
            id: subjectToUpdate.id, // Include the ID in the payload
            category: subjectToUpdate.category,
            subject: subjectToUpdate.subject,
            userId: userId,
            requirementCompleted: subjectToUpdate.isActive, // Assuming 'isActive' maps to 'requirementCompleted'
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("Subject edited successfully", response.data);
      } catch (error) {
        console.error("Error editing subject", error);
      }
    } else {
      alert("Please fill out both fields.");
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("UserId");
      const token = localStorage.getItem("Token");

      if (!userId || !token) {
        console.log("Missing userId or token");
        return;
      }

      try {
        const response = await axiosInstance.get(`/subject/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Full Response:", response);
        console.log("Response Data:", response.data);

        if (response.data && Array.isArray(response.data)) {
          const subjectsArray = response.data.map((subjectData) => ({
            id: subjectData.id,
            userId: subjectData.userId,
            category: subjectData.category,
            subject: subjectData.subject,
            isActive: subjectData.requirementCompleted,
          }));

          console.log("Processed Subjects:", subjectsArray);

          setSubjects(subjectsArray);
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSubjectStatus = async (index) => {
    const updatedSubjects = [...subjects];
    const toggledSubject = updatedSubjects[index];
    const isCompleted = !toggledSubject.isActive;
  
    toggledSubject.isActive = isCompleted;
    setSubjects(updatedSubjects);
  
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
  
    if (!token || !userId) {
      console.log("Missing token or userId for API request");
      return;
    }
  
    try {
      // Construct the URL correctly by including the subject ID
      const subjectId = toggledSubject.id; // Assuming 'id' is the identifier for the subject
      const response = await axiosInstance.patch(
        `/subject/${subjectId}/toggle-requirement?isCompleted=${isCompleted}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Requirement toggled successfully", response.data);
    } catch (error) {
      console.error("Error toggling requirement", error);
    }
  };
  

  const handleEditClick = (index) => {
    setEditIndex(index);
    setCategory(subjects[index].category);
    setSubject(subjects[index].subject);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (index) => {
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
  
    if (!token || !userId) {
      console.log("Token or userId is missing");
      return;
    }
  
    const subjectToDelete = subjects[index];
  
    try {
      // Construct the API URL with query parameters
      const response = await axiosInstance.delete(
        `/subject/?id=${subjectToDelete.id}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Subject deleted successfully", response.data);
  
      // Remove the subject from the state
      const updatedSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(updatedSubjects);
    } catch (error) {
      console.error("Error deleting subject", error);
    }
  };
  

  return (
    <div className="p-4">
  <h3 className="text-cyan-600 font-bold mb-4">Subjects</h3>
  {subjects.length > 0 ? (
    <ul className="list-none pl-0">
      {subjects.map((subj, index) => (
        <li
          key={index}
          className="flex flex-col sm:flex-row items-start text-xs lg:text-lg sm:items-center justify-between border-b py-2 gap-4"
        >
          <div className="flex items-start sm:items-center gap-2 flex-1">
            <span className="font-medium text-gray-700">{subj.category}</span>
            <span className="text-gray-600">{subj.subject}</span>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={subj.isActive}
                  onChange={() => toggleSubjectStatus(index)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                    subj.isActive ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transition transform duration-300 ${
                      subj.isActive ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </label>
            <span
              className={`text-xs ${
                subj.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {subj.isActive ? "Active" : "Inactive"}
            </span>
            <FaEdit
              className="text-yellow-500 cursor-pointer"
              onClick={() => handleEditClick(index)}
            />
            <FaTrash
              className="text-yellow-500 cursor-pointer"
              onClick={() => handleDeleteClick(index)}
            />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No subjects added yet.</p>
  )}

  <button
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full sm:w-auto"
    onClick={() => {
      setCategory("");
      setSubject("");
      setEditIndex(null);
      setIsModalOpen(true);
    }}
  >
    Add Subject
  </button>

  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/3">
        <h4 className="text-lg font-bold mb-4">
          {editIndex !== null ? "Update Subject" : "Add Subject"}
        </h4>
        <div>
          <label className="block text-sm font-medium text-[#000000]">
            Category
          </label>
          <select
            value={category}
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            className={`mt-2 p-2 border rounded w-full ${
              errors.category && "border-red-500"
            }`}
          >
            <option value="">Select Category</option>
            <option value="SCHOOL_EDUCATION">School Education</option>
            <option value="UG_PG_EDUCATION">UG/PG Education</option>
            <option value="TECHNICAL_SKILLS">Technical Skills</option>
            <option value="GLOBAL_LANGUAGES">Global Languages</option>
            <option value="COMPETITIVE_EXAMS">Competitive Exams</option>
            <option value="ENTRANCE_EXAMS">Entrance Exams</option>
            <option value="SOFT_SKILLS">Soft Skills</option>
            <option value="HOBBIES">Hobbies</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#000000]">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className={`mt-2 p-2 border rounded w-full ${
              errors.subject && "border-red-500"
            }`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full sm:w-auto"
            onClick={() => {
              setIsModalOpen(false);
              setErrors({});
            }}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              if (editIndex !== null) {
                handleEditSubject();
              } else {
                handleAddSubject();
              }
            }}
          >
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default SubjectDetails;
