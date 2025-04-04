// import React, { useEffect, useState } from "react";
// import MainLayout from "../Layout/Mainlayout";
// import axiosInstance from "../axiosInstance";

// import { useNavigate } from "react-router-dom";


// const Subjects = () => {
//   const [tutors, setTutors] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate =useNavigate();

//   useEffect(() => {
//     const fetchTutors = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const category = "subject";
//         const page = 1;
//         const size = 10;

//         const response = await axiosInstance.get(
//           `/users/categoryList?userId=${userId}&category=${category}&page=${page}&size=${size}`
//         );

//         setTutors(response.data || []);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTutors();
//   }, []);

//   const filteredTutors = tutors.filter((tutor) =>
//     tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 px-4 sm:px-8 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//           {/* Search and Subject Request Card */}
//           <div className="bg-white px-6 py-6 rounded-lg shadow-lg col-span-1 lg:col-span-1">
//             <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-4">
//               Subject Request
//             </h1>
//             <div className="relative w-full">
//               <label htmlFor="search" className="sr-only">
//                 Search Tutors
//               </label>
//               <input
//                 id="search"
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border rounded-full px-4 py-2 w-full focus:outline-none shadow-sm text-gray-600"
//               />
//               <button
//                 className="absolute right-4 top-2.5 text-gray-400 hover:text-gray-600"
//                 aria-label="Search"
//               >
//                 🔍
//               </button>
//             </div>
//           </div>

//           {/* Tutor List Card */}
//           <div className="bg-white px-6 py-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
//             {loading ? (
//               <p className="text-center text-gray-600">Loading...</p>
//             ) : error ? (
//               <p className="text-center text-red-500">{error}</p>
//             ) : filteredTutors.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                 {filteredTutors.map((tutor, index) => (
//                   <div
//                     key={index}
//                     className="bg-blue-50 shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
//                   >
//                     <div className="mb-4">
//                       <p className="font-semibold text-gray-700 text-sm sm:text-base">
//                         Name: <span className="font-normal">{tutor.name}</span>
//                       </p>
//                       <p className="font-semibold text-gray-700 text-sm sm:text-base">
//                         Location:{" "}
//                         <span className="font-normal">{tutor.location}</span>
//                       </p>
//                       <p className="font-semibold text-gray-700 text-sm sm:text-base">
//                         Subject:{" "}
//                         <span className="font-normal">{tutor.subject}</span>
//                       </p>
//                       <p className="font-semibold text-gray-700 text-sm sm:text-base">
//                         Ratings:
//                       </p>
//                       <div className="flex">
//                         {[...Array(5)].map((_, starIndex) => (
//                           <span
//                             key={starIndex}
//                             className={`text-yellow-400 ${
//                               starIndex < tutor.ratings ? "" : "opacity-30"
//                             }`}
//                           >
//                             ⭐
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <button onClick={() => navigate(`/Request/${userId}`)}  className="bg-blue-500 text-white font-medium rounded py-2 hover:bg-blue-600">
//                       Request
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-600">No tutors found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Subjects;

import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/Mainlayout";
import axiosInstance from "../axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch,AiFillStar} from "react-icons/ai";

const Subjects = () => {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location=useLocation();
  const {category}=location.state 
  const navigate=useNavigate();
  const userId=localStorage.getItem('UserId');
  const role=localStorage.getItem('role')



  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const categorys = category ;
        const page = 0;
        const size = 10;

        const response = await axiosInstance.get(
          `/users/categoryList?userId=${userId}&category=${categorys}&page=${page}&size=${size}`
        );

        setTutors(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlerequest = async (tutors) => {
    try {
      const { userId: tutorUserId, subjects } = tutors;

      const subjectsParam = subjects.join(",");
      const response = await axiosInstance.post(`/requests/?requestBy=${userId}&requestTo=${tutorUserId}&subjects=${subjectsParam}`);

      // console.log("Request submitted successfully!");
      navigate(`/Request/${userId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit the request.");
    }
  };


  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 px-4 sm:px-8 py-6 pl-16 lg:pl-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="bg-white px-6 py-6 rounded-lg shadow-lg col-span-1 lg:col-span-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-4">
              Subject Request
            </h1>
            <div className="relative w-full">
              <label htmlFor="search" className="sr-only">
                Search Tutors
              </label>
              <div className="flex items-center border rounded-full px-4 py-2 shadow-sm text-gray-600">
                <AiOutlineSearch className="text-gray-400 mr-2" size={24} />
                <input
                  id="search"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:outline-none w-full text-gray-600"
                />
              </div>

            </div>
          </div>


          <div className="bg-white px-6 py-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredTutors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredTutors.map((tutor, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 text-sm sm:text-base">
                        Name: <span className="font-normal">{tutor.name}</span>
                      </p>
                      <p className="font-semibold text-gray-700 text-sm sm:text-base">
                        Location:{" "}
                        <span className="font-normal">{tutor.location}</span>
                      </p>
                      <p className="font-semibold text-gray-700 text-sm sm:text-base">
                        Subject:{""}
                        {/* <span className="font-normal"> */}
                        <ul className="list-disc pl-5 mt-2">
                          {tutor.subjects.map((subject, idx) => (
                            <li key={idx}>{subject}</li>
                          ))}
                        </ul>
                        {/* </span> */}
                      </p>

                      <p className="font-semibold text-gray-700 text-sm sm:text-base">
                        Ratings:
                      </p>
                      <div className="flex">
                        {[...Array(5)].map((_, starIndex) => (
                          <AiFillStar
                            key={starIndex}
                            className={`text-yellow-400 ${
                              starIndex < tutor.ratings ? "" : "opacity-30"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <button    onClick={() => handlerequest(tutor)} className="bg-blue-500 text-white font-medium rounded py-2 hover:bg-blue-600">
                      Request
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                {role === "TUTOR"
                  ? "No students found."
                  :  "No  tutors found."
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Subjects;