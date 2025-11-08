import React from "react";

const AnalyticsCard = ({ title, value, color = "bg-orange-100" }) => (
  <div className={`p-6 sm:p-4 rounded-lg shadow-md ${color} max-w-xs w-full`}>
    <h3 className="text-sm text-gray-700 font-medium">{title}</h3>
    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);

export default AnalyticsCard;
