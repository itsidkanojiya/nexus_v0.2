import React from "react";
import { useNavigate } from "react-router-dom";
import "@dotlottie/player-component"; // Importing the Lottie player component

const Unverified = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <dotlottie-player
        src="https://lottie.host/f6926263-814b-4fc7-8d9d-ebacb4896c81/tHZYtfMBqm.lottie"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></dotlottie-player>
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Account Unverified</h1>
      <p className="text-gray-600 mt-2">
        Our team is verifying your account. This process may take 24 to 48 hours.
      </p>
      <p className="text-gray-600">Thank you for your patience.</p>
      
      <button
  onClick={() => navigate("/")}
  className="mt-6 px-6 py-2 rounded-md bg-secondary text-white hover:bg-primary transition-all disabled:opacity-50 duration-200 ease-linear"
>
  {" Go to Home"}
</button>
      
    </div>
  );
};

export default Unverified;
