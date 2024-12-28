import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/Mainlayout";
import axios from "axios";

const RequestApproval = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/requests"); // Replace with your API endpoint
        const fetchedData = response.data;

        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          setData([]);
          setError("No data available.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen py-4 px-4 sm:px-8">
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-6xl mx-auto">
          <h1 className="text-xl font-bold mb-4">Request Table</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-black">
              <thead className="bg-gray-200">
                <tr>
                  <th
                    className="border border-black px-4 py-2 text-center"
                    scope="col"
                  >
                    Request To
                  </th>
                  <th
                    className="border border-black px-4 py-2 text-center"
                    scope="col"
                  >
                    Request By
                  </th>
                  <th
                    className="border border-black px-4 py-2 text-center"
                    scope="col"
                  >
                    Created At
                  </th>
                  <th
                    className="border border-black px-4 py-2 text-center"
                    scope="col"
                  >
                    Subject
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 px-4 py-2 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {error}
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 px-4 py-2 text-center text-gray-400"
                    >
                      No requests available.
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-blue-100 transition duration-150`}
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {row.requestTo || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.requestBy || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.createdBy || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.subject || "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RequestApproval;
