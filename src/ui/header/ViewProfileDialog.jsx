import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ViewProfileDialog({ onClose, onEdit }) {
  const [userData, setUserData] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://backend.nexuspublication.com/api/get-user",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
     //   console.log(token);
        if (!response.ok) {

          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle subject change request
  const handleSubjectChangeRequest = () => {
    onClose(); // Close the popup first
    setTimeout(() => {
      navigate("/request-subject-change"); // Navigate after closing
    }, 300); // Delay navigation slightly to ensure smooth transition
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md w-full relative shadow-2xl mx-2 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            User Profile
          </h2>
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-semibold shadow-md"
            onClick={onEdit}
          >
            Edit Profile
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow max-h-[50vh] px-2 space-y-4">
          {userData ? (
            [
              { label: "Name", value: userData.user.name },
              { label: "Email", value: userData.user.email },
              { label: "Phone", value: userData.user.number },
              { label: "User Type", value: userData.user.user_type },
              { label: "Standard", value: userData.user.std },
              { label: "School", value: userData.user.school },
              { label: "Subject", value: userData.user.subject },
              { label: "Verified", value: userData.user.is_verified ? "Yes" : "No" },
              { label: "Number Verified", value: userData.is_number_verified ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {label}
                </span>
                <span className="text-gray-800 dark:text-white">{value}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          )}
        </div>

        {/* Footer with Buttons */}
        <div className="mt-4 flex flex-col gap-3">
          <button
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            onClick={handleSubjectChangeRequest} // Close & navigate
          >
            Request Subject Change
          </button>

          <button
            className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
