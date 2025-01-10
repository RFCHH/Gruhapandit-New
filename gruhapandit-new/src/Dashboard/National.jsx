import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Id from './../assets/ID.png';
import MainLayout from '../Layout/Mainlayout';
import DialogueBox from "./DialogueBox";
import axiosInstance from '../axiosInstance';

const National = () => {
    const [fileName, setFileName] = useState('');
    const [nationalId, setNationalId] = useState(''); // State to hold fetched data
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const userId = localStorage.getItem("UserId");

   
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

    useEffect(() => {
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
                    
                    setFileName(response.data[0].fileName); 
                }
            } catch (error) {
                console.error("Error fetching national ID:", error);
            }
        };

        fetchNational();
    }, []);

    return (
        <>
           <MainLayout>
  <div className="flex items-center pl-16 pr-4 pb-2 pt-20 justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 -mt-16 lg:p-4">
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
          onDrop={handleDrop}
          role="button"
          aria-label="Drag and drop area for file upload"
        >
          <p className="text-gray-400 mb-2 text-sm md:text-base">
            {fileName || "Drag & drop your file here"}
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <FaCloudUploadAlt className="text-blue-500 text-4xl md:text-6xl cursor-pointer" />
          </label>
        </div>
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
    </div>

    {/* Dialog Box */}
    {isDialogOpen && (
      <DialogueBox
        userId={userId}
        category="NATIONAL_ID"
        onClose={handleCloseDialog}
        onSubmit={(data) => console.log("Submitted data:", data)}
      />
    )}
  </div>
</MainLayout>

        </>
    );
};

export default National;
