import React from "react";

export default function AppButton({ children, type = "text", className = "", onClick = () => {} }) {
  return (
    <button type={type} onClick={onClick} className={`py-1.5 px-3 rounded-md bg-secondary text-white hover:bg-primary transition-all  duration-200 ease-linear ${className}`}>
      {children}
    </button>
  );
}
