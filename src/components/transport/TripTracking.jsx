import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import io from "socket.io-client";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import LiveBusLocationSender from "./locationsender/LiveBusLocationSender";
import { FaPhoneAlt } from "react-icons/fa";

const socket = io("http://localhost:5000");

const markerColors = {
  completed: "green",
  next: "#FF4C00",
  pending: "#002133",
};

const createMarker = (lat, lng, color, label) =>
  L.circleMarker([lat, lng], {
    radius: 10,
    color,
    fillColor: color,
    fillOpacity: 0.9,
  }).bindPopup(label);

const animateMarker = (marker, from, to, duration = 2000) => {
  const startTime = performance.now();

  const animate = (time) => {
    const t = Math.min((time - startTime) / duration, 1);
    const lat = from.lat + (to.lat - from.lat) * t;
    const lng = from.lng + (to.lng - from.lng) * t;
    marker.setLatLng([lat, lng]);
    if (t < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

export default function TripTracking() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [busMarker, setBusMarker] = useState(null);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [stopMarkers, setStopMarkers] = useState([]);
  const [routePolyline, setRoutePolyline] = useState(null);

  const routesData = [
    {
      id: "route1",
      name: "Route 1 - School to Stop 3",
      distance: "12.5 km",
      estimatedTime: "15 mins",
      stops: [
        { id: 1, name: "Miyapur", lat: 17.4981608, lng: 78.3567628 },
        { id: 2, name: "Mayuri Nagar", lat: 17.5128, lng: 78.3686 },
        { id: 3, name: "Nizampet", lat: 17.5164805, lng: 78.3766275 },
        { id: 4, name: "JNTUH", lat: 17.495924, lng: 78.392632 },
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
        { id: 1, name: "City Center", lat: 17.45, lng: 78.45 },
        { id: 2, name: "Suburb", lat: 17.455, lng: 78.46 },
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

  // Initialize map
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

  // Fetch OSRM route between all stops
  const fetchOSRMRoute = async (stops) => {
    try {
      const coordinates = stops.map((s) => `${s.lng},${s.lat}`).join(";");
      const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

      const response = await axios.get(url);
      const route = response.data.routes[0];

      const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

      if (routePolyline) map.removeLayer(routePolyline);

      const polyline = L.polyline(coords, {
        color: "#FF4C00",
        weight: 5,
        opacity: 0.8,
      }).addTo(map);

      setRoutePolyline(polyline);
      map.fitBounds(polyline.getBounds());
    } catch (err) {
      console.error("Error fetching OSRM route:", err);
    }
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentStopIndex(0);

    if (map) {
      // Remove old layers
      map.eachLayer((layer) => {
        if (
          layer instanceof L.Marker ||
          layer instanceof L.CircleMarker ||
          layer instanceof L.Polyline
        )
          map.removeLayer(layer);
      });

      // Draw OSRM route
      fetchOSRMRoute(route.stops);

      // Create stop markers
      const newStopMarkers = route.stops.map((stop, index) => {
        const color = index === 0 ? markerColors.next : markerColors.pending;
        const marker = createMarker(stop.lat, stop.lng, color, stop.name).addTo(map);
        return marker;
      });
      setStopMarkers(newStopMarkers);

      // Bus marker
      const busIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const bus = L.marker([route.stops[0].lat, route.stops[0].lng], {
        icon: busIcon,
      }).addTo(map);

      bus.bindPopup("🚌 Bus starting...");
      setBusMarker(bus);
    }
  };

  // Listen for live location updates
  useEffect(() => {
    if (!map || !selectedRoute) return;

    socket.on("mobile_location_update", (data) => {
      const { bus_id, lat, lng } = data;
      if (busMarker) {
        const from = busMarker.getLatLng();
        const to = { lat, lng };
        animateMarker(busMarker, from, to);

        const stops = selectedRoute.stops;
        let reachedIndex = currentStopIndex;

        for (let i = currentStopIndex; i < stops.length; i++) {
          const stop = stops[i];
          const distance = Math.sqrt(
            Math.pow(stop.lat - lat, 2) + Math.pow(stop.lng - lng, 2)
          );
          if (distance < 0.0008) reachedIndex = i;
        }

        if (reachedIndex !== currentStopIndex) {
          setCurrentStopIndex(reachedIndex);
          stopMarkers.forEach((marker, idx) => {
            const color =
              idx < reachedIndex
                ? markerColors.completed
                : idx === reachedIndex
                ? markerColors.next
                : markerColors.pending;
            marker.setStyle({ color, fillColor: color });
          });
        }
      }
    });

    return () => socket.off("mobile_location_update");
  }, [map, selectedRoute, busMarker, stopMarkers, currentStopIndex]);

  const handleCallDriver = (phoneNumber) => {
    alert(`📞 Calling driver at ${phoneNumber}...`);
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 bg-white min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-xl mb-6 lg:mb-0 lg:mr-6">
        <LiveBusLocationSender />
        <h2 className="text-2xl font-semibold mb-4 text-[#002133]">🚌 Live Trip Tracking</h2>

        <div className="space-y-3">
          {routesData.map((route) => (
            <div
              key={route.id}
              onClick={() => handleRouteSelect(route)}
              className={`w-full p-4 rounded-lg ${
                selectedRoute?.id === route.id
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
                  : "bg-white text-[#002133]"
              } hover:bg-gray-100 transition cursor-pointer shadow-md`}
            >
              <h3 className="text-lg font-semibold mb-2">{route.name}</h3>
              <div className="flex items-center mb-2">
                <img
                  src={route.driver.profilePicture}
                  alt="Driver"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">{route.driver.name}</p>
                  <p className="text-sm">Status: {route.driver.status}</p>
                </div>
                <button
                  onClick={() => handleCallDriver(route.driver.phoneNumber)}
                  className="ml-auto p-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-full hover:scale-110 transform transition-all duration-300"
                >
                  <FaPhoneAlt size={20} />
                </button>
              </div>
              <div className="text-sm">
                <p>
                  <strong>Distance:</strong> {route.distance}
                </p>
                <p>
                  <strong>Estimated Time:</strong> {route.estimatedTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full lg:w-2/3 h-[500px] lg:h-[600px] rounded-lg shadow-md bg-gray-100" id="map"></div>
    </div>
  );
}
