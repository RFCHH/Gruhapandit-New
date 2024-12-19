import React from "react";
import { FormInput } from "./TutorProfile";

const Details = () => {
  return (
    <div>
      <h3 className="text-cyan-600 font-bold mb-4">Tutor Details</h3>
      <form className="grid grid-cols-2 gap-4">
        <FormInput
          label="Highest Qualification"
          placeholder="Enter the qualification"
        />
        <FormInput label="Timings" placeholder="Enter the timings" />
        <FormInput label="Experience" placeholder="Enter the experience" />
        <FormInput
          label="Charges Per Hour"
          placeholder="Enter the charges per hour"
        />
        <div>
          <label className="block text-sm font-medium text-[#000000]">
            Mode of Teaching
          </label>
          <select className="w-full border p-2 rounded">
            <option value="">Select Mode</option>
            <option value="Tutor Home">Tutor Home</option>
            <option value="Student Home">Student Home</option>
            <option value="Online">Online</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Details;
