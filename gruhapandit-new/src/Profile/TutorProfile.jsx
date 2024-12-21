import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import MainLayout from "../Layout/Mainlayout";
import { Doughnut } from "react-chartjs-2";
import { FiEdit } from "react-icons/fi";
import PersonalInformation from "./PersonalInformation";
import SubjectDetails from "./SubjectDetails";
import CurrentLocation from "./CurrentLocation";
import PermanetLocation from "./PermanetLocation";
import Details from "./Details";

export const FormInput = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-[#000000]">{label}</label>
    <input
      className="w-full border p-2 rounded"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const TutorProfile = () => {
  const [activeSection, setActiveSection] = useState("Personal Information");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");

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

  const renderSectionContent = () => {
    const isEditableSection = !["Subject Details"].includes(activeSection);

    return (
      <div className="col-span-2 bg-white shadow-lg rounded-lg p-4 relative">
        {isEditableSection && (
          <button className="absolute top-4 right-4 text-gray-500 hover:text-blue-600">
            <FiEdit size={20} />
          </button>
        )}
        {(() => {
          switch (activeSection) {
            case "Personal Information":
              return <PersonalInformation />;

            case "Tutor Details":
              return <Details />;

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
        <div className="flex justify-center">
          <button className="mt-4 bg-[#32046B] text-white px-4 py-2 rounded-lg hover:bg-blue-500 w-28">
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-200">
        <main className="flex-1 p-6 ml-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold">Welcome Gruhapandit</h2>
              <p className="text-lg text-gray-600">
                Every step you take today shapes your future tomorrow. Let's
                make it count!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <div className="flex items-center space-x-16">
                <div className="relative w-40 h-40">
                  <Doughnut data={data} options={options} />
                  <div className="absolute inset-0 flex items-center justify-center text-green-600 font-bold text-lg">
                    40%
                  </div>
                </div>

                <div className="flex flex-col space-y-6">
                  <h3 className="text-md font-bold text-gray-700">
                    Complete Your Profile
                  </h3>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Profile
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    KYC
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <div className="space-y-4">
                {[
                  "Personal Information",
                  "Tutor Details",
                  "Subject Details",
                  "Current Location",
                  "Permanent Location",
                ].map((section) => (
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
