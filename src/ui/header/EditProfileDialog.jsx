import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

export default function EditProfileDialog({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("current_password", currentPassword);
      formData.append("new_password", newPassword);
      formData.append("confirm_password", confirmPassword);

      const response = await fetch(
        "https://backend.nexuspublication.com/api/change-password",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      toast.success(data?.message || "Password changed successfully");
      onClose();
    } catch (error) {
      toast.error(error?.message || "Network error");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md w-full relative shadow-2xl mx-2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
            required
          />

          <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Passwords</span>
          </label>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
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
          </div>
        </form>
      </div>
    </div>
  );
}
