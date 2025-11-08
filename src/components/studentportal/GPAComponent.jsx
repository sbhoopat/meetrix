import React from 'react';

const GPAComponent = ({ gpa, semesterGrades }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#002133]">Current GPA: {gpa}</h2>

      <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-[#002133]">Semester Grades:</h3>
      <ul className="mt-2 space-y-2">
        {semesterGrades.map((grade, index) => (
          <li key={index} className="text-sm sm:text-base text-gray-700">
            {grade.subject}: {grade.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GPAComponent;
