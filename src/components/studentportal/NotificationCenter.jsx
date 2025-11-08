import React, { useState } from 'react';
import NotificationCard from './NotificationCard';

const NotificationCenter = () => {
  // Sample notifications data
  const notificationsData = [
    {
      id: 1,
      title: 'New Assignment Posted',
      message: 'You have a new assignment for Mathematics. Check the details.',
      date: '2025-11-01',
      isRead: false,
    },
    {
      id: 2,
      title: 'Event Reminder',
      message: 'Don\'t forget about the Physics lecture tomorrow at 10 AM.',
      date: '2025-11-02',
      isRead: false,
    },
    {
      id: 3,
      title: 'New Grade Released',
      message: 'Your grade for the History Essay is now available.',
      date: '2025-10-30',
      isRead: true,
    },
    {
      id: 4,
      title: 'Reminder: Project Deadline',
      message: 'The deadline for your Computer Science project is coming up soon.',
      date: '2025-11-05',
      isRead: false,
    },
  ];

  const [notifications, setNotifications] = useState(notificationsData);

  // Mark a notification as read
  const handleMarkRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Delete a notification
  const handleDelete = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-semibold text-[#002133] mb-6">Notifications Center</h1>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDelete={handleDelete}
            onMarkRead={handleMarkRead}
          />
        ))
      ) : (
        <p className="text-gray-500 text-lg">No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationCenter;
