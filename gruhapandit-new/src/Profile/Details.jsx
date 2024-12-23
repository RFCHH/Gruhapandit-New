import React, { useState, useEffect } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";
import { useParams } from "react-router-dom";

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
  const [isEditable, setIsEditable] = useState(false); 

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" }); 
  };

  const handleSave = async () => {
    if (!validateFields()) return; 

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
      const url =
        role === "STUDENT" ? `/studentdetails/` : `/tutorDetails/`;
      const response = await axiosInstance.patch(url, payload);
      console.log("Data updated:", response.data);

      setIsEditable(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="relative">
      <h3 className="text-cyan-600 font-bold mb-4">
        {role === "TUTOR" ? "Tutor Details" : "Student Details"}
      </h3>

      {!isEditable && (
        <button
          type="button"
          className="absolute top-0 right-0 bg-cyan-500 text-white py-2 px-4 rounded"
          onClick={() => setIsEditable(true)}
        >
          Edit
        </button>
      )}


      <form className="grid grid-cols-2 gap-4 relative">
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
        {isEditable && (
          <div className="absolute bottom-0 right-0 mb-4 mr-4">
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Details;

