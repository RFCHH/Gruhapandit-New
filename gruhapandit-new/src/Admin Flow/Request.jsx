// import React, { useState, useEffect } from "react";
// import MainLayout from "../Layout/Mainlayout";
// import axiosInstance from "../axiosInstance";

// const RequestApproval = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(`/relations/get?page=0&size=10`); 
//         const fetchedData = response.data;

//         if (Array.isArray(fetchedData)) {
//           setData(fetchedData);
//         } else {
//           setData([]);
//           setError("No data available.");
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <MainLayout>
//       <div className="bg-gray-100 min-h-screen py-4 px-4 sm:px-8">
//         <div className="bg-white rounded-lg shadow-lg p-4 max-w-6xl mx-auto">
//           <h1 className="text-xl font-bold mb-4">Request Table</h1>
//           <div className="overflow-x-auto">
//             <table className="table-auto w-full border-collapse border border-black">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th
//                     className="border border-black px-4 py-2 text-center"
//                     scope="col"
//                   >
//                     Request To
//                   </th>
//                   <th
//                     className="border border-black px-4 py-2 text-center"
//                     scope="col"
//                   >
//                     Request By
//                   </th>
//                   <th
//                     className="border border-black px-4 py-2 text-center"
//                     scope="col"
//                   >
//                     Created At
//                   </th>
//                   <th
//                     className="border border-black px-4 py-2 text-center"
//                     scope="col"
//                   >
//                     Subject
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan="4"
//                       className="border border-gray-300 px-4 py-2 text-center text-gray-400"
//                     >
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : error ? (
//                   <tr>
//                     <td
//                       colSpan="4"
//                       className="border border-gray-300 px-4 py-2 text-center"
//                     >
//                       {error}
//                     </td>
//                   </tr>
//                 ) : data.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="4"
//                       className="border border-gray-300 px-4 py-2 text-center text-gray-400"
//                     >
//                       No requests available.
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((row, index) => (
//                     <tr
//                       key={index}
//                       className={`${
//                         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                       } hover:bg-blue-100 transition duration-150`}
//                     >
//                       <td className="border border-gray-300  text-center px-4 py-2">
//                         {row.requestTo || "N/A"}
//                       </td>
//                       <td className="border border-gray-300  text-center px-4 py-2">
//                         {row.requestBy || "N/A"}
//                       </td>
//                       <td className="border border-gray-300  text-center px-4 py-2">
//                         {row.createdAt || "N/A"}
//                       </td>
//                       <td className="border border-gray-300  text-center px-4 py-2">
//                         {row.subjects || "N/A"}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default RequestApproval;

import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/Mainlayout";
import axiosInstance from "../axiosInstance";

const RequestApproval = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/relations/get?page=${currentPage}&size=${itemsPerPage}`
        );
        const fetchedData = response.data;

        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          setData([]);
          setError("No data available.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Re-run effect whenever currentPage changes.

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen py-4 px-4 sm:px-8">
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-6xl mx-auto">
          <h1 className="text-lg sm:text-xl font-bold mb-4">Request Table</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-black text-xs sm:text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-black px-2 sm:px-4 py-2 text-center">Request To</th>
                  <th className="border border-black px-2 sm:px-4 py-2 text-center">Request By</th>
                  <th className="border border-black px-2 sm:px-4 py-2 text-center">Created At</th>
                  <th className="border border-black px-2 sm:px-4 py-2 text-center">Subject</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 px-2 sm:px-4 py-2 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 px-2 sm:px-4 py-2 text-center text-red-500"
                    >
                      {error}
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 px-2 sm:px-4 py-2 text-center text-gray-400"
                    >
                      No requests available.
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-blue-100 transition duration-150`}
                    >
                      <td className="border border-gray-300 text-center px-2 sm:px-4 py-2">
                        {row.requestTo || "N/A"}
                      </td>
                      <td className="border border-gray-300 text-center px-2 sm:px-4 py-2">
                        {row.requestBy || "N/A"}
                      </td>
                      <td className="border border-gray-300 text-center px-2 sm:px-4 py-2">
                        {row.createdAt || "N/A"}
                      </td>
                      <td className="border border-gray-300 text-center px-2 sm:px-4 py-2">
                        {row.subjects || "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="bg-blue-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={data.length < itemsPerPage} // Disable if no more data to load
              className="bg-blue-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RequestApproval;
