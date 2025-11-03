// NotificationCard.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const NotificationCard = ({ notification, onDelete, onMarkRead }) => {
  return (
    <div
      className={`p-4 bg-white border rounded-lg shadow-md mb-4 ${
        notification.isRead ? 'bg-gray-100' : 'bg-orange-100'
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#002133]">{notification.title}</h3>
          <p className="text-sm text-gray-600">{notification.message}</p>
        </div>
        <button onClick={() => onDelete(notification.id)} className="text-gray-500">
          <FaTimes size={18} />
        </button>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-500">{notification.date}</span>
        {!notification.isRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-sm text-blue-500 hover:underline"
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
