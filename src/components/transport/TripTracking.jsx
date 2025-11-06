import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import LiveBusLocationSender from "./locationsender/LiveBusLocationSender";
import { FaPhoneAlt } from "react-icons/fa"; // Call icon from React Icons

// Initialize socket.io
const socket = io("http://localhost:5000"); // Ensure this URL matches your backend URL

// Custom marker colors for statuses
const markerColors = {
  completed: "green",
  next: "#FF4C00", // Orangered for next stop
  pending: "#002133", // Dark blue for pending stops
};

// Helper to create circle markers with labels
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
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [buses, setBuses] = useState([]);
  const [routeProgress, setRouteProgress] = useState(0);

  // Example of multiple routes, each with its own stops and driver info
  const routesData = [
    {
      id: "route1",
      name: "Route 1 - School to Stop 3",
      distance: "12.5 km",
      estimatedTime: "15 mins",
      stops: [
        { id: 1, name: "School", lat: 17.421, lng: 78.469 },
        { id: 2, name: "Stop 1", lat: 17.425, lng: 78.475 },
        { id: 3, name: "Stop 2", lat: 17.428, lng: 78.482 },
        { id: 4, name: "Stop 3", lat: 17.433, lng: 78.490 },
        { id: 5, name: "Final Stop", lat: 17.438, lng: 78.495 },
      ],
      driver: {
        name: "Harris Whitaker",
        phoneNumber: "+1234567890",
        status: "In Transit",
        profilePicture: "https://randomuser.me/api/portraits/men/64.jpg",
      },
    },
    {
      id: "route2",
      name: "Route 2 - City to Airport",
      distance: "20.3 km",
      estimatedTime: "25 mins",
      stops: [
        { id: 1, name: "City Center", lat: 17.450, lng: 78.450 },
        { id: 2, name: "Suburb", lat: 17.455, lng: 78.460 },
        { id: 3, name: "Airport", lat: 17.465, lng: 78.475 },
      ],
      driver: {
        name: "John Doe",
        phoneNumber: "+1234567891",
        status: "In Transit",
        profilePicture: "https://randomuser.me/api/portraits/men/65.jpg",
      },
    },
  ];

  // Initialize the map once
  useEffect(() => {
    if (!mapRef.current) {
      const mapInstance = L.map("map").setView([17.421, 78.469], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);
      mapRef.current = mapInstance;
      setMap(mapInstance);
    }
  }, []);

  // Handle route selection
  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentStopIndex(0);
    setRouteProgress(0);
    if (map) {
      // Clear previous markers and lines
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker || layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      // Draw the route with lines and add the stops
      const latLngs = route.stops.map(stop => [stop.lat, stop.lng]);

      // Draw a line connecting all stops
      L.polyline(latLngs, { color: "#002133", weight: 3 }).addTo(map);

      // Add the selected route's stops to the map
      route.stops.forEach((stop, index) => {
        let color =
          index < currentStopIndex
            ? markerColors.completed
            : index === currentStopIndex
            ? markerColors.next
            : markerColors.pending;

        createMarker(stop.lat, stop.lng, color, stop.name).addTo(map);
      });
    }
  };

  // Handle bus live updates via Socket.io
  useEffect(() => {
    socket.on("mobile_location_update", (data) => {
      const { bus_id, lat, lng } = data;

      setBuses((prev) => {
        const copy = [...prev];
        const idx = copy.findIndex((b) => b.id === bus_id);
        if (idx === -1) return [...copy, { id: bus_id, lat, lng }];
        copy[idx] = { ...copy[idx], lat, lng };
        return copy;
      });

      // Update live marker on the map if a route is selected
      if (map && selectedRoute) {
        const liveIcon = L.icon({
          iconUrl:
            "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", // Bus icon
          iconSize: [40, 40],
        });

        L.marker([lat, lng], { icon: liveIcon })
          .addTo(map)
          .bindPopup(`Bus ${bus_id}: Lat: ${lat}, Lng: ${lng}`);
      }

      // Move stop index forward (simulate reaching stops)
      setCurrentStopIndex((prev) => {
        if (selectedRoute && prev < selectedRoute.stops.length - 1) return prev + 1;
        return prev;
      });

      // Update progress bar
      setRouteProgress((prev) => (prev + 1 <= 100 ? prev + 1 : 100));
    });

    return () => socket.off("mobile_location_update");
  }, [map, selectedRoute]);

  // Function to simulate calling the driver
  const handleCallDriver = (phoneNumber) => {
    alert(`Calling driver at ${phoneNumber}...`);
  };

  return (
    <div className="flex p-6 bg-white min-h-screen">
      {/* Left section: Route information only */}
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-xl mr-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#002133]">🚌 Live Trip Tracking</h2>

        {/* Routes with Driver and Trip Details */}
        <div className="space-y-2">
          {routesData.map((route) => (
            <div
              key={route.id}
              onClick={() => handleRouteSelect(route)}
              className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:bg-gray-100 transition duration-200 cursor-pointer shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{route.name}</h3>

              {/* Driver Info */}
              <div className="flex items-center mb-2">
                <img
                  src={route.driver?.profilePicture}
                  alt="Driver"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium text-white">{route.driver?.name}</p>
                  <p className="text-sm text-white">Status: {route.driver?.status}</p>
                </div>
                {/* Call Icon */}
                <button
                  onClick={() => handleCallDriver(route.driver?.phoneNumber)}
                  className="ml-4 p-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-full hover:scale-110 transform transition-all duration-300"
                >
                  <FaPhoneAlt size={24} />
                </button>
              </div>

              {/* Trip Details */}
              <div className="text-sm text-white">
                <p><strong>Distance:</strong> {route.distance}</p>
                <p><strong>Estimated Time:</strong> {route.estimatedTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right section: Map */}
      <div className="w-2/3 h-[600px] rounded-lg shadow-md bg-gray-100" id="map"></div>
    </div>
  );
}
