import React from "react";
import { FormInput } from "./TutorProfile";

const PersonalInformation = () => {
  return (
    <div>
      <h3 className="text-cyan-600 font-bold mb-4">Personal Information</h3>
      <form className="grid grid-cols-3 gap-4">
        <FormInput label="Full Name" placeholder="Enter the name" />
        <FormInput label="Email ID" placeholder="Enter the Email ID" />
        <FormInput label="Mobile" placeholder="Enter the Number" />
        <div>
          <label className="block text-sm font-medium text-[#000000]">
            Gender
          </label>
          <select className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <FormInput label="Date of Birth" type="date" />
        <FormInput label="City" placeholder="Enter the City" />
        <FormInput label="State" placeholder="Enter the State" />
        <FormInput label="PinCode" placeholder="Enter the PinCode" />
      </form>
    </div>
  );
};

export default PersonalInformation;
