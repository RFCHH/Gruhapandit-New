import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Id from './../assets/ID.png'
import MainLayout from '../Layout/Mainlayout';


const National = () => {
    const [fileName, setFileName] = useState('');

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

    return (
        <>
            <MainLayout>
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 ">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-[80%] max-w-4xl">
                        <div className="flex flex-col items-center justify-center bg-purple-200 p-6 w-full md:w-1/2">
                            <img
                                src={Id}
                                alt="National ID"
                                className="w-96 h-auto mb-4"
                            />
                        </div>

                        <div className="p-8 max-w-md w-full md:w-1/2">
                            <h2 className="text-xl text-center font-semibold mb-4">Upload Your National ID</h2>
                            <div
                                className="border-2 shadow-lg border-gray-300 rounded-lg p-10 text-center cursor-pointer flex flex-col items-center justify-center mb-5"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <p className="text-gray-400 mb-2">{fileName || 'Drag & drop your file here'}</p>
                                <input
                                    type="file"
                                    // accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <FaCloudUploadAlt className="text-blue-500 text-6xl cursor-pointer" onClick={() => document.querySelector('input[type="file"]').click()} />
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-purple-600 text-white py-2 px-16  rounded-full shadow hover:bg-purple-700 transition">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default National;