import React, { useEffect, useState } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";

const PermanentLocation = () => {
  const [formData, setFormData] = useState({
    houseNum: "",
    locality: "",
    landMark: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    type: "PERMANENT",
    userId: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateFields = () => {
    const newErrors = {};
    if (!formData.houseNum.trim())
      newErrors.houseNum = "House Number is required.";
    if (!formData.locality.trim()) newErrors.locality = "Locality is required.";
    if (!formData.landMark.trim()) newErrors.landMark = "Landmark is required.";
    if (!formData.district.trim()) newErrors.district = "District is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.pincode || !/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be a valid 6-digit number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchData = async () => {
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");

    if (!userId || !token) {
      console.error("Missing userId or token");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/address/${userId}?type=PERMANENT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setFormData(response.data);
        setIsEditing(false);
        setIsDataPresent(true);
      } else {
        setIsDataPresent(false);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      setIsDataPresent(false);
    }
  };

  const createData = async (payload) => {
    const token = localStorage.getItem("Token");

    try {
      const response = await axiosInstance.post(`/address/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("POST response:", response);
      setIsEditing(false);
      setIsDataPresent(true);
    } catch (error) {
      console.error("Error creating data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const updateData = async (payload) => {
    const token = localStorage.getItem("Token");

    try {
      const response = await axiosInstance.patch(`/address/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("PATCH response:", response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      const userId = localStorage.getItem("UserId");

      if (!userId) {
        console.error("Missing userId.");
        return;
      }

      const payload = { ...formData, type: "PERMANENT", userId };

      if (isDataPresent) {
        console.log("Existing data found, triggering PATCH");
        await updateData(payload);
      } else {
        console.log("No existing data, triggering POST");
        await createData(payload);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trimStart() });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFieldFocus = () => {
    if (!isEditing) {
      setErrorMessage("Please click the Edit button to modify this field.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
  <h3 className="text-cyan-600 font-bold">Permanent Location</h3>

  {isDataPresent && !isEditing && (
    <button
      onClick={handleEdit}
      className="bg-cyan-500 text-white py-2 px-3 rounded"
    >
      Edit
    </button>
  )}
</div>

{errorMessage && (
  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
)}

<form
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
  onSubmit={handleSubmit}
>
  <FormInput
    label="House Number"
    name="houseNum"
    placeholder="Enter the House Number"
    value={formData.houseNum}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.houseNum}
  />
  <FormInput
    label="Locality"
    name="locality"
    placeholder="Enter the Locality"
    value={formData.locality}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.locality}
  />
  <FormInput
    label="Landmark"
    name="landMark"
    placeholder="Enter the Landmark"
    value={formData.landMark}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.landMark}
  />
  <FormInput
    label="District"
    name="district"
    placeholder="Enter the District"
    value={formData.district}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.district}
  />
  <FormInput
    label="City"
    name="city"
    placeholder="Enter the City"
    value={formData.city}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.city}
  />
  <FormInput
    label="State"
    name="state"
    placeholder="Enter the State"
    value={formData.state}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.state}
  />
  <FormInput
    label="Pin Code"
    name="pincode"
    placeholder="Enter the Pin Code"
    value={formData.pincode}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.pincode}
  />
  <FormInput
    label="Country"
    name="country"
    placeholder="Enter the Country"
    value={formData.country}
    onChange={handleChange}
    onFocus={handleFieldFocus}
    disabled={!isEditing}
    error={errors.country}
  />
  {isEditing && (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end">
      <button
        type="submit"
        className="bg-cyan-600 text-white py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  )}
</form>

    </>
  );
};

export default PermanentLocation;
