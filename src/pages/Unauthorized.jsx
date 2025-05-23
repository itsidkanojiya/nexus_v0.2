import React from "react";
import { useNavigate } from "react-router-dom";
import "@dotlottie/player-component"; // Importing the Lottie player component

const Unauthorized = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <dotlottie-player
        src="https://lottie.host/b39919b7-1368-4f39-a29e-8041a5816788/WhcrsziqwY.lottie"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></dotlottie-player>
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Access Denied</h1>
      <p className="text-gray-600 mt-2">
        Students cannot access this feature.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 rounded-md bg-secondary text-white hover:bg-primary transition-all disabled:opacity-50 duration-200 ease-linear"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
