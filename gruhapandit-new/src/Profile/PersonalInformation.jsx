import React, { useEffect, useState } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";

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
  });

  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    switch (name) {
      case "mobileNumber":
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
      updateBasicAddressRequest: {
        city: formData.city,
        district: formData.district,
        state: formData.state,
        country: formData.country,
      },
    };
  
    if (validateForm()) {
      try {
        const response = await axiosInstance.patch(`/users/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          alert(`${type.toLowerCase()} data updated successfully.`);
          console.log("Form submitted successfully:", response.data);
          setIsEditing(false); 
        } else {
          console.error("Error in response:", response);
        }
        setIsEditing(false); 
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
  
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
    }
  
    const emailWithoutSpaces = formData.emailId.replace(/\s+/g, "");
    if (!emailWithoutSpaces) {
      newErrors.emailId = "Email ID is required.";
      isValid = false;
    } else if (!/^[a-z0-9._%+-]+@[a-z.-]+\.(com|net|org|in|edu|gov|mil|co|us|info)$/.test(emailWithoutSpaces)) {
      newErrors.emailId = "Invalid Email ID.";
      isValid = false;
    }
  
    if(!formData.countryCode){
      newErrors.countryCode="Country Code is required"
      isValid=false;
    }
  
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required.";
      isValid = false;
    } else if (formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Mobile Number must be exactly 10 digits.";
      isValid = false;
    }
  
    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }
  
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required.";
      isValid = false;
    } else {
      const dob = new Date(formData.dateOfBirth);
      const currentDate = new Date();
      if (dob >= currentDate) {
        newErrors.dateOfBirth = "Date of Birth cannot be today or in the future.";
        isValid = false;
      }
    }
  
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
      isValid = false;
    }
  
    if (!formData.district.trim()) {
      newErrors.district = "District is required.";
      isValid = false;
    }
  
    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
      isValid = false;
    }
  
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
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
        const addressResponse = await axiosInstance.get(
          `/users/basicAddress?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const addressData = addressResponse.data;
  
        setFormData({
          fullName: userData.fullName || "",
          emailId: userData.emailId || "",
          countryCode: userData.countryCode || "",
          mobileNumber: userData.mobileNumber || "",
          gender: userData.gender || "",
          dateOfBirth: userData.dateOfBirth || "",
          city: addressData.city || userData.city || "",
          state: addressData.state || userData.state || "",
          district: addressData.district || userData.district || "",
          country: addressData.country || userData.country || "",
        });
        setIsEditing(false);

        
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="relative">
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
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
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
          {errors.emailId && (
            <p className="text-red-500 text-sm">{errors.emailId}</p>
          )}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Country Code"
            name="countryCode"
            type="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter the Number"
          />
          {errors.countryCode && (
            <p className="text-red-500 text-sm">{errors.countryCode}</p>
          )}
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
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
          )}
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
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
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
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
          )}
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
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
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
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
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
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district}</p>
          )}
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
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        <div className="col-span-3 mt-4 text-end">
          {isEditing ? (
          <div className="absolute bottom-0 right-0 mb-4 mr-4">
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
          className="absolute top-1  right-0 bg-cyan-500 text-white py-2 px-4 rounded"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
