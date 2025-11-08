import React, { useState } from "react";
import ScheduleCard from "./ScheduleCard";

const StudentDashboard = () => {
  // Mock Data: Today's schedule (classes, labs, and events)
  const todaySchedule = [
    {
      id: 1,
      title: "Mathematics Lecture",
      time: "9:00 AM - 10:30 AM",
      location: "Room 101, Building A",
      type: "class",
    },
    {
      id: 2,
      title: "Physics Lab",
      time: "11:00 AM - 1:00 PM",
      location: "Lab 3, Science Block",
      type: "lab",
    },
    {
      id: 3,
      title: "AI and ML Workshop",
      time: "2:00 PM - 4:00 PM",
      location: "Conference Hall, Main Campus",
      type: "event",
    },
    {
      id: 4,
      title: "English Class",
      time: "4:30 PM - 6:00 PM",
      location: "Room 102, Building B",
      type: "class",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#002133] mb-6">
        Today's Schedule
      </h1>
      
      {/* Today's schedule list */}
      {todaySchedule.length > 0 ? (
        todaySchedule.map((scheduleItem) => (
          <ScheduleCard
            key={scheduleItem.id}
            title={scheduleItem.title}
            time={scheduleItem.time}
            location={scheduleItem.location}
            type={scheduleItem.type}
          />
        ))
      ) : (
        <p>No events scheduled for today.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
