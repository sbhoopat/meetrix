// AssignmentCard.js
import React from 'react';

const AssignmentCard = ({ title, dueDate, subject, description }) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold text-[#002133]">{title}</h3>
      <p className="text-sm text-gray-600">{subject}</p>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="mt-2 text-sm text-[#FF4500]">Due: {dueDate}</p>
    </div>
  );
};

export default AssignmentCard;
