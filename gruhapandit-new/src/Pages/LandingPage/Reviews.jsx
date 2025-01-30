import React from "react";
import message from "../../assets/24.png";
import Mails from "../../assets/23.png";
import footer from "../../assets/Footer.png";
import { useNavigate } from "react-router-dom";
import FooterMain from "./FooterMain"

const HomeReviews = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="relative flex flex-col items-start min-h-screen px-4 sm:px-12 md:px-24">
        <div className="flex flex-col gap-2 sm:mt-32 md:mt-56 lg:mt-32">
          <h1
            className="text-[32px] sm:text-[40px] md:text-[64px] font-extrabold text-[#32046B] leading-tight text-center sm:text-left"
            style={{
              fontFamily: "Inter, sans-serif",
            }}
          >
            Reviews
          </h1>
          <p
            className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#000000] text-center sm:text-left"
            style={{
              fontFamily: "Inter, sans-serif",
            }}
          >
            Hire a Tutor Or Find a Student With Better Review
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full -mt-6 sm:-mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 721"
            fill="none"
            className="w-full h-auto"
          >
            <path
              d="M-193 320.298L-69.4167 380.271C54.1667 441.369 301.333 569.625 548.5 540.624C795.667 510.497 1042.83 320.298 1290 290.171C1537.17 261.17 1784.33 379.426 2031.5 365.348C2278.67 351.27 2525.83 209.227 2649.42 155.1767L2773 0V720.795H2649.42C2525.83 720.795 2278.67 720.795 2031.5 720.795C1784.33 720.795 1537.17 720.795 1290 720.795C1042.83 720.795 795.667 720.795 548.5 720.795C301.333 720.795 54.1667 720.795 -69.4167 720.795H-193V320.298Z"
              fill="url(#paint0_radial_33_3955)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_33_3955"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(921 -618.391) rotate(90) scale(1289.28 5305.27)"
              >
                <stop offset="0.266" stopColor="#26A3C9" />
                <stop offset="1" stopColor="#FAF6FF" />
              </radialGradient>
            </defs>
          </svg>
        </div>

      </div>

      <div className="text-center mt-10 mb-8">
        <h2
          className="text-[52px] sm:text-[52px] font-bold text-[#32046B] relative"
          style={{
            fontFamily: "Readex Pro, sans-serif",
          }}
        >
          Reviews
        </h2>
        <div
          className="w-64 h-[3px] mx-auto mt-4"
          style={{
            background:
              "linear-gradient(89.99deg, #7C14FD 1.09%, rgba(124, 20, 253, 0.29) 99.99%)",
          }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 relative">
        {[
          {
            name: "Sneha",
            role: "Tutor",
            review:
              "The platform made it easy to find students. The experience was seamless and well-organized!",
          },
          {
            name: "Sai Kiran",
            role: "Student",
            review:
              "Finding a tutor who matched my learning style was effortless. Highly recommended!",
          },
          {
            name: "Sai Kumar",
            role: "Tutor",
            review:
              "Managing my tutoring schedule has never been easier. The interface is user-friendly and efficient!",
          },
          {
            name: "Vijay",
            role: "Student",
            review:
              "The review system helped me choose the best tutor for my needs. Great experience!",
          },
          {
            name: "Sanath",
            role: "Tutor",
            review:
              "I appreciate how this platform connects tutors and students seamlessly. Great initiative!",
          },
          {
            name: "Venkat",
            role: "Student",
            review:
              "My math scores improved after joining. The tutor I found was knowledgeable and patient.",
          },
          {
            name: "Chaithnya",
            role: "Tutor",
            review:
              "A great platform that provides excellent exposure to students and tutors alike.",
          },
          {
            name: "Deekshith",
            role: "Student",
            review:
              "The tutors here are dedicated and well-trained. My experience was fantastic!",
          },
          {
            name: "Srinivas",
            role: "Tutor",
            review:
              "This platform has helped me reach more students than I ever imagined. Very useful!",
          },
        ].map((review, index) => (
          <div
            key={index}
            className="rounded-lg p-6 flex flex-col items-start shadow-2xl shadow-blue-300"
          >
            <h2 className="text-xl font-bold text-[#000000] mb-2">
              {review.name}
            </h2>
            <p className="text-xl text-[#000000] mb-4 mt-4 font-bold">
              {review.role}
            </p>
            <p className="text-sm text-[#32046B] mb-6">{review.review}</p>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center items-center space-x-1 my-8">
        <button className="text-[#000000] hover:underline font-bold">
          Previous
        </button>
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            className={`px-4 py-2 rounded-lg transition ${number === 1 ? "text-[#000000]" : "text-[#000000] hover:underline"
              }`}
          >
            {number}
          </button>
        ))}
        <button className="text-[#B070FF] hover:underline font-bold">
          Next
        </button>
      </div> */}
      <section className="bg-purple-50 py-12 sm:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="absolute top-2 left-72 text-pink-300 text-2xl">★</div>
          <div className="absolute top-10 left-20 text-pink-300 text-2xl">
            ★
          </div>
          <div className="absolute top-20 right-32 text-blue-300 text-xl">
            •
          </div>
          <div className="absolute bottom-24 left-16 text-purple-300 text-3xl">
            ✦
          </div>
          <div className="absolute bottom-12 right-24 text-pink-300 text-2xl">
            •
          </div>
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 text-blue-300 text-lg">
            ✦
          </div>
          <div className="md:w-1/2 text-center md:text-left px-6 sm:px-10">
            <h1
              className="text-[#000000] font-bold mb-4 text-3xl sm:text-4xl lg:text-5xl leading-snug"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "40px",
                fontWeight: "600",
                lineHeight: "70.34px",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              LET'S KEEP IN TOUCH
            </h1>
            <p
              className="text-[#32046B] font-medium mb-8 text-lg sm:text-xl lg:text-2xl"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "24px",
                lineHeight: "42.5px",
                letterSpacing: "0.2px",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              Subscribe to our email newsletter to keep yourself updated.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <div className="relative flex items-center w-full sm:w-72 bg-gradient-to-r from-purple-600 to-violet-800 rounded-full">
                <img src={message} alt="Mail Icon" className="ml-4 w-8 h-8" />
                <input
                  type="email"
                  placeholder="Enter Your Email..."
                  className="flex-1 bg-transparent text-white placeholder-white px-4 py-3 focus:outline-none focus:ring-purple-500 rounded-full"
                />
              </div>
              <button
              onClick={() => navigate("/LoginPage")}
                className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-purple-600 text-black bg-white hover:bg-purple-100 transition flex-shrink-0"
                style={{
                  height: "3rem",
                }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src={Mails}
              alt="Newsletter Illustration"
              className="w-full max-w-md sm:max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      
      <FooterMain/>
    </div>
  );
};

export default HomeReviews;
