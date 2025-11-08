import React, { useState } from "react";
import AssignmentCard from "./AssignmentCard";

const StudentAssignments = () => {
  // Mock Data: Upcoming assignments and deadlines
  const upcomingAssignments = [
    {
      id: 1,
      title: "Mathematics Assignment 1",
      subject: "Mathematics",
      description: "Complete the algebra exercises on pages 45-50.",
      dueDate: "2025-11-10",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      description: "Write a report based on the experiment conducted last week.",
      dueDate: "2025-11-15",
    },
    {
      id: 3,
      title: "History Essay",
      subject: "History",
      description: "Write an essay on the causes of World War II.",
      dueDate: "2025-11-20",
    },
    {
      id: 4,
      title: "Computer Science Project",
      subject: "Computer Science",
      description: "Create a Python program to solve the given problem.",
      dueDate: "2025-11-25",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#002133] mb-6">
        Upcoming Assignments & Deadlines
      </h1>

      {/* Assignment List */}
      {upcomingAssignments.length > 0 ? (
        upcomingAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            title={assignment.title}
            dueDate={assignment.dueDate}
            subject={assignment.subject}
            description={assignment.description}
          />
        ))
      ) : (
        <p>No upcoming assignments.</p>
      )}
    </div>
  );
};

export default StudentAssignments;
