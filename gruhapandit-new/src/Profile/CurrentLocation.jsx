import React, { useState } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";

const PermanentLocation = () => {
  const [formData, setFormData] = useState({
    houseNum: "",
    landMark: "",
    city: "",
    district: "",
    country: "",
    locality: "",
    pincode: "",
    state: "",
    type:"",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("UserId");
    const token = localStorage.getItem("Token");
  
    if (!userId || !token) {
      setError("UserId or Token not found. Please log in again.");
      return;
    }
  
    const payload = { ...formData, userId, type: "CURRENT" };
  
    try {
      const response = await axiosInstance.post(
        `/address/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}` // Add the token to headers
          }
        }
      );
      setSuccess("Permanent location saved successfully!");
      setError(null);
    } catch (error) {
      console.error('Error response:', error.response); // Log the error for better insight
      if (error.response && error.response.status === 403) {
        setError("You are not authorized to perform this action.");
      } else {
        setError(
          error.response
            ? error.response.data.detail || "An error occurred."
            : error.message
        );
      }
      setSuccess(null);
    }
  };

  return (
    <>
      <h3 className="text-cyan-600 font-bold mb-4">Current Location</h3>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {success && <p className="text-green-500 font-semibold">{success}</p>}
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
        <FormInput
          label="House Number"
          name="houseNum"
          placeholder="Enter the House Number"
          value={formData.houseNum}
          onChange={handleChange}
        />
        <FormInput
          label="Locality"
          name="locality"
          placeholder="Enter the Locality"
          value={formData.locality}
          onChange={handleChange}
        />
        <FormInput
          label="Landmark"
          name="landMark"
          placeholder="Enter the Landmark"
          value={formData.landMark}
          onChange={handleChange}
        />
        <FormInput
          label="District"
          name="district"
          placeholder="Enter the District"
          value={formData.district}
          onChange={handleChange}
        />
        <FormInput
          label="City"
          name="city"
          placeholder="Enter the City"
          value={formData.city}
          onChange={handleChange}
        />
        <FormInput
          label="State"
          name="state"
          placeholder="Enter the State"
          value={formData.state}
          onChange={handleChange}
        />
        <FormInput
          label="Pin Code"
          name="pincode"
          placeholder="Enter the Pin Code"
          value={formData.pincode}
          onChange={handleChange}
        />
        <FormInput
          label="Country"
          name="country"
          placeholder="Enter the Country"
          value={formData.country}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="col-span-3 bg-cyan-600 text-white font-bold py-2 px-4 rounded"
        >
          Save Permanent Location
        </button>
      </form>
    </>
  );
};

export default PermanentLocation;
 