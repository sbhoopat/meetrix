import React from "react";

const AttendanceCard = ({ subject, attendancePercentage, onApplyAttendance }) => {
  return (
    <div
      className={`p-4 mb-4 bg-white rounded-lg shadow-md ${
        attendancePercentage < 75 ? "border-l-4 border-red-500" : "border-l-4 border-green-500"
      } max-w-xs sm:max-w-md lg:max-w-lg mx-auto`}
    >
      <h3 className="text-lg sm:text-xl font-semibold text-[#002133]">{subject}</h3>
      <p className="text-sm sm:text-base text-gray-600">Attendance: {attendancePercentage}%</p>
      {attendancePercentage < 75 && (
        <p className="text-red-500 text-sm sm:text-base mt-2">
          Your attendance is below 75%! Please apply for an attendance shortage.
        </p>
      )}
      <button
        onClick={() => onApplyAttendance(subject)}
        className="mt-3 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition w-full sm:w-auto"
      >
        Apply for Attendance Shortage
      </button>
    </div>
  );
};

export default AttendanceCard;
