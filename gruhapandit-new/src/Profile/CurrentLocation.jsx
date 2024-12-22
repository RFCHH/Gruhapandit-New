import React, { useEffect, useState } from "react";
import { FormInput } from "./TutorProfile";
import axiosInstance from "../axiosInstance";

const CurrentLocation = () => {
  const [formData, setFormData] = useState({
    houseNum: "",
    locality: "",
    landMark: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    type: "CURRENT",
    userId: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    let Value = value;

    if (["houseNum", "locality", "landMark"].includes(name)) {
      Value = Value.replace(/^\s+/g, "");
    } else if (name === "pincode") {
      Value = Value.replace(/[^0-9]/g, "").slice(0, 6);
    } else if (["district", "city", "state", "country"].includes(name)) {
      Value = Value.replace(/^\s+/g, "");

      Value = Value.replace(/[^A-Za-z\s]/g, "");

      if (Value.length > 0 && Value[0] === " ") {
        Value = Value.trimStart();
      }
      Value = Value.replace(/\s{2,}/g, " ");
    } else {
      Value = Value.replace(/[^A-Za-z]/g, "");
    }

    setFormData({
      ...formData,
      [name]: Value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = "This field is required.";
        isValid = false;
      } else if (/^\s/.test(value)) {
        newErrors[key] = "This field cannot start with a space.";
        isValid = false;
      }
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pin code must be a valid 6-digit number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form data submitted:", formData);

      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("UserId");

      if (!token || !userId) {
        console.error("Missing token or userId.");
        return;
      }

      const payload = {
        ...formData,
        type: "CURRENT",
        userId,
      };

      try {
        let response;
        if (isDataPresent) {
          response = await axiosInstance.patch(`/address/`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          response = await axiosInstance.post(`/address/`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status === 201) {
            const newResponse = await axiosInstance.get(
              `/address/${userId}?type=CURRENT`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setFormData(newResponse.data);
            setIsDataPresent(true);
            setIsEditing(false);
          }
        }

        console.log("Response:", response);
      } catch (error) {
        console.error("Error submitting form:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrorMessage("");
  };

  const handleFieldFocus = () => {
    if (!isEditing) {
      setErrorMessage("Please click the Edit button to modify this field.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("UserId");
      const type = "CURRENT";

      if (!userId || !token) {
        console.error("Missing userId or token");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/address/${userId}?type=${type}`,
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
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-cyan-600 font-bold">Current Location</h3>

        {isDataPresent && (
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white py-1 px-3 rounded"
          >
            Edit
          </button>
        )}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
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
          <div className="col-span-3 flex justify-end">
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

export default CurrentLocation;
