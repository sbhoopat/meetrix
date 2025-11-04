// ParentTrackingWidget.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ParentTrackingWidget({ busId }) {
  const [bus, setBus] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/transport/bus/${busId}/status`);
      setBus(res.data);
    };
    fetch();
    // optionally subscribe to socket updates
  }, [busId]);

  if (!bus) return null;
  return (
    <div className="fixed right-6 bottom-6 w-80 bg-white p-3 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Bus {bus.id} • ETA {bus.eta} min</div>
        <div className="text-sm text-gray-600">{bus.status}</div>
      </div>
      <div className="mt-2 text-sm text-gray-700">
        Location: {bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}
      </div>
      <div className="mt-3">
        <button className="w-full bg-[#FF4500] text-white py-2 rounded">Track on map</button>
      </div>
    </div>
  );
}
