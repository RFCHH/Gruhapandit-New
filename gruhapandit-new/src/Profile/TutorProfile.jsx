import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import MainLayout from "../Layout/Mainlayout";
import { Doughnut } from "react-chartjs-2";
import PersonalInformation from "./PersonalInformation";
import SubjectDetails from "./SubjectDetails";
import CurrentLocation from "./CurrentLocation";
import PermanetLocation from "./PermanetLocation";
import Details from "./Details";
import axiosInstance from "../axiosInstance";
import profileIcon from "../assets/profileIcon.png";

export const FormInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  disabled,
  error,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-bold mb-1">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled}
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded focus:outline-none focus:ring-2 focus:ring-cyan-500`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const data = {
  labels: ["Completed", "Remaining"],
  datasets: [
    {
      data: [40, 60],
      backgroundColor: ["#10b981", "#e5e7eb"],
      hoverBackgroundColor: ["#059669", "#d1d5db"],
      borderWidth: 0,
    },
  ],
};

const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
  },
};

const TutorProfile = () => {
  const [activeSection, setActiveSection] = useState("Personal Information");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileCompletion, setProfileCompletion] = useState(0);

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const profile =localStorage.getItem("Profile");

  const sections = [
    "Personal Information",
    role === "TUTOR" ? "Tutor Details" : "Student Details",
    "Subject Details",
    "Current Location",
    "Permanent Location",
  ];

  const renderSectionContent = () => {
    const isEditableSection = !["Subject Details"].includes(activeSection);

    return (
      <div className="col-span-2 bg-white shadow-lg rounded-lg p-4 relative">
        {(() => {
          switch (activeSection) {
            case "Personal Information":
              return <PersonalInformation />;
            case "Tutor Details":
            case "Student Details":
              return <Details role={role} />;
            case "Subject Details":
              return (
                <SubjectDetails
                  subjects={subjects}
                  setSubjects={setSubjects}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  category={category}
                  setCategory={setCategory}
                  subject={subject}
                  setSubject={setSubject}
                />
              );
            case "Current Location":
              return <CurrentLocation />;
            case "Permanent Location":
              return <PermanetLocation />;
            default:
              return <div>Invalid Section</div>;
          }
        })()}
      </div>
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/${userId}`);
        const data = response.data;
        setFullname(data.fullName);

        const profileResponse = await axiosInstance.get(
          `/profilecompletion/${userId}`
        );
        const profileData = profileResponse.data;
        setProfileCompletion(profileData.completionPercentage);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <MainLayout>
      <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-200">
        <main className="flex-1 p-6 ml-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <img
                src={profile}
                alt="Profile Icon"
                className="w-24 h-24 rounded-full mr-8"
              />
              <div>
                <h2 className="text-2xl font-bold">
                  {loading ? "Loading..." : `Welcome ${fullname}`}
                </h2>
                <p className="text-lg text-black mt-4">
                  Every step you take today shapes your future tomorrow. Let's
                  make it count!
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <div className="flex items-center space-x-12">
                <div className="flex flex-col items-center">
                  <div className="relative w-36 h-36">
                    <Doughnut
                      data={{
                        datasets: [
                          {
                            data: [profileCompletion, 100 - profileCompletion],
                            backgroundColor: ["#4A148C", "#EDE7F6"],
                            borderWidth: 0,
                          },
                        ],
                      }}
                      options={{
                        cutout: "70%",
                        plugins: { tooltip: { enabled: false } },
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-yellow-500 font-bold text-lg">
                      {profileCompletion}%
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-blue-600 font-bold">Profile</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-36 h-36">
                    <Doughnut
                      data={{
                        datasets: [
                          {
                            data: [30, 70],
                            backgroundColor: ["#FF9800", "#FFF3E0"],
                            borderWidth: 0,
                          },
                        ],
                      }}
                      options={{
                        cutout: "70%",
                        plugins: { tooltip: { enabled: false } },
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-yellow-500 font-bold text-lg">
                      30%
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-blue-600 font-bold">KYC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <div className="space-y-4">
                {sections.map((section) => (
                  <button
                    key={section}
                    className={`w-full flex items-center justify-between p-2 rounded-lg ${
                      activeSection === section
                        ? "bg-[#26A3C9] text-[#FFFFFF]"
                        : "bg-white text-[#000000] hover:bg-blue-300"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    <span>{section}</span>
                    <IoIosArrowForward
                      className={
                        activeSection === section
                          ? "text-[#FFFFFF]"
                          : "text-gray-400"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-2">{renderSectionContent()}</div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default TutorProfile;
