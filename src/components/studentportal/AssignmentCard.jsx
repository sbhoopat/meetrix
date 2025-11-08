import React from "react";

const AssignmentCard = ({ title, dueDate, subject, description }) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-md mb-4 max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
      <h3 className="text-lg sm:text-xl font-semibold text-[#002133]">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{subject}</p>
      <p className="text-sm sm:text-base text-gray-500">{description}</p>
      <p className="mt-2 text-sm sm:text-base text-[#FF4500]">Due: {dueDate}</p>
    </div>
  );
};

export default AssignmentCard;
