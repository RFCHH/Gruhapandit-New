import React from "react";
import { useNavigate } from "react-router-dom"; 
import student from "../assets/student1.png";
import tutor from "../assets/tutor1.png";
import MainLayout from "../Layout/Mainlayout";


const Registration = () => {
    const navigate = useNavigate();

    const handleStudentClick = () => {
        navigate("/StudentTable", { state: { role: "Student" } }); 
    };
    
    const handleTutorClick = () => {
        navigate("/TutorTable", { state: { role: "Tutor" } }); 
    };
    

    return (
        <MainLayout>
       <>
            <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
                <div className="w-full shadow-lg rounded-lg  h-full p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 ml-36 mr-20">
                        <div
                            className="bg-[#28A8E0] text-white rounded-lg shadow-md p-2 flex items-center justify-between hover:shadow-xl transition-all cursor-pointer"
                            onClick={handleTutorClick}
                        >
                            <img
                                src={tutor}
                                alt="Tutor"
                                className="w-16 h-16 rounded-full"
                            />
                            <span className="text-xl font-bold text-center flex-1">Tutor</span>
                        </div>

                        <div
                            className="bg-[#28A8E0] text-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-xl transition-all cursor-pointer"
                            onClick={handleStudentClick}
                        >
                            <span className="text-xl font-bold text-center flex-1">Student</span>
                            <img
                                src={student}
                                alt="Student"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            </>
            </MainLayout>
    );
};

export default Registration;