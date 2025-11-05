import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";

// Initialize socket.io
const socket = io("http://localhost:5000");

// Custom marker colors for statuses
const markerColors = {
  completed: "green",
  next: "blue",
  pending: "gray",
};

// Helper to make colored circle markers
const createMarker = (lat, lng, color, label) =>
  L.circleMarker([lat, lng], {
    radius: 10,
    color,
    fillColor: color,
    fillOpacity: 0.9,
  }).bindPopup(label);

export default function TripTracking() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [buses, setBuses] = useState([]);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  // Example static route (can be fetched from backend)
  const routeStops = [
    { id: 1, name: "School", lat: 17.421, lng: 78.469 },
    { id: 2, name: "Stop 1", lat: 17.425, lng: 78.475 },
    { id: 3, name: "Stop 2", lat: 17.428, lng: 78.482 },
    { id: 4, name: "Stop 3", lat: 17.433, lng: 78.490 },
    { id: 5, name: "Final Stop", lat: 17.438, lng: 78.495 },
  ];

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      const mapInstance = L.map("map").setView([17.421, 78.469], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);
      mapRef.current = mapInstance;
      setMap(mapInstance);
    }
  }, []);

  // Add stops to the map
  useEffect(() => {
    if (!map) return;
    routeStops.forEach((stop, index) => {
      let color =
        index < currentStopIndex
          ? markerColors.completed
          : index === currentStopIndex
          ? markerColors.next
          : markerColors.pending;

      createMarker(stop.lat, stop.lng, color, stop.name).addTo(map);
    });
  }, [map, currentStopIndex]);

  // Handle bus live updates via Socket.io
  useEffect(() => {
    socket.on("bus_update", (payload) => {
      setBuses((prev) => {
        const copy = [...prev];
        const idx = copy.findIndex((b) => b.id === payload.id);
        if (idx === -1) return [...copy, payload];
        copy[idx] = payload;
        return copy;
      });

      // Move stop index forward (simulate reaching stops)
      setCurrentStopIndex((prev) => {
        if (prev < routeStops.length - 1) return prev + 1;
        return prev;
      });

      // Update live marker
      if (map) {
        const liveIcon = L.icon({
          iconUrl:
            "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", // bus icon
          iconSize: [40, 40],
        });
        L.marker([payload.lat, payload.lng], { icon: liveIcon })
          .addTo(map)
          .bindPopup(`Bus ${payload.id}: ${payload.speed} km/h`);
      }
    });

    return () => socket.off("bus_update");
  }, [map]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        🚌 Live Trip Tracking
      </h2>
      <div id="map" className="w-full h-[600px] rounded-lg shadow-md"></div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Trip Progress</h3>
        <div className="flex flex-wrap gap-3">
          {routeStops.map((stop, index) => {
            const color =
              index < currentStopIndex
                ? "text-green-600"
                : index === currentStopIndex
                ? "text-blue-600"
                : "text-gray-500";
            return (
              <div key={stop.id} className={`font-medium ${color}`}>
                ⬤ {stop.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
