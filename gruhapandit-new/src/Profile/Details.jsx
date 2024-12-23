import React, { useState, useEffect } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";
import { useParams } from "react-router-dom";

const Details = () => {
  const role = localStorage.getItem("role");
  const {userId}=useParams();
  

  const [formData, setFormData] = useState({
    qualification: "",
    timings: "",
    experience: "",
    chargesPerHour: "",
    modeOfTeaching: "",
    studyingClass: "",
    modeOfLearning: "",
    isUpdate:false
  });


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

        const response = await axiosInstance.get(url,formData); 
        const fetchedData = response.data;

        setFormData({
          qualification: fetchedData.highestQualification || "",
          timings: fetchedData.timings || "",
          experience: fetchedData.experience || "",
          chargesPerHour: fetchedData.chargesPerHour || "",
          modeOfTeaching: fetchedData.modeOfTeaching || "",
          studyingClass: fetchedData.studyingClass || "",
          modeOfLearning: fetchedData.modeOfLearning || "",
          isUpdate:true
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
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
          console.log("Student data updated:", response.data);
        } else if (role === "TUTOR") {
          response = await axiosInstance.patch(`/tutorDetails/`, payload);
          console.log("Tutor data updated:", response.data);
        }
      } 
      else {
        if (role === "STUDENT") {
          response = await axiosInstance.post(`/studentdetails/create`, payload);
          console.log("Student data submitted:", response.data);
        } else if (role === "TUTOR") {
          response = await axiosInstance.post(`/tutorDetails/`, payload);
          console.log("Tutor data submitted:", response.data);
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  return (
    <div>
      <h3 className="text-cyan-600 font-bold mb-4">
        {role === "TUTOR" ? "Tutor Details" : "Student Details"}
      </h3>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {role === "TUTOR" && (
          <>
            <FormInput
              label="Highest Qualification"
              placeholder="Enter the qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
            <FormInput
              label="Timings"
              placeholder="Enter the timings"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
            />
            <FormInput
              label="Experience"
              placeholder="Enter the experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            <FormInput
              label="Charges Per Hour"
              placeholder="Enter the charges per hour"
              name="chargesPerHour"
              value={formData.chargesPerHour}
              onChange={handleChange}
            />
            <div>
              <label className="block text-sm font-medium text-[#000000]">
                Mode of Teaching
              </label>
              <select
                name="modeOfTeaching"
                value={formData.modeOfTeaching}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Mode</option>
                <option value="Tutor Home">Tutor Home</option>
                <option value="Student Home">Student Home</option>
                <option value="Online">Online</option>
              </select>
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
            />
            <FormInput
              label="Timings"
              placeholder="Enter your timings"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
            />
            <div>
              <label className="block text-sm font-medium text-[#000000]">
                Mode of Learning
              </label>
              <select
                name="modeOfLearning"
                value={formData.modeOfLearning}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="col-span-2 bg-cyan-600 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Details;

