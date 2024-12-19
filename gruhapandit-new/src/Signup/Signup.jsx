import React, { useState } from "react";
import Signup from "../assets/Signup.png";
import Select from "react-select";
import { countries } from './Countries';
import {  useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        emailId: "",
        countryCode: "",
        mobileNumber: "",
        gender: "",
        dateOfBirth: "",
    });
    const [address, setAddress] = useState({
        city: "",
        district: "",
        state: "",
        country: "",
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});


    const [selectedCountry, setSelectedCountry] = useState("");
    const [personInfo, setPersonInfo] = useState({
        phone: "",
    });

    const validateStartDigits = (value, country) => {
        if (!country || !country.validStartDigits.length) {
            return true; 
        }
        return country.validStartDigits.some((digit) => value.startsWith(digit));
    };

    const countryOptions = countries.map((country) => ({
        value: country.code,
        label: `+${country.phone} ${country.label}`,
        country,
    }));

    const capitalizeFirstLetter = (inputValue) => {
        return inputValue
            .split(" ") 
            .map((word) => {
                if (word.length > 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
                return word;
            })
            .join(" "); 
    };

    const handleTextInputChange = (e) => {
        let inputValue = e.target.value;

        if (e.target.name === "emailId") {
            if (/^[A-Z]/.test(inputValue)) {
                inputValue = inputValue.slice(1); 
            }

            inputValue = inputValue.replace(/[^a-z0-9._%+-@]/g, ""); 
        } else {
            inputValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
            inputValue = capitalizeFirstLetter(inputValue);
        }

        if (inputValue.startsWith(" ")) {
            inputValue = inputValue.trimStart();
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

        Object.keys(formData).forEach((field) => {
            if (!formData[field]?.trim())
                newErrors[field] = "This field is required.";
        });

        const emailIdRegex =
            /^[a-z][a-z0-9._%+-]*@[a-z.-]+\.(com|net|org|in|edu|gov|mil|co|us|info)$/;
        if (!emailIdRegex.test(formData.emailId)) {
            newErrors.emailId =
                "Invalid emailId format. Must start with a lowercase letter.";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select a gender.";
        }

        if (!/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Must be a valid 10-digit number.";
        }
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else {
            const today = new Date().toISOString().split("T"[0]);
            if (formData.dateOfBirth > today) {
                newErrors.dateOfBirth = "Date of Birth cannot be in the future.";
            }
        }
        if (!address.city) {
            newErrors.city = "city is required";
        }
        if (!address.district) {
            newErrors.district = "district is required";
        }
        if (!address.state) {
            newErrors.state = "state is required";
        }
        if (!address.country) {
            newErrors.country = "country is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let userType = localStorage.getItem("type");

        try {
            userType = JSON.parse(userType);
        } catch (error) {
            console.warn("Type is stored as a plain string:", userType);
        }

        // Check if 'type' exists
        const typeValue = userType?.type || userType; 
        if (!typeValue) {
            alert("User type is missing. Please ensure it is set in localStorage.");
            return;
        }

        if (validateForm()) {
            const formDetails = {
                type: typeValue,
                fullName: formData.fullName,
                emailId: formData.emailId,
                countryCode: formData.countryCode,
                mobileNumber: formData.mobileNumber,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                address: address,
            };

            console.log("Form submitted successfully:", formDetails);
            localStorage.setItem("formDetails", JSON.stringify(formDetails));
            alert("Form submitted successfully");
            navigate("/CreatePassword");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white relative">
            <div className="absolute bottom-0 left-0 w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1920"
                    height="536"
                    viewBox="0 0 1920 536"
                    fill="none"
                    className="w-full h-auto"
                >
                    <path
                        d="M-857 185.27L-733.417 231.924C-609.833 279.454 -362.667 371.447 -115.5 348.887C131.667 325.451 378.833 185.27 626 161.834C873.167 139.274 1120.33 231.267 1367.5 220.316C1614.67 209.364 1861.83 91.0868 1985.42 33.4815L2109 -25V535.721H1985.42C1861.83 535.721 1614.67 535.721 1367.5 535.721C1120.33 535.721 873.167 535.721 626 535.721C378.833 535.721 131.667 535.721 -115.5 535.721C-362.667 535.721 -609.833 535.721 -733.417 535.721H-857V185.27Z"
                        fill="url(#paint0_radial_377_608)"
                    />
                    <defs>
                        <radialGradient
                            id="paint0_radial_377_608"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(257 -506.059) rotate(90) scale(1002.96 5305.27)"
                        >
                            <stop offset="0.266" stopColor="#26A3C9" />
                            <stop offset="1" stopColor="#FAF6FF" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            <div className="bg-white shadow-md rounded-lg p-8 max-w-6xl flex flex-col md:flex-row items-center relative mt-16 w-full ">
                <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img
                        src={Signup}
                        alt="Illustration"
                        className="w-3/4 h-auto transform hover:scale-105 transition duration-300 ease-in-out"
                    />
                </div>
                <div className="w-full md:w-3/5 bg-[#F4EBFF] rounded-lg p-6 shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-center mb-2 hover:text-purple-500 transition duration-300 text-[#000000]">
                        Sign Up
                    </h2>
                    <div className="w-12 h-0.5 bg-[#F44D99] mx-auto mb-4" />
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    minLength={2}
                                    maxLength={30}
                                    name="fullName"
                                    placeholder="Full Name"
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.fullName ? "border-red-500" : ""
                                        }`}
                                    value={formData.fullName}
                                    // onChange={handleInputChange}
                                    onChange={handleTextInputChange}
                                />
                                {errors.fullName && (
                                    <span className="text-red-500 text-sm">
                                        {errors.fullName}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    maxLength={45}
                                    name="emailId"
                                    placeholder="Email Id"
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.emailId ? "border-red-500" : ""
                                        }`}
                                    value={formData.emailId}
                                    // onChange={handleInputChange}
                                    onChange={handleTextInputChange}
                                />
                                {errors.emailId && (
                                    <span className="text-red-500 text-sm">{errors.emailId}</span>
                                )}
                            </div>

                            <div className=" flex flex-col focus:ring-2 focus:ring-purple-400">
                                <div className="flex">
                                    <Select
                                        name="countryCode"
                                        id="countryCode"
                                        options={countryOptions}
                                        onChange={(selectedOption) => {
                                            setSelectedCountry(selectedOption.country);
                                            setPersonInfo({
                                                ...personInfo,
                                                countryCode: `+${selectedOption.country.phone}`,
                                            });
                                            setFormData({
                                                ...formData,
                                                countryCode: `+${selectedOption.country.phone}`,
                                            });
                                        }}
                                        value={
                                            selectedCountry
                                                ? {
                                                    value: selectedCountry.code,
                                                    label: `+${selectedCountry.phone} ${selectedCountry.label}`,
                                                }
                                                : null
                                        }
                                        isSearchable
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                minWidth: "150px",
                                            }),
                                            control: (provided) => ({
                                                ...provided,
                                                minWidth: "60px",
                                                height: "40px",
                                                backgroundColor: "transparent",
                                            }),
                                            dropdownIndicator: (provided) => ({
                                                ...provided,
                                                display: "none",
                                            }),
                                            indicatorSeparator: () => null,
                                        }}
                                        className="bg-white rounded-l-md outline-none mr-0"
                                    />
                                    <input
                                        maxLength={10}
                                        type="tel"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        value={personInfo.phone || ""}
                                        disabled={!selectedCountry}
                                        onChange={(e) => {
                                            const inputValue = e.target.value.replace(/[^0-9]/g, "");
                                            setPersonInfo({ ...personInfo, phone: inputValue });
                                            setFormData({ ...formData, mobileNumber: inputValue });
                                        }}
                                        onInput={(e) => {
                                            const inputValue = e.target.value.replace(/[^0-9]/g, "");
                                            if (
                                                selectedCountry &&
                                                !validateStartDigits(inputValue, selectedCountry)
                                            ) {
                                                e.target.value = "";
                                            }
                                            setPersonInfo({ ...personInfo, phone: inputValue });
                                            setFormData({ ...formData, mobileNumber: inputValue });
                                        }}
                                        className={`  w-full px-3 py-3 bg-white rounded-r-md  focus:ring-2 focus:ring-purple-400 outline-none ${selectedCountry && personInfo.phone
                                                ? !validateStartDigits(
                                                    personInfo.phone,
                                                    selectedCountry
                                                )
                                                    ? "border-red-500"
                                                    : ""
                                                : ""
                                            }`}
                                        style={{
                                            height: "42px",
                                        }}
                                    />
                                </div>
                                {errors.mobileNumber && (
                                    <span className="text-red-500 text-sm">
                                        {errors.mobileNumber}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <select
                                    name="gender"
                                    value={formData.gender} 
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({
                                            ...formData,
                                            gender: value,
                                        });

                                        if (errors.gender) {
                                            setErrors({ ...errors, gender: "" });
                                        }
                                    }}
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.gender ? "border-red-500" : ""
                                        }`}
                                >
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && (
                                    <span className="text-red-500 text-sm">{errors.gender}</span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.dateOfBirth ? "border-red-500" : ""
                                        }`}
                                    value={formData.dateOfBirth}
                                    // onChange={handleInputChange}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            dateOfBirth: e.target.value,
                                        });
                                        if (errors.dateOfBirth) {
                                            setErrors({ ...errors, dateOfBirth: "" });
                                        }
                                    }}
                                />
                                {errors.dateOfBirth && (
                                    <span className="text-red-500 text-sm">
                                        {errors.dateOfBirth}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.city ? "border-red-500" : ""
                                        }`}
                                    value={address.city}
                                    // onChange={handleInputChange}
                                    onChange={(e) => {
                                        const newCity = e.target.value.replace(/[^a-zA-Z\s]/g, "").trimStart();;
                                        setAddress({ ...address, city: newCity });
                                        setFormData({ ...formData, city: newCity });

                                        if (newCity === "") {
                                            setErrors({ ...errors, city: "City is required." });
                                        } else {
                                            setErrors({ ...errors, city: "" });
                                        }
                                    }}
                                />
                                {errors.city && (
                                    <span className="text-red-500 text-sm">{errors.city}</span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.state ? "border-red-500" : ""
                                        }`}
                                    value={address.state}
                                    onChange={(e) => {
                                        const newState = e.target.value.replace(/[^a-zA-Z\s]/g, "").trimStart();
                                        setAddress({ ...address, state: newState });
                                        setFormData({ ...formData, state: newState });

                                        if (newState === "") {
                                            setErrors({ ...errors, state: "State is required." });
                                        } else {
                                            setErrors({ ...errors, state: "" });
                                        }
                                    }}
                                />
                                {errors.state && (
                                    <span className="text-red-500 text-sm">{errors.state}</span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="district"
                                    placeholder="District"
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.district ? "border-red-500" : ""
                                        }`}
                                    value={address.district}
                                    onChange={(e) => {
                                        const newDistrict = e.target.value.replace(/[^a-zA-Z\s]/g, "").trimStart();
                                        setAddress({ ...address, district: newDistrict });
                                        setFormData({ ...formData, district: newDistrict });

                                        if (newDistrict === "") {
                                            setErrors({ ...errors, district: "District is required." });
                                        } else {
                                            setErrors({ ...errors, district: "" });
                                        }
                                    }}
                                />
                                {errors.district && (
                                    <span className="text-red-500 text-sm">
                                        {errors.district}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    className={`border rounded-lg p-2 h-11 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.country ? "border-red-500" : ""
                                        }`}
                                    value={address.country}
                                    onChange={(e) => {
                                        const newCountry = e.target.value.replace(/[^a-zA-Z\s]/g, "").trimStart();
                                        setAddress({ ...address, country: newCountry });
                                        setFormData({ ...formData, country: newCountry });

                                        if (newCountry === "") {
                                            setErrors({ ...errors, country: "Country is required." });
                                        } else {
                                            setErrors({ ...errors, country: "" });
                                        }
                                    }}
                                />
                                {errors.country && (
                                    <span className="text-red-500 text-sm">{errors.country}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-52 text-black py-2 rounded-lg shadow-lg bg-white hover:bg-purple-500 hover:text-white transition duration-300"
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-black mt-4 font-semibold">
                        Already have an account?{" "}
                        <a
                           onClick={() => navigate("/LoginPage")}
                            className="text-[#2AB0FF] hover:text-purple-500 transition duration-300"
                        >
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
