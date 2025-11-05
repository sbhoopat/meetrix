import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  

const LiveBusLocationSender = () => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            bus_id: "bus_123",  // Unique identifier for each bus/driver
          };

          console.log('Sending location:', coords);
          socket.emit('send_location', coords);
        },
        (error) => console.error('Error getting location:', error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
 
      return () => navigator.geolocation.clearWatch(watchId);  // Clean up on unmount
    } else {
      alert('Geolocation is not supported in this browser!');
    }
  }, []);

  return <h3></h3>;
};

export default LiveBusLocationSender;
