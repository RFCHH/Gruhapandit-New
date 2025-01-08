import image1 from "../../assets/32.png";
import backgroundimage from "../../assets/img.png";
import messageImage from "../../assets/23.png";
import mail from "../../assets/24.png";
import { useNavigate } from "react-router-dom";
import FooterMain from "./FooterMain";

function OurServices() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-cover bg-center min-h-screen bg-white overflow-x-hidden">
      <div
        className="relative bg-cover bg-center bg-white min-h-screen"
        style={{ backgroundImage: `url(${backgroundimage})` }}
      >
        {/* Content Container */}
        <div className="p-6 bg-opacity-80 mt-[6rem] sm:mt-[7rem] md:mt-[9rem] max-w-full md:max-w-2xl mx-auto md:mx-0">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-center sm:text-left md:text-left text-cyan-700 sm:pl-[2rem] md:pl-[4rem]">
            Our Services
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-medium mb-8 text-center sm:text-left md:text-left sm:pl-[2rem] md:pl-[4rem]">
            At Gruhapandit Tuitions, we offer a wide range of educational
            services designed to meet the unique needs of every student. Whether
            you need home tutoring, online tutoring, mentorship, or preparation
            for competitive exams, our expert tutors are here to help you
            achieve academic success.
          </p>
          <div className="flex justify-center sm:justify-start sm:pl-[2rem] md:justify-start md:pl-[4rem]">
            <button
              onClick={() => navigate("/ContactUs")}
              className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold text-sm sm:text-base md:text-lg py-3 px-6 sm:py-4 sm:px-8 md:py-4 md:px-8 relative"
              style={{ boxShadow: "0 2px 46px rgba(0, 155, 255, 0.6)" }}
            >
              Contact Us
              <div className="absolute inset-x-0 bottom-0 h-[4px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-[4px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex justify-center sm:justify-start md:justify-end   md:top-0 sm:mt-20 md:mt-10 md:absolute md:right-[1rem] lg:right-[8rem]">
          <img
            alt="ourserviceimage"
            className="w-[300px] sm:w-[280px] md:w-[360px] lg:w-[400px] h-auto sm:mt-52  md:mt-36"
            src={image1}
          />
        </div>
      </div>

      <div className="bg-opacity-80 text-center px-4 sm:px-0">
        <h1 className="text-4xl sm:text-5xl font-bold mt-10 m-12 text-cyan-700 sm:pl-[4rem]">
          Our Services
        </h1>
        <p className="text-lg font-medium mb-10 max-w-3xl sm:max-w-7xl mx-auto">
          Our core service areas offer parents, students, private home tutors,
          online tutors and users a fair choice of affordable home tutoring. We
          always intend to maintain transparency in the connecting process
          between a home tutor and students wishing to accomplish their academic
          goals with professional guidance. Our top priority is to provide the
          best education to the students through qualified and experienced
          teachers.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-6">
          <button
            onClick={() => navigate("/LoginPage")}
            className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 relative w-full sm:w-auto"
          >
            Home Tutors
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
          <button
            onClick={() => navigate("/LoginPage")}
            className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 relative w-full sm:w-auto"
          >
            Online Tutors
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
          <button
            onClick={() => navigate("/LoginPage")}
            className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 relative w-full sm:w-auto"
          >
            Mentorships
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
          <button
            onClick={() => navigate("/LoginPage")}
            className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 relative w-full sm:w-auto"
          >
            MockTests
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
        </div>
      </div>

      <div className="bg-cyan-900 mt-[24rem] p-2 m-4 border rounded-md">
        <div>
          <div className="mx-auto px-4 text-start">
            <h1 className="text-cyan-300 mr-[1rem] text-4xl font-bold mb-12">
              Whom We Serve
            </h1>
            <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full sm:w-80 md:w-1/3 max-w-6xl mx-auto">
                <h2 className="text-purple-800 text-2xl font-bold mb-4">
                  I'm a Tutor
                </h2>
                <p className="text-gray-900 mb-6 text-justify">
                  For tutors, we are looking for individuals with expertise in
                  their subject areas and a passion for teaching. Our ideal
                  tutors are patient, able to communicate effectively, and can
                  tailor their teaching methods to suit the unique needs of each
                  student. We want tutors who are reliable, professional, and
                  dedicated to providing the best learning experience, whether
                  through home tuition or online tutoring. Tutors who are
                  adaptable and committed to student success will thrive with
                  us.
                </p>
                <button
                  onClick={() => navigate("/userselection")}
                  className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-purple-800 hover:text-white transition"
                >
                  Sign Up
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 w-full sm:w-80 md:w-1/3 max-w-6xl mx-auto">
                <h2 className="text-purple-800 text-2xl font-bold mb-4">
                  I'm a Student
                </h2>
                <p className="text-gray-900 mb-6 text-justify">
                  for students who are committed to their learning journey and
                  motivated to achieve their academic goals. Whether it's
                  excelling in school education, preparing for competitive
                  exams, or enhancing technical skills, we seek students who are
                  eager to improve, actively participate in lessons, and remain
                  focused on their progress. We value students who are clear
                  about their educational needs and are dedicated to achieving
                  success
                </p>
                <button
                  onClick={() => navigate("/userselection")}
                  className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-purple-800 hover:text-white transition"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center bg-white min-h-screen flex items-start opacity-80"
        style={{ backgroundImage: `url(${backgroundimage})` }}
      >
        <div className="absolute inset-0  opacity-50 md:hidden"></div>{" "}
        {/* Optional overlay for mobile */}
        <div className="container mx-auto px-4 py-16 text-white">
          {/* Your content goes here */}
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold mt-10 mr-10 text-cyan-700 pl-[4rem]">
          Our Facilities
        </h1>

        <div
          className="bg-white rounded-xl shadow-lg mt-10 mb-4 mx-auto p-8 md:w-2/3 max-w-6xl"
          style={{ boxShadow: "0 2px 46px rgba(0, 155, 255, 0.6)" }}
        >
          <p className="bg-cyan-900 text-cyan-300 border rounded-md p-2">
            Qualified and Experienced Tutors
          </p>
          <div className="bg-white rounded-xl shadow-lg mb-4 p-8 md:w-full max-w-5xl mx-auto">
            <span>
              Our team consists of highly qualified and experienced tutors who
              are experts in their fields. Each tutor is carefully selected
              based on their knowledge, teaching experience, and ability to
              connect with students. Whether it's home tutoring or online
              tutoring, our tutors are dedicated to providing personalized
              attention to help students achieve their academic goals.
            </span>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg mt-10 mx-auto p-8 md:w-2/3 max-w-6xl"
          style={{ boxShadow: "0 2px 46px rgba(0, 155, 255, 0.6)" }}
        >
          <p className="bg-cyan-900 text-cyan-300 border rounded-md p-2">
            Personalized Exams
          </p>
          <div className="bg-white rounded-xl shadow-lg mb-4 p-8 md:w-full max-w-5xl mx-auto">
            <span>
              Every student has different learning needs, and we are aware of
              this. That's why we offer personalized exam preparation that
              targets individual strengths and weaknesses. Our tutors design
              customized lesson plans and focus on enhancing areas that need
              improvement, ensuring a more effective and efficient learning
              experience.
            </span>
          </div>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg  mt-10 mx-auto p-8 md:w-2/3 max-w-6xl relative"
          style={{ boxShadow: "0 8px 56px rgba(0, 155, 255, 0.6)" }}
        >
          <p className="bg-cyan-900 text-cyan-300 border rounded-md p-2">
            100% Verified and Accurate Leads
          </p>
          <div className="bg-white rounded-xl shadow-lg mb-4 p-8 md:w-full max-w-5xl mx-auto">
            <span>
              We pride ourselves on providing verified and accurate leads to
              ensure students are paired with the right tutor. Whether you're
              looking for home tutors or online tutors, we ensure that all
              tutors meet our strict qualifications and are ready to deliver
              high-quality teaching..
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[4px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-[4px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg mt-10 mx-auto p-8 md:w-2/3 max-w-6xl relative"
          style={{ boxShadow: "0 8px 56px rgba(0, 155, 255, 0.6)" }}
        >
          <p className="bg-cyan-900 text-cyan-300 border rounded-md p-2">
            Transparent and Hassle Free Services
          </p>
          <div className="bg-white rounded-xl shadow-lg mb-4 p-8 md:w-full max-w-5xl mx-auto">
            <span>
              At Gruhapandit Tuitions, we believe in maintaining transparency in
              everything we do. Our process is straightforward, ensuring that
              there are no hidden fees or surprises. We offer hassle-free
              services, from booking a tutor to scheduling sessions, making the
              learning experience seamless for both students and parents.
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[4px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-[4px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 py-16 px-4 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-8 sm:mb-12 text-center">
          Our Process
        </h1>

        {/* Container for Student and Tutor */}
        <div className="flex flex-col md:flex-row md:justify-center gap-8 md:gap-12">
          {/* Student Section */}
          <div className="bg-white w-full sm:w-80 md:w-1/3 shadow-lg rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-700 mb-4 sm:mb-6 text-center">
              Student
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {[
                "Sign Up",
                "Select Tutor",
                "Select Demo",
                "Convert to Class",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-5 sm:py-4 sm:px-6 rounded-lg shadow-md hover:scale-105 transform transition-all"
                >
                  <span className="text-sm sm:text-lg font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tutor Section */}
          <div className="bg-white w-full sm:w-80 md:w-1/3 shadow-lg rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-700 mb-4 sm:mb-6 text-center">
              Tutor
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {[
                "Sign Up",
                "View Enquiry",
                "Select Demo",
                "Convert to Class",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-5 sm:py-4 sm:px-6 rounded-lg shadow-md hover:scale-105 transform transition-all"
                >
                  <span className="text-sm sm:text-lg font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-customBlue py-12 sm:py-16 lg:py-20 flex flex-col sm:flex-row items-center justify-center">
        {/* Text Section */}
        <div className="text-center sm:text-left max-w-xl sm:w-1/2 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            LET'S KEEP IN TOUCH
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base lg:text-lg">
            Subscribe to our email newsletter to keep yourself updated.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
            {/* Email Input */}
            <div className="relative w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="py-3 pl-14 pr-4 w-full sm:w-80 rounded-full bg-purple-800 text-white placeholder-white"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400">
                <img src={mail} className="w-8 sm:w-10" alt="Mail Icon" />
              </span>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={() => navigate("/LoginPage")}
              className="py-3 px-6 bg-white text-gray-700 border font-bold border-gray-300 rounded-full hover:bg-gray-200"
            >
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-8 sm:mt-0 sm:w-1/2 flex justify-center">
          <img
            src={messageImage}
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
            alt="Message Illustration"
          />
        </div>
      </div>

      <FooterMain />
    </div>
  );
}

export default OurServices;
