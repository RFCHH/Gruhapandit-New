import React, { useState } from "react";
import MainLayout from "../Layout/Mainlayout";

const Banners = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState(null);
  const Category= "BANNERS";

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = {
      fileName,
      startDate,
      endDate,
      file,
    };
    console.log("Submitted data:", formDetails);
    setSuccessMessage("File uploaded successfully!");
    setIsDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* File Upload */}
        <div className="mb-6">
          <input
            type="file"
            className="border p-2 rounded-lg cursor-pointer"
            onClick={handleUploadClick}
          />
        </div>
        

        {/* Popup */}
        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Upload File</h2>

              <form onSubmit={handleSubmit}>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Name:
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter file name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category:
                  </label>
                  <input
                    type="text"
                    value={Category}
                    className="block w-full border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter file name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload File:
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full"
                    required
                  />
                </div>
    
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseDialog}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {successMessage && (
                <div className="mt-4 text-green-500">{successMessage}</div>
              )}
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="flex flex-wrap justify-center items-center gap-6 p-6 bg-gray-100 rounded-lg shadow-lg w-3/4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">File Name</label>
            <input
              type="text"
              placeholder="Enter file name"
              className="border p-2 rounded-lg w-60"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Start Date</label>
            <input
              type="date"
              className="border p-2 rounded-lg w-60"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">End Date</label>
            <input
              type="date"
              className="border p-2 rounded-lg w-60"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
           <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            onClick={handleSubmit}
          >
            SAVE
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            DELETE
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Banners; 