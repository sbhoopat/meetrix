import React from "react";

const AnalyticsCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-lg shadow-md ${color || "bg-orange-100"}`}>
    <h3 className="text-sm text-gray-700 font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

export default AnalyticsCard;
