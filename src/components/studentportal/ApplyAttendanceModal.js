import React, { useState } from "react";

const ApplyAttendanceModal = ({ subject, onClose, onMarkAttendance }) => {
  const [attendanceStatus, setAttendanceStatus] = useState("present");

  const handleSave = () => {
    const date = new Date().toISOString().split("T")[0]; // Current date in "YYYY-MM-DD" format
    onMarkAttendance(date, attendanceStatus);
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">{`Mark Attendance for ${subject}`}</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Attendance Status</label>
            <select
              className="block w-full border border-gray-300 rounded-lg px-3 py-2"
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value)}
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="holiday">Holiday</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-white rounded-lg">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyAttendanceModal;
