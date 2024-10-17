import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function EditProfileDialog({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("current_password", currentPassword);
      formData.append("new_password", newPassword);
      formData.append("confirm_password", confirmPassword);

      const response = await fetch(
        "https://backend.nexuspublication.com/api/edit-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Profile updated:", data);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md w-full relative shadow-2xl mx-2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="currentPassword"
            type="password"
            placeholder="Old Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
