import React, { useState } from "react";
import { FormInput } from "./TutorProfile";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    switch (name) {
      case "mobile":
      case "pinCode":
        sanitizedValue = value.replace(/[^0-9]/g, ""); 
        if (name === "pinCode" && sanitizedValue.length > 6) {
          sanitizedValue = sanitizedValue.slice(0, 6); 
        }
        break;
      case "fullName":
      case "city":
      case "state":
        sanitizedValue = value.replace(/^\s+/, ""); 
        sanitizedValue = sanitizedValue.replace(/[^A-Za-z\s]/g, ""); 
        break;
      default:
        sanitizedValue = value.trimStart(); 
    }

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };
  const handleTextInputChange = (e) => {
    let inputValue = e.target.value;
  
    if (e.target.name === "email") {
      inputValue = inputValue.replace(/\s+/g, ""); 
      
      inputValue = inputValue.toLowerCase();
  
      inputValue = inputValue.replace(/[^a-z0-9._%+-@]/g, "");
  
      if (/^[^a-z]/.test(inputValue)) {
        inputValue = ""; 
      }
    }
  
    setFormData({
      ...formData,
      [e.target.name]: inputValue,
    });
  
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required.";
      isValid = false;
    } else if (/^\s/.test(formData.fullName)) {
      newErrors.fullName = "Full Name cannot start with a space.";
      isValid = false;
    }

if (!formData.email) {
  newErrors.email = "Email ID is required.";
  isValid = false;
} else {
  const emailWithoutSpaces = formData.email.replace(/\s+/g, "");

  if (!/^\S+@\S+\.+$/.test(emailWithoutSpaces)) {
    newErrors.email = "Invalid Email ID.";
    isValid = false;
  } else {
    formData.email = emailWithoutSpaces;
  }
}


    if (!formData.mobile) {
      newErrors.mobile = "Mobile Number is required.";
      isValid = false;
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile Number must be exactly 10 digits.";
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

  if (!formData.dob) {
    newErrors.dob = "Date of Birth is required.";
    isValid = false;
  } else {
    const dob = new Date(formData.dob);
    const currentDate = new Date();
    
    if (dob >= currentDate) {
      newErrors.dob = "Date of Birth cannot be today or in the future.";
      isValid = false;
    } else {
      const ageInMilliseconds = currentDate - dob;
      const ageInYears = ageInMilliseconds / (1000  * 3600  *24 * 365.25); 

      if (ageInYears < 2) {
        newErrors.dob = "You must be at least 2 years old.";
        isValid = false;
      } else if (ageInYears > 75) {
        newErrors.dob = "Age must be under 75 years.";
        isValid = false;
      }
    }
  }
    if (!formData.city) {
      newErrors.city = "City is required.";
      isValid = false;
    } else if (/^\s/.test(formData.city)) {
      newErrors.city = "City cannot start with a space.";
      isValid = false;
    }

    if (!formData.state) {
      newErrors.state = "State is required.";
      isValid = false;
    } else if (/^\s/.test(formData.state)) {
      newErrors.state = "State cannot start with a space.";
      isValid = false;
    }

    if (!formData.pinCode) {
      newErrors.pinCode = "PinCode is required.";
      isValid = false;
    } else if (formData.pinCode.length !== 6) {
      newErrors.pinCode = "PinCode must be exactly 6 digits.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };
  

  return (
    <div>
      <h3 className="text-cyan-600 font-bold mb-4">Personal Information</h3>
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <FormInput
            label="Full Name"
            minLength={2}
            maxLength={30}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter the name"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Email ID"
            maxLength={45}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleTextInputChange}
            placeholder="Enter the Email ID"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Mobile"
            name="mobile"
            maxLength={10}
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter the Number"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-[#000000]">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="City"
            name="city"
            minLength={3}
            maxLength={30}
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter the City"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="State"
            minLength={3}
            maxLength={30}
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter the State"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="PinCode"
            name="pinCode"
            maxLength={6}
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="Enter the PinCode"
          />
          {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode}</p>}
        </div>

        <div className="col-span-3 text-center mt-4">
          <button type="submit" className="bg-cyan-600 text-white p-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
