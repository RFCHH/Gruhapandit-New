

// import React, { useState, useEffect } from "react";
// import axiosInstance from "../axiosInstance";
// import MainLayout from "../Layout/Mainlayout";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaLessThan } from 'react-icons/fa';


// const TutorTable = () => {
//   const [activeTab, setActiveTab] = useState("Normal User");
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//  const navigate=useNavigate();
//   const location = useLocation();
//   const { role } = location.state ; 

//   useEffect(() => {
//     const fetchData = async (tab) => {
//       setLoading(true);
//       setError(null);

//       try {
//         const endpoint =
//           tab === "Normal User"
//             ? `/users/regularUsers?type=${role}&page=0&size=10` 
//             : `/users/premiumUsers?type=${role}&page=0&size=10`; 

//         const response = await axiosInstance.get(endpoint);
//         setTableData(response.data);
//       } catch (err) {
//         setError("Failed to fetch data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData(activeTab);
//   }, [activeTab]); 

//   const handlebackclick = ((event) => {
//     event.preventDefault();
//     navigate(-1);
// })

//   return (
//     <>
//     <MainLayout>
//       <div className="flex items-center justify-center px-2 py-2  border border-gray-800 rounded-md w-40 ml-14 mb-5 mt-5">
//                 <FaLessThan className="text-black mr-2" />
//                 <button onClick={handlebackclick}><span className="font-semibold text-black">Previous Page</span></button>
//             </div>
//       <div className="min-h-screen bg-blue-50 p-8">
//         <div className="flex">
//           <div className="w-1/4 ml-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <button
//                 className={`block w-full text-left px-4 py-2 mb-2 rounded-lg ${
//                   activeTab === "Normal User"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab("Normal User")}
//               >
//                 Normal User
//               </button>
//               <button
//                 className={`block w-full text-left px-4 py-2 rounded-lg ${
//                   activeTab === "Subscription"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab("Subscription")}
//               >
//                 Subscription
//               </button>
//             </div>
//           </div>

//           <div className="w-3/4 ml-6">
//             <div className="bg-white shadow-lg rounded-lg p-4">
//               {loading ? (
//                 <p className="text-center text-gray-500">Loading...</p>
//               ) : error ? (
//                 <p className="text-center text-red-500">{error}</p>
//               ) : (
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
//                         Tutor Name
//                       </th>
//                       <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
//                         Email
//                       </th>
//                       <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
//                         User ID
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableData.length > 0 ? (
//                       tableData.map((data, index) => (
//                         <tr key={index} className="hover:bg-gray-50">
//                           <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
//                             {data.name}
//                           </td>
//                           <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
//                             {data.emailId}
//                           </td>
//                           <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
//                             {data.userId}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="3"
//                           className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500"
//                         >
//                           No data available.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//     </>
//   );
// };

// export default TutorTable;


import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import MainLayout from "../Layout/Mainlayout";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLessThan,FaSearch } from "react-icons/fa";

const TutorTable = () => {
  const [activeTab, setActiveTab] = useState("Normal User");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || {};

  useEffect(() => {
    const fetchData = async (tab) => {
      setLoading(true);
      setError(null);

      try {
        const endpoint =
          tab === "Normal User"
            ? `/users/regularUsers?type=${role}&page=0&size=10`
            : `/users/premiumUsers?type=${role}&page=0&size=10`;

        const response = await axiosInstance.get(endpoint);
        setTableData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData(activeTab);
  }, [activeTab, role]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = tableData.filter(
      (data) =>
        data.name.toLowerCase().includes(query.toLowerCase()) ||
        data.emailId.toLowerCase().includes(query.toLowerCase()) ||
        data.userId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleBackClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center px-2 py-2 border-2 border-gray-800 rounded-md w-40 ml-14 mb-5 mt-5">
        <FaLessThan className="text-black mr-2" />
        <button onClick={handleBackClick}>
          <span className="font-semibold text-black">Previous Page</span>
        </button>
      </div>
      <div className="min-h-screen bg-blue-50 p-8">
        <div className="flex">
          <div className="w-1/4 ml-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <button
                className={`block w-full text-left px-4 py-2 mb-2 rounded-lg ${
                  activeTab === "Normal User"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("Normal User")}
              >
                Normal User
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "Subscription"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("Subscription")}
              >
                Subscription
              </button>
            </div>
          </div>

          <div className="w-3/4 ml-6">
          <div className="relative mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FaSearch className="text-gray-400" />
      </span>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 pl-10 border rounded-md bg-white shadow-sm"
      />
    </div> 

            <div className="bg-white shadow-lg rounded-lg p-4">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <div className="overflow-y-auto max-h-[400px]">
                  {" "}
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                          Tutor Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                          Email
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                          User ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((data, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                              {data.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                              {data.emailId}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                              {data.userId}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500"
                          >
                            No data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TutorTable;
