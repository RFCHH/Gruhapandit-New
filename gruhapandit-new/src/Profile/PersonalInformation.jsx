import React, { useEffect, useState } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";
import { FaEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    countryCode: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    district: "",
    country: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    emailId: "",
    countryCode: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    district: "",
    country: "",
    pinCode: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    switch (name) {
      case "mobileNumber":
      case "pinCode":
        sanitizedValue = value.replace(/[^0-9]/g, "");

        if (name === "pinCode" && sanitizedValue.length > 6) {
          sanitizedValue = sanitizedValue.slice(0, 6);
        }
        break;
      case "fullName":
      case "city":
      case "state":
      case "district":
      case "country":
        sanitizedValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      default:
        sanitizedValue = value.trimStart();
    }

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
    const type = localStorage.getItem("role");
  
    if (!token || !userId || !type) {
      console.error("Token, userId, or role is missing.");
      return;
    }
  
    const payload = {
      userId: userId,
      fullName: formData.fullName,
      emailId: formData.emailId,
      countryCode: formData.countryCode,
      mobileNumber: formData.mobileNumber,
      gender: formData.gender,
      type: type,
      dateOfBirth: formData.dateOfBirth,
    };
  
    if (validateForm()) {
      try {
        const response = await axiosInstance.patch(`/users/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        // Handle API response
        if (response.status === 200) {
          console.log("Form submitted successfully:", response.data);
          setIsEditing(false); // Updated this line
        } else {
          console.error("Error in response:", response);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.error("Form validation failed.");
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
    }

    if (!formData.emailId) {
      newErrors.emailId = "Email ID is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("UserId");
      try {
        const response = await axiosInstance.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setFormData({
          fullName: userData.fullName || "",
          emailId: userData.emailId || "",
          countryCode: userData.countryCode || "",
          mobileNumber: userData.mobileNumber || "",
          gender: userData.gender || "",
          dateOfBirth: userData.dateOfBirth || "",
          city: userData.city || "",
          state: userData.state || "",
          district: userData.district || "",
          country: userData.country || "",
          pinCode: userData.pinCode || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <button
        className="absolute -top-1 right-2 bg-cyan-600 text-white px-3 py-2 rounded"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? <ImCancelCircle/> : <FaEdit/>}
      </button>
      <h3 className="text-cyan-600 font-bold mb-4">Personal Information</h3>
      <form className="grid grid-cols-3 gap-1" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <FormInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the Name"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Email ID"
            name="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the Email ID"
          />
          {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the Number"
          />
        </div>

        <div className="flex flex-col mt-1">
          <label className=" font-bold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-col">
          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the City"
          />
        </div>

        <div className="flex flex-col">
          <FormInput
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the State"
          />
        </div>

        <div className="flex flex-col">
          <FormInput
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the District"
          />
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the Country"
          />
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Pin Code"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the Pin code"
          />
        </div>

        <div className="col-span-3 mt-4 text-end">
          {isEditing && (
            <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;