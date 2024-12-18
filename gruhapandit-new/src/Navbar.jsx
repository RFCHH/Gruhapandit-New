import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const homeClick = () => {
    navigate("/")
  }

  const aboutClick = () => {
    navigate("/About");
  };

  const servicesClick = () => {
    navigate("/OurServices");
  }

  const reviewsClick = () => {
    navigate("/Reviews");
  }

  const contactClick = () => {
    navigate("/ContactUs");
  }

  const signupclick = () => {
    navigate("/userselection");
  }




  return (
    <div className="flex flex-row justify-end gap-4 mr-4 p-4 border-black bg-blue-400">
      <h1 onClick={homeClick} style={{ cursor: 'pointer' }}>Home</h1>
      <h1 onClick={aboutClick} style={{ cursor: 'pointer' }}>About Us</h1>
      <h1 onClick={servicesClick} style={{ cursor: 'pointer' }}>Our Services</h1>
      <h1 onClick={reviewsClick} style={{ cursor: 'pointer' }}>Reviews</h1>
      <h1 onClick={contactClick} style={{ cursor: 'pointer' }}>Contact Us</h1>
      <h1 onClick={signupclick} style={{ cursor: 'pointer' }}>SignUp</h1>
    </div>
  );
}

export default Navbar;
