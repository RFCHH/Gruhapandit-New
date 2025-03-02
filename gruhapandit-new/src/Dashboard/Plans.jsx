import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa"; 
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5"; 
import MainLayout from "../Layout/Mainlayout";

const MyPlans = ({ paymentDetails = {} }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <MainLayout>
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 bg-blue-50 min-h-screen lg:pl-2 pr-3 md:pl-16 pl-16  ">
          
          <div className="bg-white rounded-xl shadow-lg mt-10 p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-lg font-bold text-blue-900 mb-4 text-center md:text-left">
              Duration
            </h2>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-green-500 text-xl mr-2" />
                  <span className="text-green-500 font-medium">Start date</span>
                </div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent text-green-500 font-bold text-lg focus:outline-none text-center md:text-left"
                />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-red-500 text-xl mr-2" />
                  <span className="text-red-500 font-medium">End date</span>
                </div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent text-red-500 font-bold text-lg focus:outline-none text-center md:text-left"
                />
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl shadow-lg mt-10 p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-lg font-bold text-blue-900 mb-4 text-center md:text-left">
              Payment Detail
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
             
              <div>
                <p className="text-sm font-medium text-gray-600">Amount</p>
                <p className="text-lg font-bold text-red-500">
                  ₹ {paymentDetails.amount || "0"} /-
                </p>
              </div>

             
              <div>
                <p className="text-sm font-medium text-gray-600">Id Number</p>
                <div className="flex justify-center items-center">
                  <p className="text-lg font-bold text-orange-500">
                    {paymentDetails.idNumber || "N/A"}
                  </p>
                </div>
              </div>

            
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <div className="flex justify-center items-center">
                  <p
                    className={`text-lg font-bold ${
                      paymentDetails.status === "Paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {paymentDetails.status || "Unpaid"}
                  </p>
                  {paymentDetails.status === "Paid" ? (
                    <IoCheckmarkSharp className="w-5 h-5 text-green-500 ml-2" />
                  ) : (
                    <IoCloseSharp className="w-5 h-5 text-red-500 ml-2" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default MyPlans;
