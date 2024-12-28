import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
const CreateExamDetailsPopUp = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    examId:'',
    examName: '',
    startDate: '',
    endDate: '',
    examDuration: 0,
    numberOfAttempts: 0,
    passPercentage:'',
    assignedTo: " ",
  });

  const [errors, setErrors] = useState({}); 
  const [reporteeStudents, setReporteeStudents] = useState([]);
  const userId=localStorage.getItem("UserId");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchDepartments = async () => {
        
      try {
        const response = await axiosInstance.get(`/exams/getAllExams/${userId}`);
       
      } 
      catch (error) {
        console.error("Error updating the job:", error);
        let errorMessage = "Failed to update the job. Please try again.";
        if (error.response?.data) {
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (formData.assignedTo.length === 0) newErrors.assignedTo = 'At userId must be selected.';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };
  

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


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!validateForm()) {
  //     return;
  //   }
  
  //   const examDetails = {
  //     userId: localStorage.getItem("UserId"),
  //     examName: formData.examName,
  //     examId:formData.examId,
  //     startDate: formData.startDate,
  //     endDate: formData.endDate,
  //     passPercentage: formData.passPercentage || 0,
  //     numberOfAttempts: formData.numberOfAttempts || 0,
  //     examDuration: formData.examDuration || 0,
  //     assignedTo: formData.assignedTo ? [formData.assignedTo] : [],
  //   };
  
  //   console.log("Exam Details:", examDetails);
  
  //   try {
  //     const token = localStorage.getItem("Token");
  
  //     const response = await axiosInstance.post(
  //       `/exams/createExams`,
  //       examDetails,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  
  //     console.log("API Response:", response.data);
  
  //     if (response.status === 200) {
  //       onSave(response.data); 
  //       onClose();
  //     }
  //   } catch (error) {
  //     console.error("Error saving exam details:", error);
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const userId = localStorage.getItem("UserId");
    const token = localStorage.getItem("Token");
  
    if (!userId || !token) {
      console.log("userId, token are missing");
      return;
    }
  
    console.log("Initial Data:", initialData); // Debug initialData
  
    const examDetails = {
      examId: initialData?.examId || formData.examId, // Ensure examId is set here, fallback to formData.examId
      userId: userId,
      examName: formData.examName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      passPercentage: formData.passPercentage || 0,
      numberOfAttempts: formData.numberOfAttempts || 0,
      examDuration: formData.examDuration || 0,
      assignedTo: formData.assignedTo ? [formData.assignedTo] : [],
    };
  
    console.log("Exam Details Before Patch:", examDetails);
    if (!examDetails.examId) {
      console.log("Error: examId is not available.");
      return; 
    }
  
    try {
      if (initialData && initialData.examId) {
        
        await axiosInstance.patch(
          `/exams/${examDetails.examId}`, 
          examDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onSave(formData);
      } else {
        const response = await axiosInstance.post(
          `/exams/createExams`,
          examDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onSave(response.data);
      }
    } catch (error) {
      console.error("Error updating the job:", error);
  
      let errorMessage = "Failed to update the job. Please try again.";
      if (error.response?.data) {
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
  
      toast.error(errorMessage);
    }
  };
  
  
 
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white rounded shadow-lg p-6 w-4/6">
    <h2 className="text-lg font-semibold mb-4">{initialData ? 'Edit Exam ' : 'Add Exam '}</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-x-10"> 
      
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
            type="text"
            name="examDuration"
            value={formData.examDuration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            
          />
          {errors.examDuration && <div className="text-red-500 text-sm mt-1">{errors.examDuration}</div>}
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">No.Of.Attempts</label>
          <input
            type="text"
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
            type="text"
            name="passPercentage"
            value={formData.passPercentage}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            
          />
          {errors.passPercentage && <div className="text-red-500 text-sm mt-1">{errors.passPercentage}</div>}
        </div>

        <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">AssignedTo</label>
      <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="">Select </option>
        {reporteeStudents.map((student) => (
          <option key={student} value={student}>
            {student}
          </option>
        ))}
      </select>
      {errors.assignedTo && <div className="text-red-500 text-sm mt-1">{errors.assignedTo}</div>}
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
