import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../axiosInstance";
import { motion } from "framer-motion";

const DialogueBox = ({ onClose, onSubmit, category, userId }) => {
  const [formData, setFormData] = useState({
    input2: "",
    fileName: "",
    name: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const showSuccessMessage = (message, type = "success") => {
    setSuccessMessage(message);
    setMessageType(type);
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userId = localStorage.getItem("UserId");
    const token = localStorage.getItem("Token");

    if (!userId || !token) {
      console.error("User ID or token missing.");
      showSuccessMessage("User not authenticated.", "error");
      setIsSubmitting(false);
      return;
    }

    if (!formData.file || !formData.input2) {
      showSuccessMessage("Please provide both a file and a file name.", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.file);

      const apiUrl = `/documents/upload?userId=${userId}&fileName=${formData.input2}&category=${category}`;

      const response = await axiosInstance.post(apiUrl, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        showSuccessMessage("File uploaded successfully!", "success");
        setTimeout(() => {
          onClose();
        }, 1000);
        onSubmit({
          fileName: formData.input2,
          userId:userId,
          category: category,
        });
        
      } else {
        throw new Error("Unexpected response from server.");
        
      }
    } catch (error) {
      // console.error("Error uploading file:", error);
      showSuccessMessage("File upload failed. Please try again.", "error");
   } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Upload Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              UserId:
            </label>
            <input
              type="email"
              id="userId"
              name="userId"
              value={userId}
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="input2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              File Name:
            </label>
            <input
              type="text"
              id="input2"
              name="input2"
              value={formData.input2}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter file name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload File:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="block w-full text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Submit"}
          </button>
        </form>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold ${
              messageType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {successMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DialogueBox;
