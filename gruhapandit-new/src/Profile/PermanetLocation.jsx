import React from 'react';
import { FormInput } from './TutorProfile';


  
const PermanetLocation = () => {
  return (
    <>
      <h3 className="text-cyan-600 font-bold mb-4">Permanent Location</h3>
      <form className="grid grid-cols-3 gap-4">
        <FormInput label="House Number" placeholder="Enter the House Number" />
        <FormInput label="Locality" placeholder="Enter the Locality" />
        <FormInput label="Landmark" placeholder="Enter the Landmark" />
        <FormInput label="District" placeholder="Enter the District" />
        <FormInput label="City" placeholder="Enter the City" />
        <FormInput label="State" placeholder="Enter the State" />
        <FormInput label="Pin Code" placeholder="Enter the Pin Code" />
        <FormInput label="Country" placeholder="Enter the Country" />
      </form>
    </>
  );
};

export default PermanetLocation;
