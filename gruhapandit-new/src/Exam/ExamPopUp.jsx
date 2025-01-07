import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { IoIosCloseCircle } from "react-icons/io";


const CreateExamDetailsPopUp = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    examId: '',
    examName: '',
    startDate: '',
    endDate: '',
    examDuration: 0,
    numberOfAttempts: 0,
    passPercentage: '',
    assignedTo: [],
  });

  const [errors, setErrors] = useState({});
  const [reporteeStudents, setReporteeStudents] = useState([]);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState('');
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchReporteeStudents = async () => {
      try {
        const response = await axiosInstance.get(`/exams/getListOfReporteeStudents/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data && Array.isArray(response.data)) {
          setReporteeStudents(response.data);
        } else {
          console.error("Invalid API response format.");
        }
      } catch (error) {
        console.error("Error fetching reportee students:", error);
      }
    };

    fetchReporteeStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAssignedTo = () => {
    if (selectedAssignedTo && !formData.assignedTo.includes(selectedAssignedTo)) {
      setFormData({
        ...formData,
        assignedTo: [...formData.assignedTo, selectedAssignedTo],
      });
      setSelectedAssignedTo('');
    }
  };

  const handleRemoveAssignedTo = (assignedToRemove) => {
    setFormData({
      ...formData,
      assignedTo: formData.assignedTo.filter((id) => id !== assignedToRemove),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.examName) newErrors.examName = 'Exam Name is required.';
    if (!formData.startDate) newErrors.startDate = 'Start Date is required.';
    if (!formData.endDate) newErrors.endDate = 'End Date is required.';
    if (formData.examDuration <= 0) newErrors.examDuration = 'Duration must be a positive number.';
    if (formData.passPercentage <= 0) {
      newErrors.passPercentage = 'Percentage should not be less than or equal to 0.';
    } else if (!formData.passPercentage) {
      newErrors.passPercentage = 'Percentage is required.';
    }
    if (formData.numberOfAttempts === '-') {
      newErrors.numberOfAttempts = '- values not allowed.';
    } else if (formData.numberOfAttempts <= 0) {
      newErrors.numberOfAttempts = 'Max Attempts must be a positive number.';
    }
    if (formData.assignedTo.length === 0) newErrors.assignedTo = 'At least one user must be selected.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const examDetails = {
      userId: localStorage.getItem("UserId"),
      examName: formData.examName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      passPercentage: formData.passPercentage || 0,
      numberOfAttempts: formData.numberOfAttempts || 0,
      examDuration: formData.examDuration || 0,
      assignedTo: formData.assignedTo,
    };
  
    try {
      let response;
      if (formData.examId) {
        response = await axiosInstance.patch(`/exams/`, { ...examDetails, examId: formData.examId });
        localStorage.setItem("examId", formData.examId); // Store examId in localStorage
      } else {
        response = await axiosInstance.post(`/exams/createExams`, examDetails);
        const createdExamId = response.data?.examId; // Extract examId from the response
        if (createdExamId) {
          localStorage.setItem("examId", createdExamId); // Store examId in localStorage
        }else{
          console.log("exam Id not found in the response.");
        }
      }
      onSave(examDetails);

      const storedExamId=localStorage.getItem("examId");
      if(storedExamId){
        console.log("Stored Exam ID:", storedExamId); // Log the retrieved examId
    } else {
      console.warn("No Exam ID found in localStorage.");
    }

      onClose();
    } catch (error) {
      console.error("Error during POST or PATCH operations:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg p-6 w-4/6 ">
        <h2 className="text-lg font-semibold mb-4">{initialData ? 'Edit Exam' : 'Add Exam'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-3 gap-x-10 gap-y-4">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name</label>
              <input
                type="text"
                name="examName"
                value={formData.examName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.examName && <div className="text-red-500 text-sm mt-1">{errors.examName}</div>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate}</div>}
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate}</div>}
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (in minutes)</label>
              <input
                type="number"
                name="examDuration"
                value={formData.examDuration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.examDuration && <div className="text-red-500 text-sm mt-1">{errors.examDuration}</div>}
            </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Of Attempts</label>
              <input
                type="number"
                name="numberOfAttempts"
                value={formData.numberOfAttempts}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.numberOfAttempts && <div className="text-red-500 text-sm mt-1">{errors.numberOfAttempts}</div>}
            </div>
        
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pass Percentage</label>
              <input
                type="number"
                name="passPercentage"
                value={formData.passPercentage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.passPercentage && <div className="text-red-500 text-sm mt-1">{errors.passPercentage}</div>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedAssignedTo}
                  onChange={(e) => setSelectedAssignedTo(e.target.value)}
                  className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="" disabled>Select</option>
                  {reporteeStudents.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddAssignedTo}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
              {errors.assignedTo && <div className="text-red-500 text-sm mt-1">{errors.assignedTo}</div>}
            </div>
           
            <div className="mt-2">
              {formData.assignedTo.length > 0 && (
                <div className=" grid gap-1 grid-col-1 ">
                  {formData.assignedTo.map((assigned, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-1 rounded w-20">
                      <span>{assigned}</span>
                      <IoIosCloseCircle
                        type="button"
                        onClick={() => handleRemoveAssignedTo(assigned)}
                        className="text-red-500 hover:text-red-700"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamDetailsPopUp;