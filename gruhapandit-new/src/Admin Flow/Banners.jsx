import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import MainLayout from "../Layout/Mainlayout";

const Banners = () => {
  const [formdata, setFormData] = useState({
    files: [],
    fileName: "",
    startDate: "",
    endDate: "",
    category: "BANNERS_IMAGE",
  });

  const [error, setError] = useState({});
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData({ ...formdata, files: selectedFiles });
  };

  const validateForm = () => {
    let error = {};
    let isValid = true;

    if (formdata.files.length === 0) {
      error.files = "File is required";
      isValid = false;
    }
    if (!formdata.fileName.trim()) {
      error.fileName = "File name is required";
      isValid = false;
    }
    if (!formdata.startDate.trim()) {
      error.startDate = "Start date is required";
      isValid = false;
    }
    if (!formdata.endDate.trim()) {
      error.endDate = "End date is required";
      isValid = false;
    }
    setError(error);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("Token");
    if (!token) {
      console.log("Token not found");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formdata.files.forEach((file) => {
        formDataToSend.append("file", file);
      });

      const url = `/banners/create?fileName=${encodeURIComponent(formdata.fileName)}&startDate=${encodeURIComponent(formdata.startDate)}&endDate=${encodeURIComponent(formdata.endDate)}`;

      const response = await axiosInstance.post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Submitted data:", response.data);
      if (response.data?.id) {
        sessionStorage.setItem("bannerId", response.data.id);
      }
      setFormData({
        files: [],
        fileName: "",
        startDate: "",
        endDate: "",
        category: "BANNERS_IMAGE",
      });
     
      setError({});
      fetchBanners(); 
    } catch (error) {
      console.error("Error submitting banner:", error.response?.data || error.message);
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get(`/banners/getAll`);
      setBanners(response.data); 
    } catch (error) {
      console.error("Error fetching details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">{formdata.category}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Files:</label>
              <input
                type="file"
                id="files"
                name="files"
                onChange={handleFileChange}
                multiple
                className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
              />
              {error.files && <p className="text-red-500 text-xs">{error.files}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium">File Name:</label>
              <input
                type="text"
                name="fileName"
                value={formdata.fileName}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              {error.fileName && <p className="text-red-500 text-xs">{error.fileName}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formdata.startDate}
                onChange={handleChange}
                className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
              />
              {error.startDate && <p className="text-red-500 text-xs">{error.startDate}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formdata.endDate}
                onChange={handleChange}
                className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
              />
              {error.endDate && <p className="text-red-500 text-xs">{error.endDate}</p>}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Delete
              </button>
            </div>
          </form>
        </div>

        {loading ? (
  <p className="text-center text-lg font-semibold">Loading banners...</p>
) : (
  banners.map((banner, index) => (
    <div key={index} className="p-6 border-b ml-24 mb-4 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Banner Details</h1>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">File Name</label>
          <input 
            value={banner.fileName} 
            readOnly 
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Start Date</label>
          <input 
            value={banner.startDate} 
            readOnly 
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">End Date</label>
          <input 
            value={banner.endDate} 
            readOnly 
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
      </div>
    </div>
  ))
)}

      </MainLayout>
    </>
  );
};

export default Banners;



// import React, { useState } from "react";
// import axiosInstance from "../axiosInstance";
// import MainLayout from "../Layout/Mainlayout";

// const Banners = () => {
//   const [formdata, setFormData] = useState({
//     file: null,
//     fileName: "",
//     startDate: "",
//     endDate: "",
//     category: "BANNERS_IMAGE",
//   });

//   const [error, setError] = useState({
//     file: "",
//     fileName: "",
//     startDate: "",
//     endDate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formdata, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files); // Convert FileList to array
//     setFormData({ ...formdata, files: selectedFiles });
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem("Token");
//     if (!token) {
//       console.log("Token not found");
//       return;
//     }
  
//     try {
//       const formDataToSend = new FormData();
  
//       // Append file(s) to FormData
//       if (Array.isArray(formdata.file)) {
//         formdata.file.forEach((file) => {
//           formDataToSend.append("file", file);
//         });
//       } else if (formdata.file) {
//         formDataToSend.append("file", formdata.file);
//       }
    
//       // Construct the URL with query parameters
//       const url = `/banners/create?fileName=${encodeURIComponent(formdata.fileName)}&startDate=${encodeURIComponent(formdata.startDate)}&endDate=${encodeURIComponent(formdata.endDate)}`;
  
//       const response = await axiosInstance.post(url, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
    
//       console.log("Submitted data:", response.data);
  
      
//       setFormData({
//         file: null,
//         fileName: "",
//         startDate: "",
//         endDate: "",
//         category: "BANNERS_IMAGE",
//       });
  
//     } catch (error) {
//       console.error("Error submitting banner:", error.response?.data || error.message);
      
//     }
//   };

//   return (
//     <MainLayout>
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">{formdata.category}</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-600 font-medium">File:</label>
//           <input
//             type="file"
//             id="files"
//             name="file"
//             onChange={handleFileChange}
//             className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
//           />
//           {error.file && <p className="text-red-500 text-xs">{error.file}</p>}
//         </div>

//         <div>
//           <label className="block text-gray-600 font-medium">File Name:</label>
//           <input
//             type="text"
//             name="fileName"
//             value={formdata.fileName}
//             disabled
//             className="w-full border p-2 rounded-md bg-gray-200"
//           />
//         </div>

//         {/* Start Date */}
//         <div>
//           <label className="block text-gray-600 font-medium">Start Date:</label>
//           <input
//             type="date"
//             name="startDate"
//             value={formdata.startDate}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
//           />
//           {error.startDate && <p className="text-red-500 text-xs">{error.startDate}</p>}
//         </div>

//         {/* End Date */}
//         <div>
//           <label className="block text-gray-600 font-medium">End Date:</label>
//           <input
//             type="date"
//             name="endDate"
//             value={formdata.endDate}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
//           />
//           {error.endDate && <p className="text-red-500 text-xs">{error.endDate}</p>}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
//           >
//             Delete
//           </button>
//         </div>
//       </form>
//     </div>
//     </MainLayout>
//   );
// };

// export default Banners;
