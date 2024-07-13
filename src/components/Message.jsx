import React from "react";

const Message = ({ type, message }) => {
  if (!message) return null;

  const baseStyle = "text-sm font-semibold rounded-md p-0.5 mb-3";
  const styles = {
    success: `${baseStyle}  text-green-600 bg-green-600/10    `,
    error: `${baseStyle}  text-red-600 bg-red-600/10  `,
  };

  return (
    <div className={styles[type]} role="alert">
      <span className="block  text-center">{message}</span>
    </div>
  );
};

export default Message;
