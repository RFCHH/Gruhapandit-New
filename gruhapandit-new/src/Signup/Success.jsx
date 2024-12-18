import React from "react";

const LoginSuccess = () => {
  return (
    <div className="flex justify-between items-center h-screen bg-gray-50 p-8">
      <div className="w-1/2 text-center">
        <h2 className="text-4xl font-semibold text-purple-700 mb-4">
          Login Successfully.
        </h2>
        
        {/* <button className="border-2 border-purple-700 text-purple-700 px-6 py-2 rounded hover:bg-purple-700 hover:text-white transition duration-300">
          Continue
        </button> */}
      </div>

      <div className="w-1/2 flex justify-center relative">
        <div className="bg-white p-8 shadow-lg relative">
          <div className="flex flex-wrap justify-center space-x-2">
            <span className="bg-red-500 text-white px-4 py-2 text-4xl font-bold rounded">
              T
            </span>
            <span className="bg-green-500 text-white px-4 py-2 text-4xl font-bold rounded">
              H
            </span>
            <span className="bg-yellow-400 text-white px-4 py-2 text-4xl font-bold rounded">
              A
            </span>
            <span className="bg-blue-500 text-white px-4 py-2 text-4xl font-bold rounded">
              N
            </span>
            <span className="bg-red-500 text-white px-4 py-2 text-4xl font-bold rounded">
              K
            </span>
            <span className="bg-blue-500 text-white px-4 py-2 text-4xl font-bold rounded">
              Y
            </span>
            <span className="bg-pink-500 text-white px-4 py-2 text-4xl font-bold rounded">
              O
            </span>
            <span className="bg-red-500 text-white px-4 py-2 text-4xl font-bold rounded">
              U
            </span>
          </div>

          {/* <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/party-confetti.png')]"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginSuccess;

