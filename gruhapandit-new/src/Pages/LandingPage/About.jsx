import React from 'react'
import Bulb from '../../assets/25.png'
import Mail from '../../assets/24.png'
import Mails from '../../assets/23.png'
import Dart from '../../assets/26.png'
import Team from '../../assets/27.png'
import Interact from '../../assets/28.png'
import JoinClass from '../../assets/29.png'
import Examine from '../../assets/30.png'
import Succeed from '../../assets/31.png'

function About() {
  return (
    <>
      <div className='bg-customBlue'>
        <div className='relative bg-cover bg-center min-h-screen'>
          <div className='pt-44 w-4/5 sm:w-3/5 md:w-2/5 ml-5 md:ml-20'>
            <h1 className='text-3xl sm:text-5xl md:text-7xl font-bold text-violet-900 mb-4'>About Us</h1>
            <p className='text-lg sm:text-xl md:text-2xl font-normal'>
              We are a dedicated platform connecting students and tutors, offering personalized learning solutions through flexible modes like online and in-person teaching.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full -mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 721" fill="none" className="w-full h-auto">
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
        <div className="flex flex-wrap justify-center gap-8 px-5 md:px-32">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div>
              <img
                src={Bulb}
                alt="Our Vision"
                className="h-16 w-16 mx-auto mb-4"
              />
              <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
                Our Vision
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Our vision is to empower and help students with the relevant information and proper knowledge related to their subjects and courses through our LMS (Learning Management System) and Perfect Tutors’ faculty.
              </p>
            </div>
          </div>

          <div className="max-w-md w-full bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div>
              <img
                src={Dart}
                alt="Our Mission"
                className="h-16 w-16 mx-auto mb-4"
              />
              <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
                Our Mission
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Ambitiously, our mission at Perfect Tutor is to provide the best home tutors and online teachers, guidance, information, and counseling to the students for their academic career growth.
              </p>
            </div>
          </div>

          <div className="max-w-md w-full bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div>
              <img
                src={Team}
                alt="Our Team"
                className="h-16 w-16 mx-auto mb-4"
              />
              <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
                Our Team
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Our team has a creative, innovative, and transformative mind working in seamless sync to create a path to better education for students. We are a team of young and energetic enthusiasts.
              </p>
            </div>
          </div>

          <div className="max-w-md w-full bg-white rounded-2xl shadow-custom p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div>
              <img
                src={Dart}
                alt="Our Values"
                className="h-16 w-16 mx-auto mb-4"
              />
              <h1 className="mb-4 bg-violet-900 text-white text-lg font-bold py-2 rounded-md">
                Our Values
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                We are driven by integrity, innovation, and a passion for education. Our values shape our commitment to creating a supportive and empowering learning environment for students.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-customBlue py-20 px-5 md:px-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-violet-900">How GruhaPandit Works?</h2>
          <p className="text-gray-500 mt-2 md:text-lg">
            Ask for a Home Tutor, Teacher, or Instructor, and our AI will reach out to hundreds of skilled instructors based on subject and grade level to discover the best match for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img
              src={Interact}
              alt="Interact With Tutors"
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">Interact With Tutors</h3>
            <p className="text-sm text-gray-500 mt-2">
              Connect with tutors before taking the service and chat to ensure that you have selected the right tutor for you.
            </p>
          </div>

          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img
              src={JoinClass}
              alt="Join The Classes"
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">Join The Classes</h3>
            <p className="text-sm text-gray-500 mt-2">
              Experience individualized education in the comfort of your own home as well as in our unique online classroom.
            </p>
          </div>

          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img
              src={Examine}
              alt="Examine Your Progress"
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">Examine Your Progress</h3>
            <p className="text-sm text-gray-500 mt-2">
              After each session, go over your individualized comments and study recommendations to discover what areas you need to work on.
            </p>
          </div>

          <div className="bg-white shadow-custom rounded-xl p-6 flex flex-col items-center text-center">
            <img
              src={Succeed}
              alt="Succeed"
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">Succeed</h3>
            <p className="text-sm text-gray-500 mt-2">
              Customized learning with Perfect Tutor expert teachers provides you a competitive advantage.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-customBlue py-12 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-violet-900">Our Testimonials</h2>
        </div>
        <div className="max-w-xl mx-auto bg-white shadow-custom rounded-2xl p-6">
          <div className="flex flex-col items-center">
            <div className="text-violet-900 text-4xl mb-4">“</div>
            <p className="text-gray-700 text-center text-lg">
              Lunar Strategy helped us with our digital marketing for 4 months now and still helps us. Great service and highly recommended.
            </p>
            <div className="text-right mt-4 w-full text-black font-semibold">
              — Kimmo Hakonen - Skrum Master at DaGear AB
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-customBlue py-16 flex flex-col sm:flex-row items-center justify-center sm:space-x-8">

        <div className="text-center sm:text-left max-w-xl sm:max-w-md w-full">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            LET'S KEEP IN TOUCH
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our email newsletter to keep yourself updated
          </p>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-center gap-4 sm:gap-2">
            <div className="relative w-full sm:w-80">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="py-3 pl-14 pr-4 w-full shadow-black rounded-full bg-purple-800 text-white placeholder-white"
              />
              <span className="absolute left-3 top-1 text-yellow-400">
                <img
                  src={Mail}
                  className="w-10"
                  alt="Mail Icon"
                />
              </span>
            </div>
            <button className="py-3 px-4 bg-white text-gray-700 border font-bold border-gray-300 rounded-full hover:bg-gray-200 mt-4 sm:mt-0">
              Subscribe Now
            </button>
          </div>
        </div>

        <div className="mt-8 sm:mt-0 w-full max-w-md">
          <img
            src={Mails}
            className="w-full h-auto"
            alt="Mails Image"
          />
        </div>
      </div>


    </>
  )
}

export default About;
