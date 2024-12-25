import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/Mainlayout";
import axiosInstance from "../axiosInstance";

const MyRequest = () => {
    const [activeTab, setActiveTab] = useState("My Request");
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    // Fetch requests data
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("Token");
            const userId = localStorage.getItem("UserId");

            if (!userId || !token) {
                console.error("userId, token are missing");
                return;
            }

            try {
                const apiUrl =
                    activeTab === "My Request"
                        ? `/requests/requests?userId=${userId}&page=${page}&size=${size}`
                        : `/requests/approvals?userId=${userId}&page=${page}&size=${size}`;

                const response = await axiosInstance.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRequests(response.data); // Set the fetched data into state
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchData();
    }, [activeTab, page, size]);

    // Handle status update
    const handleStatusUpdate = async (requestId, status) => {
        const token = localStorage.getItem("Token");
        const userId = localStorage.getItem("UserId");

        if (!userId || !token) {
            console.error("userId, token are missing");
            return;
        }

        try {
            const response = await axiosInstance.patch(
                `/requests/updateStatus?userId=${userId}&requestId=${requestId}&status=${status}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the status locally
                setRequests((prevRequests) =>
                    prevRequests.map((req) =>
                        req.id === requestId ? { ...req, status } : req
                    )
                );
                console.log(`Request ${requestId} status updated to ${status}`);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 p-4 sm:p-6 md:p-8 lg:p-12 bg-blue-50 min-h-screen">
                <div className="w-full md:w-1/4 lg:w-1/5 px-2 md:px-4 lg:px-6 sm:mt-10 md:mt-40 lg:mt-12">
                    <div className="bg-white rounded-lg shadow-md p-2 mt-10">
                        <button
                            className={`w-full flex items-center justify-between text-left py-3 px-4 rounded-lg transition-all ${
                                activeTab === "My Request"
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "hover:bg-blue-100 text-black"
                            }`}
                            onClick={() => setActiveTab("My Request")}
                        >
                            My Request
                            <span className="font-bold">{">"}</span>
                        </button>
                        <button
                            className={`w-full flex items-center justify-between text-left mt-4 py-3 px-4 rounded-lg transition-all ${
                                activeTab === "Received Request"
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "hover:bg-blue-100 text-black"
                            }`}
                            onClick={() => setActiveTab("Received Request")}
                        >
                            Received Request
                            <span className="font-bold">{">"}</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center mt-8 sm:mt-10 md:mt- lg:mt-14">
                    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-screen-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="p-4 border border-blue-500 rounded-md shadow bg-gray-50 text-center transition-all hover:shadow-lg hover:scale-105 mt-6"
                                >
                                    <p className="text-sm mb-2">
                                        <strong>Name</strong> : {request.name}
                                    </p>
                                    <p className="text-sm mb-2">
                                        <strong>Location</strong> : {request.location}
                                    </p>
                                    <p className="text-sm mb-2">
                                        <strong>Subjects</strong> : {request.subjects}
                                    </p>
                                    <p className="text-sm mb-2">
                                        <strong>Rating</strong> :{" "}
                                        {request.rating === 0 ? (
                                            <span>No rating yet</span>
                                        ) : (
                                            <span>{request.rating} ★</span>
                                        )}
                                    </p>
                                    <p className="text-sm mb-2">
                                        <strong>Status</strong> :{" "}
                                        <span
                                            className={`${
                                                request.status === "Approved"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {request.status}{" "}
                                            {/* {request.status === "Approved" ? (
                                                <span className="text-green-500 font-bold"></span>
                                            ) : (
                                                <span className="text-red-500 font-bold"></span>
                                            )} */}
                                        </span>
                                    </p>

                                    {activeTab === "Received Request" && (
                                        <div className="flex justify-center gap-2 mt-4">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
                                                onClick={() =>
                                                    handleStatusUpdate(request.id, "Approved")
                                                }
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
                                                onClick={() =>
                                                    handleStatusUpdate(request.id, "Rejected")
                                                }
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default MyRequest;