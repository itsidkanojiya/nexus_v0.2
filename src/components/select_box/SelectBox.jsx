import React from "react";

export default function SelectBox({ handleChange, children }) {
  return (
    <select onChange={(e) => handleChange(e.target.value)} className="p-2.5 w-full focus:outline-none border rounded-xl focus:border-primary">
      {children}
    </select>
  );
}
