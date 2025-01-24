// import React, { useEffect, useState } from "react";
// import MainLayout from "../Layout/Mainlayout";
// import axiosInstance from "../axiosInstance";

// const MyFeedStudent = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("Token");
//   const userId = localStorage.getItem("UserId");

//   useEffect(() => {
//     const fetchUserData = async () => {

//       if (!token || !userId) {
//         console.log("token, userId are missing");
//         return;
//       }

//       try {
//         const page = 0; // Define the page value
//         const size = 10; // Define the size per page
//         const response = await axiosInstance.get(
//           `/reviews/getAll?&page=${page}&size=${size}`
//         );
//         setData(response.data); // Assuming response.data contains the feed data
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false); // Set loading to false even if there is an error
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <MainLayout>
//       <div className="bg-blue-50 min-h-screen pl-16 sm:pl-16 p-4">
//         {/* {/ {/ Navigation /} /} */}
//         <nav className="flex flex-col md:grid-cols-1 justify-between items-center px-4 py-4">
//           <p className="text-center mx-auto md:flex-row text-xl bg-blue-200 text-black font-semibold w-full sm:w-auto md:px-48 md:ml-16 px-6 sm:px-8 lg:px-96 lg:ml-36 py-2 mb-10 rounded-tr-xl rounded-bl-xl">
//             Reviews
//           </p>

//         </nav>


//         {/* {/ {/ Main Content /} /} */}
//         <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
//             {loading ? (
//               <p>Loading...</p>
//             ) : data.length === 0 ? (
//               <p>No data found</p> // Display message when no data is found
//             ) : (
//               data.map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-3  bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
//                 >
//                   <p className="text-sm">
//                     <span className="font-semibold">ID:</span> {item.id}
//                   </p>
//                   <p className="text-sm">
//                     <span className="font-semibold">Name:</span> {item.reviewerName}
//                   </p>
//                   <p className="text-sm">
//                     <span className="font-semibold">ReviewTo:</span> {item.reviewTo}
//                   </p>
//                   <p className="text-sm">
//                     <span className="font-semibold">Subject:</span> {item.subject}
//                   </p>
//                   <p className="text-sm">
//                     <span className="font-semibold">Comments:</span> {item.comments}
//                   </p>
//                   <p className="text-sm">
//                     <span className="font-semibold">Rating:</span> {item.rating}
//                   </p>
//                   <p className="text-sm">
//                     <span className="font-semibold">Active :</span> {item.active}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>


//   );
// };

// export default MyFeedStudent;


import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/Mainlayout";
import axiosInstance from "../axiosInstance";
import { MdStarOutline, MdStarRate } from "react-icons/md";


export const renderStars = (rating) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span key={i} className="text-yellow-500">
        {i <= filledStars ? <MdStarRate /> : <MdStarOutline />}
      </span>
    );
  }

  return <div className="flex">{stars}</div>;
};
const Review = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeStatus, setActiveStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || !userId) {
        console.log("token, userId are missing");
        return;
      }

      try {
        const page = currentPage;
        const size = 6;
        const response = await axiosInstance.get(
          `/reviews/getAll?page=${page}&size=${size}`
        );
        setData(response.data);
        setTotalPages(response.data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentPage]);



  const handleReviewClick = (item) => {
    setSelectedReview(item);
    setActiveStatus(item.active);
  };

  const closePopup = () => {
    setSelectedReview(null);
  };

  const handleActiveChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedReview) return;

    try {
      const response = await axiosInstance.patch(
        `/reviews/updateStatus?reviewId=${selectedReview.id}&isActive=${activeStatus}`
      );

      if (activeStatus === "true") {
        alert("The review has been successfully activated.");
      } else {
        alert("The review has been successfully deactivated.");
      }
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedReview.id ? { ...item, active: activeStatus } : item
        )
      );
      closePopup();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <MainLayout>
      <div className="bg-blue-50 min-h-screen p-4">
        <h1 className="text-center mx-auto md:flex-row text-xl bg-blue-200 text-black font-semibold w-full 
        sm:w-auto md:px-48 md:ml-16 px-6 sm:px-8 lg:px-96 lg:ml-36 py-2 mb-10 rounded-tr-xl rounded-bl-xl">
          Reviews
        </h1>

        <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : data.length === 0 ? (
              <p >No data found</p>
            ) : (
              data.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleReviewClick(item)}
                  className="p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                >
                  <p className="text-sm">
                    <span className="font-semibold">ID:</span> {item.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Name:</span> {item.reviewerName}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">ReviewTo:</span> {item.reviewTo}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Subject:</span> {item.subject}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Comments:</span> {item.comments}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Rating:</span> {renderStars(item.rating)}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Active:</span>{" "}
                    <span
                      style={{
                        color: item.active ? "green" : "red",

                        fontWeight: "bold",
                      }}
                    >
                      {item.active ? "True" : "False"}
                    </span>
                  </p>



                </div>
              ))
            )}

          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Review Details</h2>
              <p><span className="font-semibold">ID:</span> {selectedReview.id}</p>
              <p><span className="font-semibold">Name:</span> {selectedReview.reviewerName}</p>
              <p><span className="font-semibold">ReviewTo:</span> {selectedReview.reviewTo}</p>
              <p><span className="font-semibold">Subject:</span> {selectedReview.subject}</p>
              <p><span className="font-semibold">Comments:</span> {selectedReview.comments}</p>
              <p><span className="font-semibold">Rating:</span> {renderStars(selectedReview.rating)}</p>
              <div className="mt-2">
                <label className="block mb-2 font-semibold">Active:</label>
                <select
                  value={activeStatus}
                  onChange={handleActiveChange}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div
                className="mt-2 font-semibold"
                style={{
                  color: activeStatus === "true" ? "green" : "red",
                }}
              >
                {activeStatus === "true" ? "Active" : "Inactive"}
              </div>

              <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2 mr-2" onClick={handleSubmit}>
                Submit
              </button>
              <button className="mt-2 bg-gray-300 text-black rounded px-4 py-2" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Review;