import image1 from "../../assets/32.png";
import backgroundimage from "../../assets/img.png";
import messageImage from "../../assets/23.png"
import mail from "../../assets/24.png"

function OurServices() {
  return (
    <>
      <div
        className=" relative bg-cover mb-11 bg-center bg-white min-h-screen  "
        style={{ backgroundImage: `url(${backgroundimage})` }}
      >
        <div className="p-6  bg-opacity-80 mt-[9rem]  max-w-2xl  ">
          <h1 className="text-6xl font-bold mb-4  m-12 text-cyan-700 pl-[4rem]">
            Our Services
          </h1>
          <p className="text-lg font-medium mb-8 pl-[7rem]">
            Bring a trusted home tutoring website, Perfect Tutor serves teachers
            as well as students & parents for convenient learning.
          </p>
          <button
            className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold text-lg py-4 px-8 ml-[7rem] relative"
            style={{ boxShadow: "0 2 px 46px rgba(0, 155, 255, 0.6)" }}
          >
            Contact Us
            <div className="absolute inset-x-0 bottom-0 h-[4px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[4px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
        </div>
        <img
          alt="ourserviceimage"
          className="absolute w-[760px] h-[707px] top-[20px] left-[938px] pr-12"
          src={image1}
        />
      </div>
      <div className="  bg-opacity-80  text-center ">
        <h1 className="text-5xl font-bold mt-10 m-12 text-cyan-700 pl-[4rem]">
          {" "}
          Our Services
        </h1>
        <p className="text-lg font-medium mb-10 max-w-8xl text-center mx-auto max-w-7xl">
          Our core service areas offer parents, students, private home tutors,
          online tutors and users a fair choice of affordable home tutoring. We
          always intend to maintain transparency in the connecting process
          between a home tutor and students wishing to accomplish their academic
          goals with professional guidance. Our top priority is to provide the
          best education to the students through qualified and experienced
          teachers.
        </p>
        <div>
          <button className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 mr-[5rem] relative ">
            Home Tutors
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
          <button className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 mr-[5rem] relative">
            Online Tutors
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
          <button className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 mr-[5rem] relative">
            Mentorships
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
          <button className="bg-cyan-300 rounded-md hover:bg-cyan-400 hover:text-black text-white font-bold py-3 px-6 mr-[5rem] relative">
            MockTests
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </button>
        </div>
      </div>

      <div className="bg-cyan-900  mt-[24rem] p-12 m-4 border rounded-">
        <div>
          <div className=" mx-auto px-4 text-start">
            <h1 className="text-cyan-300 mr-[1rem] text-4xl font-bold mb-12">
              Whom We Serve
            </h1>
            <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="bg-white rounded-xl shadow-lg  ml-[23rem] p-8 md:w-1/3 max-w-6xl">
                <h2 className="text-purple-800 text-2xl font-bold mb-4">
                  I'm a Tutor
                </h2>
                <p className="text-gray-900 mb-6">
                  Perfect Tutor connects Students with Home Tutors and Online
                  Tutors. We provide full-time & part-time Home Tuition Jobs and
                  Online Tuition Jobs. You can teach the students of all Classes
                  from KG to XII. You can also teach the students of Colleges,
                  Universities, Competitive Exams, Hobby & Languages, etc.
                  Interested Tutors can Sign Up for Free to get Online and Home
                  Tutoring Jobs.
                </p>
                <button className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-purple-800 hover:text-white transition">
                  Sign Up
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg mb-4 ml-[23rem] p-8 md:w-1/3 max-w-6xl">
                <h2 className="text-purple-800 text-2xl font-bold mb-4">
                  I'm a Student
                </h2>
                <p className="text-gray-900 mb-6">
                  If you are looking for the top-qualified Home Tutor or Online
                  Tutor for tuition classes at your Home or Online. You can
                  simply post your learning requirement for Free on our Perfect
                  Tutor Platform and get an instant response from experienced
                  and the best-qualified tutors & teachers of your home area or
                  nearest location. Students can Sign Up to join us and our
                  teacher’s community.
                </p>
                <button className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-purple-800 hover:text-white transition">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" relative bg-cover bg-center bg-white min-h-screen flex items-start opacity-80"
        style={{ backgroundImage: `url(${backgroundimage})` }}
      ></div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-10 m-12 text-cyan-700 pl-[4rem]">
          Our Facilities
        </h1>

        <div
          className="bg-white rounded-xl shadow-lg mb-4 mx-auto p-8 md:w-2/3 max-w-6xl"
          style={{ boxShadow: "0 2px 46px rgba(0, 155, 255, 0.6)" }}
        >
          <p className="bg-cyan-900 text-cyan-300 border rounded-md p-2">
            Qualified and Experienced Tutors
          </p>
          <div className="bg-white rounded-xl shadow-lg mb-4 p-8 md:w-full max-w-5xl mx-auto">
            <span>
              Perfect Tutor has emerged as a prominent platform to reach out to
              professional tutors for affordable home tutoring services. We
              suggest only Qualified and Experienced Tutors.
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
              Perfect Tutor has emerged as a prominent platform to reach out to
              professional tutors for affordable home tutoring services. We
              suggest only Qualified and Experienced Tutors.
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
              {" "}
              Tutors and Teachers start getting 100% Accurate and Verified Leads
              after the successful verification of their teachers or tutors
              profile on our website. See our Subscription Plans.{" "}
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
              We offer completely Transparent and Hassle Free Services.There is
              no hidden terms. We take full care of the privacy of our
              customers. All payment methods we use are completely secured.
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[4px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-[4px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold mt-10 m-12 text-cyan-700 pl-[4rem]">
          Our Process
        </h1>
      </div>

      <div className="relative bg-customBlue  py-16 flex items-center justify-center">
        <div className="text-center max-w-xl">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            LET'S KEEP IN TOUCH
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our email newsletter to keep yourself updated
          </p>

          <div className="flex justify-center items-center gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="py-3 pl-14 pr-4 w-80  rounded-full bg-purple-800 text-white placeholder-white"
              />
              <span className="absolute left-3 top-1 text-yellow-400">
                <img
                  src={mail}
                  className=" w-10"
                />
              </span>
            </div>
            <button className="py-3 px-4 bg-white text-gray-700 border font-bold border-gray-300 rounded-full hover:bg-gray-200">
              Subscribe Now
            </button>
          </div>
        </div>

        <div className="">
          <img
            src={messageImage}
            className=" max-w-2xl"
          />
        </div>
      </div>


    </>
  );
}

export default OurServices;
