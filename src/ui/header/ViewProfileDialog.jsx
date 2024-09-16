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
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">User Profile</h2>
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-sm"
                            onClick={() => {
                                onEdit();
                                /* Add edit profile logic here */
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>
                    {userData ? (
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Name:</span>{" "}
                                {userData.user.name}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span>{" "}
                                {userData.user.email}
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span>{" "}
                                {userData.user.number}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    User Type:
                                </span>{" "}
                                {userData.user.user_type}
                            </p>
                            <p>
                                <span className="font-semibold">Standard:</span>{" "}
                                {userData.user.std}
                            </p>
                            <p>
                                <span className="font-semibold">School:</span>{" "}
                                {userData.user.school}
                            </p>
                            <p>
                                <span className="font-semibold">Subject:</span>{" "}
                                {userData.user.subject}
                            </p>
                            <p>
                                <span className="font-semibold">Verified:</span>{" "}
                                {userData.user.is_verified ? "Yes" : "No"}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Number Verified:
                                </span>{" "}
                                {userData.is_number_verified ? "Yes" : "No"}
                            </p>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                    <button
                        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}
