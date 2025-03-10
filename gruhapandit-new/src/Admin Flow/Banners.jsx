import React, { useEffect, useState,useRef } from "react";
import axiosInstance from "../axiosInstance";
import {ChevronLeft} from 'lucide-react';
import { useNavigate } from "react-router-dom";

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
  const [editingBannerId, setEditingBannerId] = useState(null); // Stores banner ID when editing

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/banners/getAll`);
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData({ ...formdata, files: selectedFiles });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!editingBannerId && formdata.files.length === 0) {
      errors.files = "File is required";
      isValid = false;
    }
    if (!formdata.fileName.trim()) {
      errors.fileName = "File name is required";
      isValid = false;
    }
    if (!formdata.startDate.trim()) {
      errors.startDate = "Start date is required";
      isValid = false;
    }
    if (!formdata.endDate.trim()) {
      errors.endDate = "End date is required";
      isValid = false;
    }
    setError(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const token = localStorage.getItem("Token");
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      let response;
      if (editingBannerId) {
        response = await axiosInstance.patch(`/banners/update/${editingBannerId}`, {    
          fileName: formdata.fileName,
          startDate: formdata.startDate,
          endDate: formdata.endDate,
        });
        alert("successfully editted")
      } else {
       
        const formDataToSend = new FormData();
        formdata.files.forEach((file) => {
          formDataToSend.append("file", file);
        });
  
        response = await axiosInstance.post(
          `/banners/create?fileName=${encodeURIComponent(formdata.fileName)}&startDate=${encodeURIComponent(formdata.startDate)}&endDate=${encodeURIComponent(formdata.endDate)}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
  
      console.log("Response:", response.data);
  
      
      setFormData({
        files: [],
        fileName: "",
        startDate: "",
        endDate: "",
        category: "BANNERS_IMAGE",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setEditingBannerId(null);
      alert("successfully created banner");
      setError({});
      fetchBanners();
    } catch (error) {
      console.error("Error submitting banner:", error.response?.data || error.message);
    }
  };

  const fileInputRef = useRef(null);

  
  const handleEdit = (banner) => {
    setFormData({
      files: [], 
      fileName: banner.fileName,
      startDate: banner.startDate,
      endDate: banner.endDate,
      category: "BANNERS_IMAGE",
    });
    setEditingBannerId(banner.id); 
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/banners/${id}`);
      setBanners(banners.filter((banner) => banner.id !== id)); 
      alert("successfully deleted!");
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };
  const navigate=useNavigate();

  return (
    <>
  <h1 className="flex items-center gap-4 font-semibold text-2xl mt-7 sm:ml-16 ml-4">
    <button onClick={() => navigate("/Registration")} className="flex justify-center items-center">
      <ChevronLeft size={24} />
    </button>
    Banners
  </h1>

  <div className="max-w-full sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-6 sm:mt-10 w-full">
    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 text-center">{formdata.category}</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {!editingBannerId && (
        <div>
          <label className="block text-gray-600 font-medium text-sm sm:text-base">Files:</label>
          <input
            type="file"
            name="files"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="w-full border p-2 rounded-md text-sm sm:text-base focus:ring focus:ring-blue-300"
          />
          {error.files && <p className="text-red-500 text-xs">{error.files}</p>}
        </div>
      )}

      <div>
        <label className="block text-gray-600 font-medium text-sm sm:text-base">File Name:</label>
        <input
          type="text"
          name="fileName"
          value={formdata.fileName}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm sm:text-base"
        />
        {error.fileName && <p className="text-red-500 text-xs">{error.fileName}</p>}
      </div>

      <div>
        <label className="block text-gray-600 font-medium text-sm sm:text-base">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formdata.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm sm:text-base"
        />
        {error.startDate && <p className="text-red-500 text-xs">{error.startDate}</p>}
      </div>

      <div>
        <label className="block text-gray-600 font-medium text-sm sm:text-base">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formdata.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm sm:text-base"
        />
        {error.endDate && <p className="text-red-500 text-xs">{error.endDate}</p>}
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-between mt-4 gap-2">
        <button type="submit" className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base">
          {editingBannerId ? "Update" : "Save"}
        </button>
      </div>
    </form>
  </div>

  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mt-6 text-center sm:text-left sm:ml-16">
    Existing Banners
  </h3>

  {loading ? (
    <p className="text-center">Loading...</p>
  ) : (
    <ul className="mt-4 flex flex-col sm:ml-16 px-3">
      {banners.map((banner) => (
        <li key={banner.id} className="grid grid-cols-1 sm:grid-cols-3 items-center border-b py-2 gap-2 text-sm sm:text-base">
          <span className="flex-1 truncate">📁 {banner.fileName}</span>
          <span className="flex-1 truncate">📅 {banner.startDate} - {banner.endDate}</span>

          <div className="flex gap-2">
            <button onClick={() => handleEdit(banner)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 text-xs sm:text-sm">
              Edit
            </button>
            <button onClick={() => handleDelete(banner.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-xs sm:text-sm">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</>

  );
};

export default Banners;






// import React, { useEffect, useState } from "react";
// import axiosInstance from "../axiosInstance";
// import MainLayout from "../Layout/Mainlayout";

// const Banners = () => {
//   const [formdata, setFormData] = useState({
//     files: [],
//     fileName: "",
//     startDate: "",
//     endDate: "",
//     category: "BANNERS_IMAGE",
//   });

//   const [error, setError] = useState({});
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBanner, setSelectedBanner] = useState(null);
//   const [isEditable, setIsEditable] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formdata, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFormData({ ...formdata, files: selectedFiles });
//   };

//   const validateForm = () => {
//     let error = {};
//     let isValid = true;

//     // Show error for files only when creating a new banner
//     if (!selectedBanner && formdata.files.length === 0) {
//       error.files = "File is required when creating a new banner";
//       isValid = false;
//     }
//     if (!formdata.fileName.trim()) {
//       error.fileName = "File name is required";
//       isValid = false;
//     }
//     if (!formdata.startDate.trim()) {
//       error.startDate = "Start date is required";
//       isValid = false;
//     }
//     if (!formdata.endDate.trim()) {
//       error.endDate = "End date is required";
//       isValid = false;
//     }
//     setError(error);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }

//     const token = localStorage.getItem("Token");
//     if (!token) {
//       console.log("Token not found");
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       if (!selectedBanner) {
//         formdata.files.forEach((file) => {
//           formDataToSend.append("file", file);
//         });
//       }

//       const url = selectedBanner
//         ? `https://tution-application.onrender.com/tuition-application/banners/update/${selectedBanner.id}`
//         : `/banners/create?fileName=${encodeURIComponent(formdata.fileName)}&startDate=${encodeURIComponent(formdata.startDate)}&endDate=${encodeURIComponent(formdata.endDate)}`;

//       const method = selectedBanner ? "patch" : "post";
//       await axiosInstance[method](url, selectedBanner ? {
//         fileName: formdata.fileName,
//         startDate: formdata.startDate,
//         endDate: formdata.endDate,
//       } : formDataToSend, {
//         headers: {
//           "Content-Type": selectedBanner ? "application/json" : "multipart/form-data",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       setFormData({
//         files: [],
//         fileName: "",
//         startDate: "",
//         endDate: "",
//         category: "BANNERS_IMAGE",
//       });
//       setError({});
//       setSelectedBanner(null);
//       setIsEditable(false); // Reset edit mode
//       fetchBanners();
//     } catch (error) {
//       console.error("Error submitting banner:", error.response?.data || error.message);
//     }
//   };

//   const fetchBanners = async () => {
//     try {
//       const response = await axiosInstance.get(`/banners/getAll`);
//       setBanners(response.data);
//     } catch (error) {
//       console.error("Error fetching details", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const handleEdit = (banner) => {
//     setSelectedBanner(banner);
//     setFormData({
//       files: [],
//       fileName: banner.fileName,
//       startDate: banner.startDate,
//       endDate: banner.endDate,
//       category: "BANNERS_IMAGE",
//     });
//     setIsEditable(true); // Enable editing
//   };

//   return (
//     <>
//       <MainLayout>
//         <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">{formdata.category}</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* File Upload Only When Creating a New Banner */}
//             {!selectedBanner && (
//               <div>
//                 <label className="block text-gray-600 font-medium">Files:</label>
//                 <input
//                   type="file"
//                   id="files"
//                   name="files"
//                   onChange={handleFileChange}
//                   multiple
//                   className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
//                 />
//                 {error.files && <p className="text-red-500 text-xs">{error.files}</p>}
//               </div>
//             )}

//             <div>
//               <label className="block text-gray-600 font-medium">File Name:</label>
//               <input
//                 type="text"
//                 name="fileName"
//                 value={formdata.fileName}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded-md"
//                 readOnly={!isEditable}
//               />
//               {error.fileName && <p className="text-red-500 text-xs">{error.fileName}</p>}
//             </div>

//             <div>
//               <label className="block text-gray-600 font-medium">Start Date:</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formdata.startDate}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
//                 readOnly={!isEditable}
//               />
//               {error.startDate && <p className="text-red-500 text-xs">{error.startDate}</p>}
//             </div>

//             <div>
//               <label className="block text-gray-600 font-medium">End Date:</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formdata.endDate}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
//                 readOnly={!isEditable}
//               />
//               {error.endDate && <p className="text-red-500 text-xs">{error.endDate}</p>}
//             </div>

//             <div className="flex justify-between mt-4">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
//                 onClick={() => setIsEditable(!isEditable)} // Toggle edit mode
//               >
//                 {isEditable ? "Cancel" : "Edit"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {loading ? (
//           <p className="text-center text-lg font-semibold">Loading banners...</p>
//         ) : (
//           banners.map((banner, index) => (
//             <div key={index} className="p-6 border-b ml-24 mb-4 rounded-lg shadow-md">
//               <h1 className="text-xl font-semibold mb-4">Banner Details</h1>
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex flex-col">
//                   <label className="text-sm font-medium">File Name</label>
//                   <input 
//                     value={banner.fileName} 
//                     className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                     readOnly
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="text-sm font-medium">Start Date</label>
//                   <input 
//                     value={banner.startDate} 
//                     className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                     readOnly
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="text-sm font-medium">End Date</label>
//                   <input 
//                     value={banner.endDate} 
//                     className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                     readOnly
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
//                   onClick={() => handleEdit(banner)} // Trigger edit
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </MainLayout>
//     </>
//   );
// };

// export default Banners;


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
