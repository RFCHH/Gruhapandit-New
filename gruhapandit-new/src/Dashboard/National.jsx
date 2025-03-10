import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import Id from "./../assets/ID.png";
import MainLayout from "../Layout/Mainlayout";
import DialogueBox from "./DialogueBox";
import axiosInstance from "../axiosInstance";
import { motion } from "framer-motion";
const National = () => {
  const [fileName, setFileName] = useState("");
  const [nationalId, setNationalId] = useState(""); // State to hold fetched data
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId = localStorage.getItem("UserId");
  const [fileDelete, setFileDelete] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");  // State for success message
  const [messageType, setMessageType] = useState("");

  const showSuccessMessage = (message, type = "success") => {
    setSuccessMessage(message);
    setMessageType(type);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUploadClick = () => {
    if (fileName) {
      showSuccessMessage("A file is already uploaded.Please delete the existing file if you want to upload a new one.", "error");
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const fetchNational = async () => {
    const token = localStorage.getItem("Token");
    const category = "NATIONAL_ID";

    try {
      const response = await axiosInstance.get(
        `/documents/get-files-list?userId=${userId}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const file = response.data[0];
        setFileName(file.fileName);
        setNationalId(file.id);
      } else {
        console.warn("No files found.");
        setFileName("");
        setNationalId("");
      }
    } catch (error) {
      console.error("Error fetching national ID:", error);
    }
  };

  useEffect(() => {
    fetchNational();
  }, []);

  const handleDeleteFile = async () => {
    const token = localStorage.getItem("Token");

    if (!nationalId) {
      showSuccessMessage("No file selected for deletion.", "error");
      return;
    }

    try {
      // console.log("Deleting file with ID:", nationalId);

      const response = await axiosInstance.delete(
        `/documents/${nationalId}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFileName("");
        setNationalId("");
        setFileDelete(true);
        setTimeout(() => {
          setFileDelete(false);
        }, 1000);
        showSuccessMessage("File deleted successfully!","error");

      } else {
        console.error("Unexpected response status:", response.status);
        showSuccessMessage(`Failed to delete file: Status code ${response.status}`, "error");
      }
    } catch (error) {
      console.error(
        "Error deleting file:",
        error.response?.data || error.message
      );
      showSuccessMessage(
        `Failed to delete the file: ${
          error.response?.data?.message || "An unknown error occurred."
        }`,
        "error"
      );
    }
  };
  return (
    <>
     <MainLayout>
  <div className="flex items-center pl-16 pr-4 pb-2 pt-20 justify-center min-h-screen bg-blue-50 -mt-16 lg:p-4">
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center bg-purple-200 p-6 w-full lg:w-1/2">
        <img
          src={Id}
          alt="National ID"
          className="w-48 h-auto md:w-80 lg:w-96 mb-4"
        />
      </div>

      {/* Right Section */}
      <div className="p-4 md:p-8 max-w-md w-full lg:w-1/2">
        <h2 className="text-lg md:text-xl text-center font-semibold mb-4">
          Upload Your National ID
        </h2>
        <div
          className="border-2 shadow-lg border-gray-300 rounded-lg p-6 md:p-10 text-center cursor-pointer flex flex-col items-center justify-center mb-5 mt-10 md:mt-20"
          onDragOver={handleDragOver}
          onClick={handleUploadClick}
          onDrop={handleDrop}
          role="button"
          aria-label="Drop area for file upload"
        >
          <p className="text-gray-400 mb-2 text-sm md:text-base">
            {fileName || "Drop your file here"}
          </p>
          <FaCloudUploadAlt
            type="file"
            onChange={handleFileChange}
            className="text-blue-500 text-4xl md:text-6xl cursor-pointer"
            id="fileInput"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4">
          <div className="w-full md:w-2/3">
            <label className="block text-gray-700 mb-2 text-sm md:text-base">
              File Name:
            </label>
            <input
              type="text"
              readOnly
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="border-2 border-gray-400 p-2 rounded-md w-full"
            />
          </div>

          {fileName && (
            <button
              className="flex items-center bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 w-full md:w-auto"
              onClick={handleDeleteFile}
            >
              <FaTrashAlt className="mr-2" />
              
            </button>
          )}
        </div>
      </div>
    </div>

    {successMessage && (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-10 left-1/3 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold ${
          messageType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {successMessage}
      </motion.div>
    )}

    {/* Dialog Box */}
    {isDialogOpen && (
      <DialogueBox
        userId={userId}
        category="NATIONAL_ID"
        onClose={handleCloseDialog}
        onSubmit={(data) => {
          console.log("Submitted data:", data);
          fetchNational();
        }}
      />
    )}
  </div>
</MainLayout>

    </>
  );
};

export default National;
