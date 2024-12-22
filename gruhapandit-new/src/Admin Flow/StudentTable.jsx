import React, { useState } from "react";
// import SideBaradmin from "../AdminDashboard/SideBaradmin";


const StudentTable = () => {
  const [activeTab, setActiveTab] = useState("Normal User");

  const studentData = [
    { name: "Bakshi Suraj", email: "suraj49@gmail.com", userId: "1983140410" },
    { name: "Priya Verma", email: "priya@gmail.com", userId: "1983140413" },
    { name: "Ravi Kumar", email: "ravi.kumar@gmail.com", userId: "1983140414" },
  ];

  const subscriptionData = [
    { name: "Bakshi Suraj", email: "suraj49@gmail.com", userId: "1983140410" },
    { name: "Anjali Gupta", email: "anjali.gupta@gmail.com", userId: "1983140416" },
  ];

  const tableData = activeTab === "Normal User" ? studentData : subscriptionData;

  return (
    <>
            <div className="flex">
              {/* <SideBaradmin/> */}
            

    <div className="w-full flex h-screen bg-gray-100 mt-16">
    
      <div className="w-full md:w-1/4 lg:w-1/5 px-2 md:px-4 lg:px-6 sm:mt-10 md:mt-40 lg:mt-12">
        <div className="bg-white rounded-lg shadow-md p-2 mt-10">
          <button
            className={`w-full flex items-center justify-between text-left py-3 px-4 rounded-lg transition-all ${
              activeTab === "Normal User"
                ? "bg-blue-500 text-white shadow-md"
                : "hover:bg-blue-100 text-black"
            }`}
            onClick={() => setActiveTab("Normal User")}
          >
            Normal User
            <span className="font-bold">{">"}</span>
          </button>
          <button
            className={`w-full flex items-center justify-between text-left mt-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === "Subscription"
                ? "bg-blue-500 text-white shadow-md"
                : "hover:bg-blue-100 text-black"
            }`}
            onClick={() => setActiveTab("Subscription")}
          >
            Subscription
            <span className="font-bold">{">"}</span>
          </button>
        </div>
      </div>

      <main className="flex-1 p-6 mt-20">
        <div className="flex justify-between items-center mb-6">
          <select className="border border-gray-300 rounded-md px-4 py-2 text-sm">
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-600">
                  Student Name
                </th>
                <th className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-600">
                  User ID
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                    {data.name}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                    {data.email}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                    {data.userId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <button className="hover:underline">Previous</button>
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                className={`mx-1 px-3 py-1 rounded-md ${
                  i === 0 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button className="hover:underline">Next</button>
        </div>
      </main>
    </div>
    </div>
    </>
  );
};

export default StudentTable;
