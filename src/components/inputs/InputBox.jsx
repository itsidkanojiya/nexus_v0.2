import React from "react";

const InputBox = ({ name, type = "text", placeholder = "Placeholder", disabled = false }) => {
  return (
    <div>
      <input type={type} disabled={disabled} placeholder={placeholder} />
    </div>
  );
};

export default InputBox;
