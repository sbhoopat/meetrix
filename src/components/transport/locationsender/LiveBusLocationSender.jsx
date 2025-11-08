import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const markerColors = {
  completed: "green",
  next: "#FF4C00",
  pending: "#002133",
};

const LiveBusLocationSender = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  // Define route stops (Hyderabad example)
  const stops = [
    { id: 1, name: "Miyapur", lat: 17.4981608, lng: 78.3567628 },
    { id: 2, name: "Mayuri Nagar", lat: 17.5128, lng: 78.3686 },
    { id: 3, name: "Nizampet", lat: 17.5164805, lng: 78.3766275 },
    { id: 4, name: "JNTUH", lat: 17.495924, lng: 78.392632 },
  ];

  // Function to fetch OSRM route between two stops
  const fetchRoute = async (start, end) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map((coord) => ({
          lat: coord[1],
          lng: coord[0],
        }));
      } else {
        console.error("No route found from OSRM.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching OSRM route:", error);
      return [];
    }
  };
  // Function to simulate bus movement along the route
  const simulateBusMovement = async (fromStop, toStop, bus_id = 2, intervalMs = 1000) => {
  const routeCoords = await fetchRoute(fromStop, toStop);  // Fetch the real route from OSRM
  if (routeCoords.length === 0) return;  // If no route found, exit
  // Loop through each coordinate in the route
  for (let index = 0; index < routeCoords.length; index++) {
    const point = routeCoords[index];  // Get current coordinate from the route

    const coords = {
      bus_id,
      name: `Bus ${bus_id}`,
      lat: point.lat,
      lng: point.lng,
    };

    console.log("📡 Sending location:", coords);
    socket.emit("mobile_location_update", coords);  // Send current coordinate to backend

    // Wait for the specified interval before sending the next coordinate
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  console.log(`✅ Reached ${toStop.name}`);
  setCurrentStopIndex((prev) => prev + 1);  // Move to next stop
};


  // Start the tracking simulation through the entire route
  const startTracking = () => {
    if (isTracking) return;

    setIsTracking(true);
    setCurrentStopIndex(0);

    console.log("🚌 Starting route tracking...");

    let index = 0;
    const moveToNextStop = () => {
      if (index < stops.length - 1) {
        simulateBusMovement(stops[index], stops[index + 1]);
        setTimeout(moveToNextStop, 31000); // 31 sec (30 steps x 1s + buffer)
        index++;
      } else {
        console.log("🏁 Route completed!");
        setIsTracking(false);
      }
    };

    moveToNextStop();
  };

  return (
    <div className="p-4">
      <button
        onClick={startTracking}
        disabled={isTracking}
        className={`px-4 py-2 rounded text-white ${
          isTracking
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isTracking ? "Tracking in Progress..." : "Start OSRM Bus Tracking"}
      </button>

      {isTracking && (
        <p className="mt-2 text-sm text-gray-600">
          Moving from {stops[currentStopIndex]?.name} →{" "}
          {stops[currentStopIndex + 1]?.name || "End"}
        </p>
      )}
    </div>
  );
};

export default LiveBusLocationSender;
