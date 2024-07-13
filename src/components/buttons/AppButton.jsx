import React from "react";

export default function AppButton({ children, type = "text", className = "", onClick = () => {}, isLoading = false }) {
  return (
    <button type={type} onClick={onClick} disabled={isLoading} className={`py-1.5 px-3 rounded-md bg-secondary text-white hover:bg-primary transition-all  disabled:opacity-50  duration-200 ease-linear ${className}`}>
      {isLoading ? "Please wait..." : children}
    </button>
  );
}
