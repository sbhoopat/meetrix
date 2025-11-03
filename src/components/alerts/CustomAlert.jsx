// CustomAlert.js
import React from "react";

const CustomAlert = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  const alertStyles = {
    success: "bg-lightgreen text-green-700",
    failure: "bg-lightcoral text-red-700",
  };

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-80 p-3 rounded-lg shadow-lg z-50 ${alertStyles[type]}`}
    >
      {message}
    </div>
  );
};

export default CustomAlert;
