// TripTracking.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // backend socket

export default function TripTracking() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    socket.on("bus_update", (payload) => {
      // payload: { id, lat, lng, speed, delay }
      setBuses(prev => {
        const copy = [...prev];
        const idx = copy.findIndex(b => b.id === payload.id);
        if (idx === -1) return [...copy, payload];
        copy[idx] = payload;
        return copy;
      });
    });

    return () => socket.off("bus_update");
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Live Trips</h2>
      <div className="space-y-2">
        {buses.map(b => (
          <div key={b.id} className="p-3 border rounded flex justify-between">
            <div>
              <div className="font-semibold">Bus {b.id}</div>
              <div className="text-sm text-gray-600">Speed: {b.speed} km/h • Delay: {b.delay} min</div>
            </div>
            <div className="text-sm text-gray-600">{b.lat.toFixed(4)}, {b.lng.toFixed(4)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
