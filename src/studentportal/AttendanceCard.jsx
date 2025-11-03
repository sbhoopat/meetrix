// AttendanceCard.js
import React from "react";

const AttendanceCard = ({ subject, attendancePercentage, onApplyAttendance }) => {
  return (
    <div
      className={`p-4 mb-4 bg-white rounded-lg shadow-md ${attendancePercentage < 75 ? "border-l-4 border-red-500" : "border-l-4 border-green-500"}`}
    >
      <h3 className="text-xl font-semibold text-[#002133]">{subject}</h3>
      <p className="text-sm text-gray-600">Attendance: {attendancePercentage}%</p>
      {attendancePercentage < 75 && (
        <p className="text-red-500 text-sm mt-2">Your attendance is below 75%! Please apply for an attendance shortage.</p>
      )}
      <button
        onClick={() => onApplyAttendance(subject)}
        className="mt-3 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition"
      >
        Apply for Attendance Shortage
      </button>
    </div>
  );
};

export default AttendanceCard;
