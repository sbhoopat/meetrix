import React from 'react';

const ScheduleCard = ({ title, time, location, type }) => {
  return (
    <div
      className={`p-4 bg-white border rounded-lg shadow-md mb-4 ${
        type === 'event' ? 'bg-blue-100' : 'bg-gray-100'
      } sm:p-5 md:p-6`}
    >
      <h3 className="text-xl sm:text-lg md:text-xl font-semibold text-[#002133]">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600">{time}</p>
      <p className="text-sm sm:text-base text-gray-500">{location}</p>
    </div>
  );
};

export default ScheduleCard;
