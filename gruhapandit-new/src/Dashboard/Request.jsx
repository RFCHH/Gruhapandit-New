import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/Mainlayout";
import axiosInstance from "../axiosInstance";
import { renderStars } from "../Admin Flow/AllReviews";

const MyRequest = () => {
    const [activeTab, setActiveTab] = useState("My Request");
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [requestId, setRequestId] = useState();
    const [successMessage, setSuccessMessage] = useState(null);

    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");

    useEffect(() => {
        const fetchData = async () => {


            if (!userId || !token) {
                console.error("userId, token are missing");
                return;
            }

            let url = "";

            if (activeTab === "My Request") {
                url = `/requests/requests?userId=${userId}&page=${page}&size=${size}`;
            } else if (activeTab === "Received Request") {
                url = `/requests/approvals?userId=${userId}&page=${page}&size=${size}`;
            }

            try {
                const response = await axiosInstance.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchData();
    }, [page, size, activeTab]);



    const handleStatusUpdate = async (requestId, status) => {
        setRequestId(requestId);

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

            if (response.status === 204) {
                setRequests((prevRequests) =>
                    prevRequests.filter((req) => req.id !== requestId)
                );
                console.log(`Request ${requestId} status updated to ${status} and removed from the list.`);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };


    const handleDelete = async (requestId) => {
        setRequestId(requestId);
        const token = localStorage.getItem("Token");
        const userId = localStorage.getItem("UserId");

        if (!userId || !token) {
            console.error("userId, token are missing");
            return;
        }

        try {
            const response = await axiosInstance.delete(
                `/requests/${requestId}?userId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setRequests((prevRequests) =>
                    prevRequests.filter((req) => req.id !== requestId)
                );
                console.log(`Request ${requestId} deleted successfully`);
                setSuccessMessage("Request successfully deleted!");
                setTimeout(() => setSuccessMessage(null), 1000);
            }
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 p-4 sm:p-6 md:p-8 lg:p-12 bg-blue-50 min-h-screen pl-14 mx-auto md:pl-14">
                <div className="w-11/12 sm:w-3/4 md:w-1/4 lg:w-1/5 px-2 md:px-4 lg:px-6 sm:mt-10 md:mt-40 lg:mt-12 mx-auto">
                    <div className="bg-white  rounded-lg shadow-md p-2 mt-10">
                        <button
                            className={`w-full flex  border-2 items-center justify-between text-left lg:py-3 lg:px-4 py-2 rounded-lg transition-all ${activeTab === "My Request"
                                ? "bg-blue-500 text-white shadow-md"
                                : "hover:bg-blue-100 text-black"
                                }`}
                            onClick={() => setActiveTab("My Request")}
                        >
                            My Request
                            <span className="font-bold">{">"}</span>
                        </button>
                        <button
                            className={`w-full flex border-2 items-center justify-between text-left  lg:py-3 lg:px-4 py-2 rounded-lg transition-all ${activeTab === "Received Request"
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

                <div className="flex-1 flex flex-col justify-center items-center mt-8 sm:mt-10 lg:mt-14">
                    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-screen-lg">
                        {successMessage && (
                            <div className="bg-green-500 text-white text-center py-2 rounded-md mb-4">
                                {successMessage}
                            </div>
                        )}
                        {requests.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {requests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="p-2 border-2 border-blue-500 rounded-lg shadow-lg bg-gray-50  transition-transform hover:shadow-xl hover:scale-105"
                                    >

                                        <div className="grid grid-cols-1 gap-2 ">
                                            <p className="text-sm "><strong>Name:</strong> {request.name}</p>
                                            <p className="text-sm"><strong>Location:</strong> {request.location}</p>
                                            <p className="text-sm"><strong>Subjects:</strong> {request.subjects}</p>
                                            <p className="text-sm">
                                                <strong>Rating:</strong>
                                                {request.rating === 0 ? (
    <span className="text-xl">{renderStars(0)}</span>
  ) : (
    <span className="text-xl">{renderStars(request.rating)}</span>
  )}
                                            </p>
                                            {/* </div>

                      
                        <div className="mb-4"> */}
                                            <p className="text-sm">
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    className={`text-lg font-semibold ${request.status === "Approved" ? "text-green-500" : "text-red-500"
                                                        }`}
                                                >
                                                    {request.status}
                                                    {/* {request.status === "Approved" ? (
                                        <span className="ml-1">✔</span>
                                    ) : (
                                        <span className="ml-1">✘</span>
                                    )} */}
                                                </span>
                                            </p>
                                        </div>

                                        {
                                            activeTab === "My Request"  && (
                                                <button
                                                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow transition-all md:px-3 md:py-1.5"
                                                    onClick={() => handleDelete(request.id)}
                                                >
                                                    Delete
                                                </button>
                                            )
                                        }


                                        {activeTab === "Received Request" && (
                                            <div className="flex flex-wrap justify-center gap-2 mt-4 md:gap-2 md:flex-wrap ">
                                                <button
                                                    className="bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow  transition-all md:px-3 md:py-1.5"
                                                    onClick={() => handleStatusUpdate(request.id, "Approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow  transition-all md:px-3 md:py-1.5"
                                                    onClick={() => handleStatusUpdate(request.id, "Rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </div>

                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 text-lg">No data found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );

};

export default MyRequest;