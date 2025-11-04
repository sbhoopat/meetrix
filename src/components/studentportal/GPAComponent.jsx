// GPAComponent.js
import React from 'react';

const GPAComponent = ({ gpa, semesterGrades }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-[#002133]">Current GPA: {gpa}</h2>

      <h3 className="mt-4 text-2xl font-semibold text-[#002133]">Semester Grades:</h3>
      <ul className="mt-2">
        {semesterGrades.map((grade, index) => (
          <li key={index} className="text-sm text-gray-700">
            {grade.subject}: {grade.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GPAComponent;
