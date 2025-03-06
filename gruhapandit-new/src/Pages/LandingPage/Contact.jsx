import React, { useState } from "react";
import img from "../../assets/img.png"
import message from "../../assets/24.png";
import inbox from "../../assets/23.png";
import footer from "../../assets/Footer.png"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FooterMain from "./FooterMain";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b text-gray-800 shadow-xl mt-14 overflow-hidden">
      {/* Header Section */}
      <div className="pt-16 sm:pt-32 md:pt-44 w-full max-w-4xl mx-auto px-4 md:px-8 ml-1">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-violet-900 mb-2">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-normal mt-1 mb-6">
          Thank you for considering Gruhapandit Tuitions as your trusted partner in education. We are here to help you with all your tutoring needs, whether it’s for home tutoring, online tutoring, exam preparation, or mentorship. Our group is prepared to help you succeed academically.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full -mt-24 sm:-mt-32 overflow-hidden">
        <img
          src={img}
          alt="Contact Image"
          className="w-full h-auto object-cover max-h-[50vh] sm:max-h-[70vh]"
        />
      </div>

      {/* Contact Form Section */}
      <section className="flex justify-center items-center py-10 px-4 sm:px-8">
        <div className="bg-white rounded-2xl p-8 w-full max-w-4xl flex flex-col sm:flex-row border-y-2 border-blue-600">
          {/* Left Content */}
          <div className="w-full sm:w-1/2 pr-0 sm:pr-6 mb-6 sm:mb-0">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Let us discuss your marketing strategy!
            </h2>
            <p className="font-medium text-sm sm:text-base mb-6">
              <span>PhoneNo: 9618853331</span>
              <br />
              <a href="mailto:info@lunarstrategy.com" className="text-blue-600 hover:underline">
                gruhapandittuitions@gmail.com
              </a>
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-6">
              <a href="https://www.facebook.com/people/Gruhapandit-Tuitions/61566845707627/" className="text-blue-600 hover:underline">
                <FaFacebook size="24" />
              </a>
              <a href="https://x.com/gruhapandi47996" className="text-blue-600 hover:underline">
                <FaSquareXTwitter size="24" />
              </a>
              <a href="#" className="text-blue-600 hover:underline">
                <FaLinkedin size="24" />
              </a>
              <a href="https://www.instagram.com/gruhapandit_tuitions/" className="text-blue-600 hover:underline">
                <FaInstagram size="24" />
              </a>
            </div>
            <div className="border-blue-500 border-4 p-4 rounded-2xl w-full sm:w-56 text-center">
              <h1 className="-mt-2 text-blue-500 text-sm sm:text-base cursor-pointer">
                Book a free consultation
              </h1>
            </div>
          </div>

          {/* Right Content (Form) */}
          <div className="w-full sm:w-1/2">
            <h1 className="mb-4 text-lg sm:text-xl font-bold">
              Or you can also contact us here:
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-2xl bg-pink-100 text-sm sm:text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-2xl bg-pink-100 text-sm sm:text-base"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-2xl bg-pink-100 text-sm sm:text-base"
                />
              </div>
              <textarea
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-4 px-4 py-3 border h-32 rounded-2xl bg-pink-100 text-sm sm:text-base"
              ></textarea>
              <button className="bg-blue-500 text-white mt-4 px-6 py-2 rounded-md hover:bg-blue-600 w-full text-sm sm:text-base">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-9 flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 lg:px-32 space-y-8 md:space-y-0">
        
        <div className="text-center md:text-left md:w-1/2">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">LET'S KEEP IN TOUCH</h3>
          <p className="text-sm sm:text-base lg:text-lg mb-6">
            Subscribe to our newsletter to keep yourself updated.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-60 md:w-96">
              <input
                type="text"
                placeholder="Your Location Nearby"
                className="px-4 py-3 border rounded-full w-full pl-12 bg-purple-800 text-white text-sm sm:text-base"
              />
              <img
                src={message}
                alt="Location Icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>
            <button
              onClick={() => navigate("/LoginPage")}
              className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm sm:text-base w-full sm:w-48"
            >
              Subscribe now
            </button>
          </div>
        </div>

        
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img src={inbox} alt="Inbox Icon" className="w-48 sm:w-64 lg:w-96 object-contain" />
        </div>
      </section>


      <FooterMain />
    </div>


  );
};

export default Contact;