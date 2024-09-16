import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import EditProfileDialog from "./EditProfileDialog";

export default function ViewProfileDialog({ onClose, onEdit }) {
    const [userData, setUserData] = useState(null);
    const { token } = useAuth();

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md w-full relative shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        User Profile
                    </h2>
                    <button
                        className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-semibold shadow-md"
                        onClick={() => {
                            onEdit();
                            /* Add edit profile logic here */
                        }}
                    >
                        Edit Profile
                    </button>
                </div>
                {userData ? (
                    <div className="space-y-4">
                        {[
                            { label: "Name", value: userData.user.name },
                            { label: "Email", value: userData.user.email },
                            { label: "Phone", value: userData.user.number },
                            {
                                label: "User Type",
                                value: userData.user.user_type,
                            },
                            { label: "Standard", value: userData.user.std },
                            { label: "School", value: userData.user.school },
                            { label: "Subject", value: userData.user.subject },
                            {
                                label: "Verified",
                                value: userData.user.is_verified ? "Yes" : "No",
                            },
                            {
                                label: "Number Verified",
                                value: userData.is_number_verified
                                    ? "Yes"
                                    : "No",
                            },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                            >
                                <span className="font-medium text-gray-600 dark:text-gray-300">
                                    {label}
                                </span>
                                <span className="text-gray-800 dark:text-white">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                )}
                <button
                    className="mt-8 w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
