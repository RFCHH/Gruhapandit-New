import React, { useState, useEffect } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

const Details = () => {
  const role = localStorage.getItem("role");
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    qualification: "",
    timings: "",
    experience: "",
    chargesPerHour: "",
    modeOfTeaching: "",
    studyingClass: "",
    modeOfLearning: "",
    isUpdate: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isEditable, setIsEditable] = useState(true); 
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      try {
        const url =
          role === "STUDENT"
            ? `/studentdetails/${userId}`
            : `/tutorDetails/${userId}`;

        const response = await axiosInstance.get(url);
        const fetchedData = response.data;

        setFormData({
          qualification: fetchedData.highestQualification || "",
          timings: fetchedData.timings || "",
          experience: fetchedData.experience || "",
          chargesPerHour: fetchedData.chargesPerHour || "",
          modeOfTeaching: fetchedData.modeOfTeaching || "",
          studyingClass: fetchedData.studyingClass || "",
          modeOfLearning: fetchedData.modeOfLearning || "",
          isUpdate: true,
        });
        setIsEditable(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
   if (isLoading) {
          return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} height={40} className="rounded" />
              ))}
            </div>
          );
        }
        
  const validateFields = () => {
    const errors = {};
    if (role === "TUTOR") {
      if (!formData.qualification) errors.qualification = "Qualification is required.";
      if (!formData.timings) errors.timings = "Timings are required.";
      if (!formData.experience) errors.experience = "Experience is required.";
      if (!formData.chargesPerHour || isNaN(formData.chargesPerHour)) {
        errors.chargesPerHour = "Charges Per Hour must be a valid number.";
      }
      if (!formData.modeOfTeaching) errors.modeOfTeaching = "Mode of Teaching is required.";
    }

    if (role === "STUDENT") {
      if (!formData.studyingClass) errors.studyingClass = "Studying Class is required.";
      if (!formData.timings) errors.timings = "Timings are required.";
      if (!formData.modeOfLearning) errors.modeOfLearning = "Mode of Learning is required.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validation for experience field to allow only numbers
    if (name === "experience") {
      if (!/^\d*$/.test(value)) {
        setValidationErrors((prev) => ({
          ...prev,
          [name]: "Experience must contain only numbers.",
        }));
        return; // Exit the function without updating state
      }
    }
  
    // Update formData state and clear validation errors for the field
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      const payload = {
        highestQualification: formData.qualification || "",
        timings: formData.timings || "",
        experience: formData.experience || "",
        chargesPerHour: formData.chargesPerHour || "",
        modeOfTeaching: formData.modeOfTeaching || "",
        studyingClass: formData.studyingClass || "",
        modeOfLearning: formData.modeOfLearning || "",
        ...(role === "TUTOR" ? { tutorId: userId } : { studentId: userId }),
      };

      try {
        let response;
        if (formData.isUpdate) {
          if (role === "STUDENT") {
            response = await axiosInstance.patch(`/studentdetails/`, payload);
          } else if (role === "TUTOR") {
            response = await axiosInstance.patch(`/tutorDetails/`, payload);
          }

       
          if (response.status === 200) {
            setSuccessMessage(`${role.toLowerCase()} data Updated Successfully!`);
            setTimeout(() => setSuccessMessage(""), 2000);
          }
        } else {
                   
          if (role === "STUDENT") {
            response = await axiosInstance.post(`/studentdetails/create`, payload);
          } else if (role === "TUTOR") {
            response = await axiosInstance.post(`/tutorDetails/`, payload);
          }
          
          setFormData((prev) => ({
            ...prev,
            isUpdate: true,
          }));
  
         
          setSuccessMessage(`${role.toLowerCase()} data submitted successfully!`);
          setTimeout(() => setSuccessMessage(""), 2000);
        }
  
        // console.log(`${role} data updated/submitted:`, response.data);
        setIsEditable(false);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  return (
    <div className="relative">
      <h3 className="text-cyan-600 font-bold mb-4">
        {role === "TUTOR" ? "Tutor Details" : "Student Details"}
      </h3>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                  <div className="bg-white text-green-700 px-6 py-4 rounded-lg shadow-lg text-lg font-semibold text-center">
                    {successMessage}
                  </div>
                </motion.div>
              )}
        {role === "TUTOR" && (
          <>
            <FormInput
              label="Highest Qualification"
              placeholder="Enter the qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              disabled={!isEditable}
              error={validationErrors.qualification}
            />
            <FormInput
              label="Timings"
              placeholder="Enter the timings"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
              disabled={!isEditable}
              error={validationErrors.timings}
            />
            <FormInput
              label="Experience"
              placeholder="Enter the experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              disabled={!isEditable}
              error={validationErrors.experience}
            />
            <FormInput
              label="Charges Per Hour"
              placeholder="Enter the charges per hour"
              name="chargesPerHour"
              value={formData.chargesPerHour}
              onChange={handleChange}
              disabled={!isEditable}
              error={validationErrors.chargesPerHour}
            />
            <div>
              <label className="block text-sm font-medium text-[#000000]">
                Mode of Teaching
              </label>
              <select
                name="modeOfTeaching"
                value={formData.modeOfTeaching}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Mode</option>
                <option value="Tutor Home">Tutor Home</option>
                <option value="Student Home">Student Home</option>
                <option value="Online">Online</option>
              </select>
              {validationErrors.modeOfTeaching && (
                <p className="text-red-600 text-sm">{validationErrors.modeOfTeaching}</p>
              )}
            </div>
          </>
        )}

        {role === "STUDENT" && (
          <>
            <FormInput
              label="Studying Class"
              placeholder="Enter your class"
              name="studyingClass"
              value={formData.studyingClass}
              onChange={handleChange}
              disabled={!isEditable}
              error={validationErrors.studyingClass}
            />
            <FormInput
              label="Timings"
              placeholder="Enter your timings"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
              disabled={!isEditable}
              error={validationErrors.timings}
            />
            <div>
              <label className="block text-sm font-medium text-[#000000]">
                Mode of Learning
              </label>
              <select
                name="modeOfLearning"
                value={formData.modeOfLearning}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
              {validationErrors.modeOfLearning && (
                <p className="text-red-600 text-sm">{validationErrors.modeOfLearning}</p>
              )}
            </div>
          </>
        )}
        {isEditable ? (
          <div className="col-span-1 sm:col-span-2 text-right mt-4">
            <button
              type="submit"
              className="bg-cyan-500 text-white py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        ) : (
          <button
          type="button"
          className="absolute -top-1  right-0 bg-cyan-500 text-white py-2 px-4 rounded"
          onClick={() => setIsEditable(true)}
        >
          <FaEdit />
        </button>
        )}
      </form>
    </div>
  );
};

export default Details;