import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import Id from "./../assets/ID.png";
import MainLayout from "../Layout/Mainlayout";
import DialogueBox from "./DialogueBox";
import axiosInstance from "../axiosInstance";

const National = () => {
  const [fileName, setFileName] = useState("");
  const [nationalId, setNationalId] = useState(""); // State to hold fetched data
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId = localStorage.getItem("UserId");
  const [fileDelete, setFileDelete] = useState(false);

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
    setIsDialogOpen(true);
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
      alert("No file selected for deletion.");
      return;
    }

    try {
      console.log("Deleting file with ID:", nationalId);

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
      } else {
        console.error("Unexpected response status:", response.status);
        alert(`Failed to delete file: Status code ${response.status}`);
      }
    } catch (error) {
      console.error(
        "Error deleting file:",
        error.response?.data || error.message
      );
      alert(
        `Failed to delete the file: ${
          error.response?.data?.message || "An unknown error occurred."
        }`
      );
    }
  };
  return (
    <>
      <MainLayout>
        <div className="flex items-center pl-16 pr-4 pb-2 pt-20 justify-center min-h-screen bg-blue-50 -mt-16 lg:p-4">
          <div className="flex flex-col lg:  md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
            {/* Left Section */}
            <div className="flex flex-col items-center justify-center bg-purple-200 p-6 w-full md:w-1/2">
              <img
                src={Id}
                alt="National ID"
                className="w-48 h-auto md:w-96 mb-4"
              />
            </div>

            {/* Right Section */}
            <div className="p-4 md:p-8 max-w-md w-full md:w-1/2">
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
                {/* <label htmlFor="fileInput">
            <FaCloudUploadAlt className="text-blue-500 text-4xl md:text-6xl cursor-pointer" />
          </label> */}
              </div>
              <div className="flex items-center space-x-2">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">
                  File Name:
                </label>
                <input
                  type="text"
                  readOnly
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="border-2 border-gray-400 p-2 rounded-md w-"
                />
                {fileName && (
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600"
                    onClick={handleDeleteFile}
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete File
                  </button>
                )}

                {fileDelete && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                      <h1 className="text-lg font-semibold text-red-500">
                        File Deleted Successfully!
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

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
