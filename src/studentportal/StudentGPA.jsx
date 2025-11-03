// StudentGPA.js
import React, { useState } from "react";
import AssignmentCard from "./AssignmentCard";
import GPAComponent from "./GPAComponent";

const StudentGPA = () => {
  // Sample data for assignments (including grades and weights)
  const assignments = [
    {
      id: 1,
      title: "Mathematics Assignment 1",
      subject: "Mathematics",
      grade: 85,
      weight: 20, // 20% weight
      dueDate: "2025-11-10",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      grade: 90,
      weight: 25, // 25% weight
      dueDate: "2025-11-15",
    },
    {
      id: 3,
      title: "History Essay",
      subject: "History",
      grade: 80,
      weight: 30, // 30% weight
      dueDate: "2025-11-20",
    },
    {
      id: 4,
      title: "Computer Science Project",
      subject: "Computer Science",
      grade: 95,
      weight: 25, // 25% weight
      dueDate: "2025-11-25",
    },
  ];

  // Calculate GPA based on weighted average
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalWeight = 0;

    assignments.forEach((assignment) => {
      totalPoints += assignment.grade * (assignment.weight / 100);
      totalWeight += assignment.weight;
    });

    return (totalPoints / totalWeight).toFixed(2);
  };

  const gpa = calculateGPA();

  // Sample semester grades
  const semesterGrades = [
    { subject: "Mathematics", grade: "A" },
    { subject: "Physics", grade: "A-" },
    { subject: "History", grade: "B+" },
    { subject: "Computer Science", grade: "A" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-semibold text-[#002133] mb-4">Current GPA & Semester Grades</h1>

      {/* GPA Section */}
      <GPAComponent gpa={gpa} semesterGrades={semesterGrades} />

      {/* Assignment List */}
      <h2 className="text-2xl font-semibold text-[#002133] mt-6 mb-4">Assignments</h2>
      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            title={assignment.title}
            grade={assignment.grade}
            weight={assignment.weight}
            dueDate={assignment.dueDate}
            subject={assignment.subject}
          />
        ))
      ) : (
        <p>No assignments available.</p>
      )}
    </div>
  );
};

export default StudentGPA;
