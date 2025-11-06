import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  

const LiveBusLocationSender = () => {
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Check if the socket connection is established
    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from the WebSocket server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = { 
            bus_id: 2, // Unique bus identifier
            name: "Stop 1",
            lat: position.coords.latitude,
            lng: position.coords.longitude 
          };

          console.log('Sending location:', coords);
          socket.emit('mobile_location_update', coords); // Send location update to backend
        },
        (error) => console.error('Error getting location:', error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      alert('Geolocation is not supported in this browser!');
    }
  };

  const handleButtonClick = () => {
    setIsTracking(true);
    sendLocation(); // Send the location once the button is clicked
    setIsTracking(false); // Reset tracking state after sending
  };

  return (
    <div>
      <button 
        onClick={handleButtonClick} 
        disabled={isTracking}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {isTracking ? 'Sending Location...' : 'Send Location'}
      </button>
    </div>
  );
};

export default LiveBusLocationSender;
