import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AttendanceCard from "./AttendanceCard";
import ApplyAttendanceModal from "./ApplyAttendanceModal";

// Sample data for attendance status
const attendanceData = [
  { date: new Date(2025, 10, 1), status: "present" }, // November 1st, 2025
  { date: new Date(2025, 10, 3), status: "absent" }, // November 3rd, 2025
  { date: new Date(2025, 10, 5), status: "present" }, // November 5th, 2025
  { date: new Date(2025, 10, 10), status: "absent" }, // November 10th, 2025
  { date: new Date(2025, 10, 12), status: "holiday" }, // November 12th, 2025 (Holiday)
];

const AttendanceScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  // Sample data for subjects and attendance
  const subjects = [
    { name: "Mathematics", attendancePercentage: 80 },
    { name: "Science", attendancePercentage: 72 },
    { name: "History", attendancePercentage: 65 },
    { name: "English", attendancePercentage: 85 },
  ];

  const handleApplyAttendance = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubject("");
  };

  // Function to add a class to the calendar tile based on attendance status
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const attendance = attendanceData.find((item) => {
        return (
          item.date.getDate() === date.getDate() &&
          item.date.getMonth() === date.getMonth() &&
          item.date.getFullYear() === date.getFullYear()
        );
      });

      if (attendance) {
        switch (attendance.status) {
          case "present":
            return "present-day";
          case "absent":
            return "absent-day";
          case "holiday":
            return "holiday-day";
          default:
            return "";
        }
      }
    }
    return "";
  };

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col space-y-6">
      <h1 className="text-3xl font-semibold text-[#002133] text-center md:text-left">Attendance</h1>

      {/* Attendance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <AttendanceCard
            key={index}
            subject={subject.name}
            attendancePercentage={subject.attendancePercentage}
            onApplyAttendance={handleApplyAttendance}
          />
        ))}
      </div>

      {/* Calendar Component */}
      <div className="mt-6 w-full">
        <Calendar
          onChange={() => {}}
          value={new Date()}
          tileClassName={tileClassName}
          className="react-calendar w-full"
        />
      </div>

      {/* Apply for Attendance Modal */}
      {isModalOpen && (
        <ApplyAttendanceModal subject={selectedSubject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AttendanceScreen;
