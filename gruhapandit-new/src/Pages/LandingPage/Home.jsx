import React, { useState, useMemo, useEffect } from 'react';
import Logo from './../../assets/3.png';
import Map from './../../assets/4.png';
import Books from './../../assets/2.png';
import Background from './../../assets/img.png';
import SchoolImage from './../../assets/5.png';
import CollegeImage from './../../assets/6.png';
import Technical from './../../assets/7.png';
import Global from './../../assets/8.png';
import Competitive from './../../assets/9.png';
import Soft from './../../assets/10.png';
import Government from './../../assets/11.png';
import Entrance from './../../assets/12.png';
import Compare from './../../assets/14.png';
import Instant from './../../assets/15.png';
import Flexible from './../../assets/16.png';
import Verified from './../../assets/17.png';
import Student from './../../assets/13.png';
import Tutor from './../../assets/18.png';
import Accurate from './../../assets/19.png';
import Homes from './../../assets/20.png';
import Branding from './../../assets/21.png';
import Experience from './../../assets/22.png';
import BigMail from './../../assets/23.png';
import Mail from './../../assets/24.png';
import Footer from './../../assets/Footer.png';
import { FaGreaterThan, FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FooterMain from "./FooterMain"


const LOCATIONIQ_API_KEY = 'pk.530c664f58a82993701a9f281205ad8e';



function Home() {
  const [stats, setStats] = useState(false);
  const [address, setAddress] = useState('');
  const [results, setResults] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


  const handleChange = async (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);

    if (newAddress.length >= 2) {
      const res = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${newAddress}&format=json`
      );
      const data = await res.json();
      setResults(data); 
    } else {
      setResults([]); 
    }
  };

 
  const handleSelect = (item) => {
    const displayName = item.display_name; 
    const components = displayName.split(','); 
    const city = components[components.length - 6]?.trim();
    const district = components[components.length - 4]?.trim();
    const state = components[components.length - 3]?.trim();
    const country = components[components.length - 1]?.trim();

    const formattedAddress = `${city}, ${district}, ${state}, ${country}`;
    
    setAddress(formattedAddress);
    setResults([]); 
};

const handleSearch = async () => {
  if (!address) {
    alert("Please select an address before searching.");
    return;
  }

  try {
    const cleanedAddress = address.trim().replace(/\s+/g, ' '); 
    const [city, district, state, country] = cleanedAddress.split(",").map((item) => item.trim());

    if (!city || !district || !state || !country) {
      alert("Address is incomplete. Please select a valid address.");
      return;
    }
    const url = `https://tution-application.onrender.com/tuition-application/homepagedata/search?city=${encodeURIComponent(city)}&district=${encodeURIComponent(district)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}`;

    const response = await axios.get(url);

    setApiResponse(response.data);
  } catch (error) {
    console.error("Error during the GET request:", error);
    alert("Failed to fetch data. Please try again.");
  }
  setShowPopup(true);
};

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await axios.get(`https://tution-application.onrender.com/tuition-application/homepagedata/`);
        if (response.status === 200) {
          const statsArray = Object.entries(response.data).map(([key, value]) => ({
            label: key.toUpperCase(),
            count: value,
          }));
          setStats(statsArray);
        }
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    fetchStatsData();
  }, []);



  const options = useMemo(() => [
    {
      title: 'School Education',
      description: 'Gruhapandit Tuitions offers expert guidance for school education through personalized home tuitions and online tutoring, helping students excel in academics and build a strong foundation for success.',
      icon: SchoolImage,
    },
    {
      title: 'Under/Post Graduate',
      description: 'Gruhapandit Tuitions provides specialized home tuition and online tutoring for undergraduate and postgraduate students, ensuring personalized academic and career success guidance.',
      icon: CollegeImage,
    },
    {
      title: 'Technical Skills',
      description: 'Gruhapandit Tuitions offers personalized coaching in technical skills, empowering students and professionals with expertise in programming, data analysis, software tools, and industry-relevant technologies.',
      icon: Technical,
    },
    {
      title: 'Global Language',
      description: 'Gruhapandit Tuitions provides expert guidance in global languages like English, Spanish, French, and more, through personalized home tuitions and online tutoring to enhance communication skills.',
      icon: Global,
    },
    {
      title: 'Competitive Exam',
      description: 'Gruhapandit Tuitions offers personalized coaching for competitive exams, including IIT-JEE, NEET, UPSC, and more, through expert home tuitions and online tutoring, ensuring exam success.',
      icon: Competitive,
    },
    {
      title: 'Soft Skills',
      description: 'Gruhapandit Tuitions provides expert training in soft skills, including communication, leadership, time management, and teamwork, through personalized home tuitions and online tutoring sessions.',
      icon: Soft,
    },
    {
      title: 'Government Exam',
      description: 'Gruhapandit Tuitions offers specialized coaching for government exams like SSC, Bank Exams, RRB, and UPSC through personalized home tuitions and online tutoring, ensuring focused preparation.',
      icon: Government,
    },
    {
      title: 'Entrance Exam',
      description: 'Gruhapandit Tuitions offers expert coaching for entrance exams such as JEE, NEET, CET, and more,  with personalized home tuitions and online tutoring to help students achieve their desired scores.',
      icon: Entrance,
    },
  ], []);
  
  return (
    <>
      <div className=" bg-gradient-to-b from-purple-50 to-blue-100 min-h-screen mt-20 absolute overflow-x-hidden">
        <section
          className="bg-gradient-to-b from-blue-200 to-white bg-cover bg-center "
          style={{
            backgroundImage: `url(${Background})`,
            transition: 'background 0.5s ease-in-out',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center flex-wrap">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="font-bold text-gray-800">
                We Are Concerned About Your Tomorrow
              </h2>
              <h3 className="text-3xl font-bold text-black mt-4">
                Find Experienced Tutors
              </h3>
              <p className="font-semibold text-black mt-2">Online & Home Tutors</p>
              <h1 className="mt-6 font-semibold">
                Find Tutors in Nearby Location
              </h1>
              <div className="flex justify-center md:justify-start items-center space-x-4">
                <div className="relative w-80">
                  <input
                    type="text"
                    value={address}
                    onChange={handleChange}
                    placeholder="Nearby Location "
                    className="px-4 py-2 border rounded-full w-full pl-12 bg-blue-900 text-white"
                  />
                  <img
                    src={Map}
                    alt="Location Icon"
                    className="absolute rounded-full left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                  />
                  {results.length > 0 && (
                    <div className="absolute z-10 w-full bg-white rounded-lg shadow-md mt-1">
                      <ul className="max-h-60 overflow-y-auto">
                        {results.map((item) => {
                          const displayName = item.display_name; 
                          const components = displayName.split(',');
                          const city = components[components.length - 6]?.trim();
                          const district = components[components.length - 4]?.trim();
                          const state = components[components.length - 3]?.trim();
                          const country = components[components.length - 1]?.trim();

                          return (
                            <li
                              key={item.place_id}
                              onClick={() => handleSelect(item)}
                              className="px-4 py-2 text-black cursor-pointer hover:bg-gray-200"
                            >
                              {city},{district},{state} , {country} 
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
                <button 
                    onClick={handleSearch}
                    className="border-4 border-purple-600 text-black px-6 py-2 rounded-full  ">
                      Search Now
                </button>
                {showPopup && (
                  <div className="fixed inset-0 z-20 flex items-center justify-center  bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
                      <ul className="mt-2">
                        {apiResponse.map((data, index) => (
                          <li key={index} className="mb-2">
                            {data.category}: {data.count}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          setShowPopup(false); 
                          setAddress(''); 
                        }}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center md:justify-start mt-8">
                <img
                  src={Books}
                  alt="Books"
                  className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] object-contain"
                />
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
              <img
                src={Logo}
                alt="Tutor"
                className="w-3/4 md:w-full relative z-10"
              />
              <div className="absolute inset-0 bg-yellow-400 rounded-full w-64 h-64 md:w-80 md:h-80 top-12 left-12 z-0"></div>
            </div>
          </div>
        </section>
        <section>
          <div >
            <h2 className="text-center text-3xl font-bold text-gray-800  mt-5 mb-24">
              Personalized Learning for Every Need
            </h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {options.map((option, index) => (
                <div className="option-card border rounded-3xl p-6 shadow-2xl  shadow-zinc-500 hover:shadow-current transition " key={index}>
                  <div className="text-center mb-4">
                    <img src={option.icon} alt={`${option.title} Icon`} className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg  text-center font-bold">{option.title}</h3>
                  <p className="text-sm text-center text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="relative flexbox  py-10 mt-10">
            <div className="text-center ">
              <h2 className="text-3xl font-bold text-gray-800">How it works</h2>
              <div className=" mx-auto w-28 mt-2 mb-5" style={{
                height: '2px',
                background: 'linear-gradient(to right, #7C14FD, transparent)'
              }}
              ></div>
              <p onClick={() => navigate("/LoginPage")} className="text-xl text-white bg-violet-800 px-20 py-2 rounded-full inline-block font-medium mt-10 mb-30">
                For Student
              </p>
            </div>
            <div className="absolute top-0 right-0   sm:m-10 sm:mr-10">
              <img
                src={Student}
                alt="Student"
                className="w-[200px] h-[300px] md:w-[500px] md:h-[330px] md:-mr-52   lg:w-[700px] lg:h-[470px] object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1  gap-8 items-center ">
            <div className='space-y-2'>
              <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:ml-30">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <img src={Compare} alt="Compare" className="w-20 h-20 sm:w-28 sm:h-28" />
                </div>
                <div className="ml-0 sm:ml-6 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold text-violet-800 mb-2">Compare, Hire & Learn</h2>
                  <div
                    className="w-20 mt-2 mb-5 mx-auto sm:mx-0"
                    style={{
                      height: "2px",
                      background: "linear-gradient(to right, #7C14FD, transparent)",
                    }}
                  ></div>
                  <p className="text-sm text-black font-semibold">
                    Take a free demo from our Home Tutors and Online Tutors. Compare amongst them and hire the best.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:mr-40">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <img src={Instant} alt="Instant" className="w-20 h-20 sm:w-28 sm:h-28" />
                </div>
                <div className="ml-0 sm:ml-6 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold text-violet-800 mb-2">Instant Response</h2>
                  <div
                    className="w-20 mt-2 mb-5 mx-auto sm:mx-0"
                    style={{
                      height: "2px",
                      background: "linear-gradient(to right, #7C14FD, transparent)",
                    }}
                  ></div>
                  <p className="text-sm text-black font-semibold">
                    As per your learning needs, get an instant response from experienced tutors and teachers near you.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:ml-30">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <img src={Flexible} alt="Flexible" className="w-20 h-20 sm:w-28 sm:h-28" />
                </div>
                <div className="ml-0 sm:ml-6 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold text-violet-800 mb-2">Learn at Flexible Timings</h2>
                  <div
                    className="w-20 mt-2 mb-5 mx-auto sm:mx-0"
                    style={{
                      height: "2px",
                      background: "linear-gradient(to right, #7C14FD, transparent)",
                    }}
                  ></div>
                  <p className="text-sm text-black font-semibold">
                    Enjoy the freedom to study at your convenience with personalized schedules designed to fit your busy life.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:mr-44">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <img src={Verified} alt="Verified Tutors" className="w-20 h-20 sm:w-28 sm:h-28" />
                </div>
                <div className="ml-0 sm:ml-6 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold text-violet-800 mb-2">Get Verified Expert Tutors</h2>
                  <div
                    className="w-20 mt-2 mb-5 mx-auto sm:mx-0"
                    style={{
                      height: "2px",
                      background: "linear-gradient(to right, #7C14FD, transparent)",
                    }}
                  ></div>
                  <p className="text-sm text-black font-semibold">
                    Learn from experienced and certified tutors who provide reliable, high-quality education tailored to your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative py-10  mt-10">
            <div className="text-center mb-10  -md:mr-32 ">
              <div className="relative top-0 right-0 ">
                <img
                  src={Tutor}
                  alt="tutor"
                  className="absolute  w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]   lg:w-[450px] lg:h-[400px]  object-contain"
                />
              </div>

            </div>
            <div className='my-4 justify-center flex'>
              <p
                onClick={() => navigate("/LoginPage")}
                className="text-xl text-white bg-violet-800 px-10 py-2   sm:px-20 rounded-full inline-block font-medium mt-10 mb-32 sm:mb-44"
              >
                For Tutors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-center mb-6">
              <div className="space-y-2 -mt-24">
                <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:mr-36">
                  <div className="flex-shrink-0 mb-4 sm:mb-0">
                    <img src={Accurate} alt="Accurate" className="w-20 h-20 sm:w-32 sm:h-28" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-violet-800 mb-2">
                      Get Verified & Accurate Leads
                    </h2>
                    <div
                      className="w-16 sm:w-20 mx-auto sm:mx-0 mt-2 mb-5"
                      style={{
                        height: "2px",
                        background: "linear-gradient(to right, #7C14FD, transparent)",
                      }}
                    ></div>
                    <p className="text-sm text-black font-semibold">
                      Create your profile for free to get 100% verified lead and start an online and home tuition job near you.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:ml-36">
                  <div className="flex-shrink-0 mb-4 sm:mb-0">
                    <img src={Homes} alt="home" className="w-20 h-20 sm:w-28 sm:h-28" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-violet-800 mb-2">
                      Teach at Home or Online
                    </h2>
                    <div
                      className="w-16 sm:w-20 mx-auto sm:mx-0 mt-2 mb-5"
                      style={{
                        height: "2px",
                        background: "linear-gradient(to right, #7C14FD, transparent)",
                      }}
                    ></div>
                    <p className="text-sm text-black font-semibold">
                      As per your learning needs, get an instant response from experienced tutors and teachers near you.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:mr-36">
                  <div className="flex-shrink-0 mb-4 sm:mb-0">
                    <img src={Branding} alt="Branding" className="w-20 h-20 sm:w-28 sm:h-28" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-violet-800 mb-2">
                      Branding & Promotion
                    </h2>
                    <div
                      className="w-16 sm:w-20 mx-auto sm:mx-0 mt-2 mb-5"
                      style={{
                        height: "2px",
                        background: "linear-gradient(to right, #7C14FD, transparent)",
                      }}
                    ></div>
                    <p className="text-sm text-black font-semibold">
                      Take a free demo from our Home Tutors and Online Tutors. Compare amongst and hire the best.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center py-4 px-6 bg-white rounded-lg shadow-2xl shadow-blue-300 max-w-xl mx-auto md:ml-36">
                  <div className="flex-shrink-0 mb-4 sm:mb-0">
                    <img src={Experience} alt="Experience" className="w-20 h-20 sm:w-28 sm:h-28" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-violet-800 mb-2">
                      Personalized Learning Experience
                    </h2>
                    <div
                      className="w-16 sm:w-20 mx-auto sm:mx-0 mt-2 mb-5"
                      style={{
                        height: "2px",
                        background: "linear-gradient(to right, #7C14FD, transparent)",
                      }}
                    ></div>
                    <p className="text-sm text-black font-semibold">
                      Deliver tailored education that adapts to individual learning styles, ensuring effective and engaging learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-screen bg-gradient-to-r from-blue-300 to-green-200 flex-col md:flex-row">
            <div className="flex-1 flex items-center justify-center p-10">
              <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold text-left">
                What Are You Looking For?
              </h1>
            </div>
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
                <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">I'm a Tutor</h2>
                  <p className="mb-4 text-justify">
                    For tutors, we are looking for individuals with expertise in their subject areas and a passion for teaching.
                    Our ideal tutors are patient, able to communicate effectively, and can tailor their teaching methods to suit
                    the unique needs of each student. We want tutors who are reliable, professional, and dedicated to providing
                    the best learning experience, whether through home tuition or online tutoring. Tutors who are adaptable and
                    committed to student success will thrive with us.
                  </p>
                  <div className="flex items-center px-4 py-2 border-black shadow-md rounded-full w-40 mt-12">
                    <button onClick={() => navigate("/userselection")}><span className="font-semibold ml-2">Sign Up</span></button>
                    <FaGreaterThan className="text-black ml-10" />
                  </div>
                </div>
                <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">I'm a Student</h2>
                  <p className="mb-4 text-justify">
                    For students who are committed to their learning journey and motivated to achieve their academic
                    goals. Whether it's excelling in school education, preparing for competitive exams, or enhancing technical skills,
                    we seek students who are eager to improve, actively participate in lessons, and remain focused on their progress.
                    We value students who are clear about their educational needs and are dedicated to achieving success.                  </p>
                  <div className="flex items-center px-4 py-2 border-black shadow-lg rounded-full w-40 mt-24">
                    <button onClick={() => navigate("/userselection")}><span className="font-semibold ml-2">Sign Up</span></button>
                    <FaGreaterThan className="text-black ml-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-purple-50 py-12">
            <div className="container mx-auto px-4 ">
              <h2 className="text-4xl font-bold text-[#32046B] text-center  mt-20 mb-6">
                Why Perfect Tutor?
              </h2><div className=" mx-auto  w-40 mt-2 mb-40" style={{
                height: '2px',
                background: 'linear-gradient(to right, #7C14FD, transparent)'
              }}
              ></div>
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-1/2 text-left mb-8 md:mb-0">
                  <p className="mx-auto text-2xl text-black font-medium w-[50%] text-justify">
                    A perfect tutor is someone who not only has expertise in their subject but also possesses the ability to connect
                    with students, understand their individual learning needs, and guide them toward success.
                  </p>
                </div>
                <div className="md:w-1/2 flex flex-col space-y-4 ml-5 md:ml-0 md:text-center w-full items-center">
                  <p className="py-3 px-12 bg-[#32046B] text-white rounded-full font-medium hover:bg-purple-800 transition text-center">
                    One-On-One Learning
                  </p>
                  <p className="py-3 px-12 bg-[#32046B] text-white rounded-full font-medium hover:bg-purple-800 transition text-center">
                    100% verified profiles
                  </p>
                  <p className="py-3 px-6 bg-[#32046B] text-white rounded-full font-medium hover:bg-purple-800 transition text-center">
                    Get the best Online Platform
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b px-8 from-[#26A3C9] via-[#208AAA] to-[#4999B2] py-12   rounded-2xl m-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 text-center text-white font-bold auto-rows-auto "
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              }}>
              {Array.isArray(stats) && stats.length > 0 ? (
                stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <h3 className="mt-2 text-7xl mb-4 ">{stat.count ? `${stat.count}+` : "0+"}</h3>
                    <p className=" text-2xl  font-serif">{stat.label || "No Label"}</p>
                  </div>
                ))
              ) : (
                <p className="text-lg">No stats available</p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-cover bg-center min-h-screen "
          style={{
            backgroundImage: `url(${Background})`,
            transition: 'background 0.5s ease-in-out',
          }}>
          <h2 className="text-4xl font-bold text-[#32046B] text-center  mt-20 mb-6"> Our Testimonials </h2>
          <div className=" mx-auto  w-40 mt-2 mb-40" style={{
            height: '2.5px',
            background: 'linear-gradient(to right, #7C14FD, transparent)'
          }}
          ></div>
          <div className="flex items-center justify-center bg-white shadow-lg rounded-lg p-6 mb-10 max-w-xl mx-auto ">
            <div className="bg-red-500 rounded md:w-32 md:h-28  flex items-center justify-center ">
              <FaQuoteLeft className=' w-8 h-8  mt-24 mr-10' />
            </div>
            <div className="px-6 py-2  mt-10">
              <h3 className="text-xl font-bold text-[#32046B]">Student</h3>
              <p className="text-gray-600 mt-2 w-[75%] text-justify">
                Lunar Strategy helped us with our digital marketing for 4 months now
                and still helps us. Great service and highly recommended. </p>
              <p className="text-sm text-[#32046B] font-medium mt-4"> — Kimmo Hakonen, Scrum Master at Duocar AB </p>

              <div className="flex items-center justify-end mt-4 space-x-4">
                <button className="text-[#32046B] hover:opacity-75 text-xl"><FaArrowLeft /> </button>
                <button className="text-[#32046B] hover:opacity-75 text-xl"><FaArrowRight /></button>
              </div>
            </div>
          </div>
          {/* </section>
      <section className="bg-purple-50 py-16 relative"> */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center flex-wrap">
            <div className="md:w-1/2 text-center md:text-left px-14">

              <h1 className="text-4xl font-bold text-black mb-8 px-10"> LET'S KEEP IN TOUCH</h1>
              <h2 className="text-xl font-bold text-[#32046B] w-[90%]  px-6">Subscribe to our email newsletter to keep yourself updated.</h2>

              <div className="flex justify-center md:justify-start items-center space-x-4 py-10">
                <div className="relative w-80">
                  <input
                    type="text"
                    placeholder="Enter your Email...... "
                    className="px-4 py-2 border rounded-full w-full pl-12 bg-blue-900 text-white"
                  />
                  <img
                    src={Mail}
                    alt="Mail Icon"
                    className="absolute rounded-full left-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
                  />
                </div>

                <button onClick={() => navigate("/userselection")} className="border-2 border-purple-600 text-black px-6 py-2 rounded-full  hover:bg-orange-200">
                  Subscribe Now</button>
              </div>

            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
              <img
                src={BigMail}
                alt="Tutor"
                className="w-3/4 md:w-full relative z-10"
              />
            </div>
          </div>
        </section>
        <FooterMain />
      </div>
    </>
  )
}
export default Home;