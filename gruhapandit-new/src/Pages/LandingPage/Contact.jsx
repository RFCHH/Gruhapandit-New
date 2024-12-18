import React, { useState } from "react";
import img from "../../assets/33.png"
import message from "../../assets/24.png"; 
import inbox from "../../assets/23.png"; 
import footer from "../../assets/Vector.png"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


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

  return (
    <div className="min-h-screen bg-gradient-to-b text-gray-800 shadow-xl bg-pink-50 mt-20">
      {/* Header */}
      <header className="py-8 sm:py-16 mt-8 sm:mt-16 px-4 sm:px-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-700 text-center sm:text-left">
          Contact Us
        </h1>
        <p className="text-sm sm:text-lg mt-2 font-bold text-center sm:text-left">
          We always care about your future
        </p>
      </header>

      {/* Image Section */}
      <div className="w-full -mt-24 sm:-mt-71">
        <img
          src={img}
          alt="Contact Image"
          className="w-full h-auto object-cover max-h-[50vh] sm:max-h-[70vh]"
        />
      </div>

      <section className="flex justify-center items-center py-10 px-5">
        <div className="bg-white rounded-2xl p-8 w-full sm:w-[80%] lg:w-[60%] xl:w-[50%] flex flex-col sm:flex-row bg-repeat-y border-y-2 border-blue-600">
          {/* Left Section */}
          <div className="w-full sm:w-1/2 pr-4 mb-6 sm:mb-0">
            <h2 className="text-lg sm:text-2xl font-bold mb-4">
              Let us discuss your marketing strategy!
            </h2>
            <p className="font-medium text-sm sm:text-base mb-6">
              <span>Org.nr:559264-1871</span>
              <br />
              <span>Lunar Holding LDA</span>
              <br />
              <span>info@lunarstrategy.com</span>
              <br />
              <span>+467-20478390</span>
              <br />
            </p>
            <div className="flex justify-center sm:justify-start items-center space-x-4 mb-6">
              <a
                href="https://www.facebook.com/people/Gruhapandit-Tuitions/61566845707627/"
                className="text-blue-600 hover:underline"
              >
                <FaFacebook size="24" />
              </a>
              <a
                href="https://x.com/gruhapandi47996"
                className="text-blue-600 hover:underline"
              >
                <FaSquareXTwitter size="24" />
              </a>
              <a href="#" className="text-blue-600 hover:underline">
                <FaLinkedin size="24" />
              </a>
              <a
                href="https://www.instagram.com/gruhapandit_tuitions/"
                className="text-blue-600 hover:underline"
              >
                <FaInstagram size="24" />
              </a>
            </div>
            <div className="border-blue-500 border-4 p-4 rounded-2xl w-full sm:w-56 h-12 text-center">
              <h1 className="-mt-2 text-blue-500 text-sm sm:text-base">
                Book a free consultation
              </h1>
            </div>
          </div>

          {/* Right Section - Form */}
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

      {/* Subscription Section */}
      <section className="py-9 flex flex-col md:flex-row justify-start items-center md:items-start mx-8 md:mx-32">
        <div className="text-center mt-24 ml-9 md:text-left md:w-1/2">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">LET'S KEEP IN TOUCH</h3>
          <p className="text-sm sm:text-xl mb-6">
            Subscribe to our newsletter to keep yourself updated
          </p>
          <div className="flex justify-center md:justify-start items-center space-x-4">
            <div className="relative w-60 sm:w-96 md:w-96">
              <input
                type="text"
                placeholder="Your Location Nearby"
                className="px-4 py-3 border rounded-full w-full pl-12 bg-purple-800 text-white text-sm sm:text-base sm:w-full"
              />
              <img
                src={message}
                alt="Location Icon"
                className="absolute rounded-full left-4 top-1/2 transform -translate-y-1/2 w-7 h-7"
              />
            </div>
            <button className="bg-yellow-400 h-14 text-black -px-1 py-1 p-5 rounded-full text-sm sm:text-base w-48">
              Subscribe now
            </button>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
          <img
            src={inbox}
            alt="Inbox Icon"
            className="w-64 sm:w-96 object-contain"
          />
        </div>
      </section> 

      <div className="w-full -mt-24 sm:-mt-71">
        <img
          src={footer}
          alt="footer"
          className="w-full h-auto object-cover max-h-[50vh] sm:max-h-[70vh]"
        />
      </div>
    </div>
  );
};

export default Contact;