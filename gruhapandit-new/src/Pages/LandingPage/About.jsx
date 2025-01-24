import React, { useEffect, useState } from "react";
import Bulb from "../../assets/25.png";
import Mail from "../../assets/24.png";
import BigMail from "./../../assets/23.png";
import Background from "./../../assets/img.png";
import {
  FaGreaterThan,
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import Dart from "../../assets/26.png";
import Team from "../../assets/27.png";
import Interact from "../../assets/28.png";
import JoinClass from "../../assets/29.png";
import Examine from "../../assets/30.png";
import Succeed from "../../assets/31.png";
import Footer from "./FooterMain";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { renderStars } from "../../Admin Flow/AllReviews";

function About() {
  const navigate = useNavigate();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get("reviews/students/latest");
        setReview(response.data[0]); 
      } catch (error) {
        console.error('Error fetching the review:', error);
      }
    };
    
    fetchReview();
  }, []);
  
  if (!review) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="bg-customBlue p-2">
        <div className="relative bg-cover bg-center min-h-screen overflow-x-hidden">
          <div className="pt-24 sm:pt-44 w-full sm:w-4/5 md:w-2/5 mx-auto md:ml-20">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-violet-900 mb-4">
              About Us
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-normal mb-28">
              We are a dedicated platform connecting students and tutors,
              offering personalized learning solutions through flexible modes
              like online and in-person teaching.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full -mt-12">
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
                  <stop offset="0.266" stopColor="#74C1DD" />
                  <stop offset="1" stopColor="#FAF6FF" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-customBlue py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-5 md:px-32">
          <div className="bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <img
              src={Bulb}
              alt="Our Vision"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
              Our Vision
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              To be the leading provider of personalized education, empowering
              students to unlock their full potential through home tuitions and
              online tutoring, fostering a lifelong love of learning and success
              in their academic and professional lives.{" "}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <img
              src={Dart}
              alt="Our Mission"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
              Our Mission
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Our mission is to offer high-quality, accessible, and customized
              tutoring services that cater to the unique learning needs of each
              student. We aim to create a supportive, engaging, and flexible
              learning environment through expert tutors and innovative teaching
              methods, ensuring every student achieves academic excellence and
              personal growth.{" "}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <img src={Team} alt="Our Team" className="h-16 w-16 mx-auto mb-4" />
            <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
              Our Team
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              At Gruhapandit Tuitions, our team consists of highly qualified and
              dedicated tutors who are experts in their fields. Our tutors not
              only possess in-depth knowledge but also bring passion, patience,
              and a student-first attitude to every lesson. We believe in
              continuous learning and development, both for our students and
              tutors, ensuring that our team stays updated with the latest
              educational tools and techniques. Together, we work towards
              creating a nurturing learning environment that enables every
              student to achieve their best.{" "}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <img
              src={Dart}
              alt="Our Values"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
              Our Values
            </h1>
            <ul className="text-gray-600 text-sm md:text-base list-disc pl-5">
              
              <li>
                <strong>Personalized Learning:</strong> Customizing instruction
                to fit each student's distinct learning style in order to boost
                confidence and comprehension.
              </li>
              <li>
                <strong>Integrity:</strong> Maintaining trust, professionalism,
                and openness in all dealings.
              </li>
              
              <li>
                <strong>Growth:</strong> Constantly improving techniques to
                deliver a top-notch educational experience.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-customBlue py-20 px-5 md:px-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-violet-900">
            How GruhaPandit Works?
          </h2>
          <p className="text-gray-500 mt-2 md:text-lg">
            Ask for a Home Tutor, Teacher, or Instructor, and our AI will reach
            out to hundreds of skilled instructors based on subject and grade
            level to discover the best match for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img
              src={Interact}
              alt="Interact With Tutors"
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">
              Interact With Tutors
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Connect with tutors before taking the service and chat to ensure
              that you have selected the right tutor for you.
            </p>
          </div>

          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img
              src={JoinClass}
              alt="Join The Classes"
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">
              Join The Classes
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Experience individualized education in the comfort of your own
              home as well as in our unique online classroom.
            </p>
          </div>

          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img
              src={Examine}
              alt="Examine Your Progress"
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">
              Examine Your Progress
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              After each session, go over your individualized comments and study
              recommendations to discover what areas you need to work on.
            </p>
          </div>

          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img src={Succeed} alt="Succeed" className="h-16 w-16 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Succeed</h3>
            <p className="text-sm text-gray-500 mt-2">
              Customized learning with Perfect Tutor expert teachers provides
              you a competitive advantage.
            </p>
          </div>
        </div>
      </div>

      <section
        className="bg-cover bg-center min-h-screen "
        style={{
          backgroundImage: `url(${Background})`,
          transition: "background 0.5s ease-in-out",
        }}
      >
        <h2 className="text-4xl font-bold text-[#32046B] text-center  mt-20 mb-6">
          {" "}
          Our Testimonials{" "}
        </h2>
        <div
          className=" mx-auto  w-40 mt-2 mb-40"
          style={{
            height: "2.5px",
            background: "linear-gradient(to right, #7C14FD, transparent)",
          }}
        ></div>
        <div className="flex items-center justify-center bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto ">
          <div className="bg-red-500 rounded md:w-32 md:h-28  flex items-center justify-center ">
            <FaQuoteLeft className=" w-8 h-8  mt-24 mr-10" />
          </div>
          <div className="px-6 py-2 mt-10">
            <h3 className="text-xl font-bold text-[#32046B]">Student</h3>
            <p className="text-gray-600 mt-2 w-[75%]">{review.reviewerName}</p>
            <p className="text-gray-600 mt-2 w-[75%]">{review.comments}</p>
            <p className="text-sm text-[#32046B] font-medium mt-4">
              — {review.reviewerEmailId}
            </p>
            <p className="text-gray-600 mt-2 w-[75%]">{renderStars(review.rating)}</p>

            <div className="flex items-center justify-end mt-4 space-x-4">
              <button className="text-[#32046B] hover:opacity-75 text-xl">
                <FaArrowLeft />
              </button>
              <button className="text-[#32046B] hover:opacity-75 text-xl">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
    
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center flex-wrap">
        
          <div className="md:w-1/2 text-center md:text-left px-4 sm:px-6 lg:px-14">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 sm:mb-8 px-4 sm:px-10">
              LET'S KEEP IN TOUCH
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-[#32046B] w-full md:w-[90%] px-2 sm:px-6">
              Subscribe to our email newsletter to keep yourself updated.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4 py-6 sm:py-10">
              
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Enter your Email..."
                  className="px-4 py-2 border rounded-full w-full pl-12 bg-blue-900 text-white"
                />
                <img
                  src={Mail}
                  alt="Mail Icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
              </div>
           
              <button
                onClick={() => navigate("/LoginPage")}
                className="border-2 border-purple-600 text-black px-6 py-2 rounded-full hover:bg-orange-200"
              >
                Subscribe Now
              </button>
            </div>
          </div>

        
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
            <img
              src={BigMail}
              alt="Tutor"
              className="w-full sm:w-3/4 md:w-full relative z-10"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
