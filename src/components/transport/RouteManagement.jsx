import React, { useState } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl/maplibre";
import axios from "axios";

export default function RouteManagement() {
  const [stops, setStops] = useState([
    { id: 1, lat: 17.42, lng: 78.48, label: "Stop A" },
    { id: 2, lat: 17.39, lng: 78.49, label: "Stop B" },
  ]);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/transport/ai/optimize-route", { stops });
      setOptimizedRoute(res.data.route || null);
      setStops(res.data.optimizedStops || stops);
    } catch (err) {
      console.error("Error optimizing route:", err);
      alert("AI optimization failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const routeGeoJSON = optimizedRoute
    ? {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: optimizedRoute.map((r) => [r.lng, r.lat]),
        },
      }
    : null;

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#002133]">
          Trip & Route Management
        </h2>
        <button
          onClick={handleOptimize}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-[#FF4500]"
          }`}
        >
          {loading ? "Optimizing..." : "🚀 AI Optimize Route"}
        </button>
      </div>

      {/* Map Container */}
      <div style={{ height: "calc(100vh - 150px)" }}>
        <Map
          initialViewState={{
            latitude: 17.385,
            longitude: 78.4867,
            zoom: 11,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          {/* Markers for stops */}
          {stops.map((stop) => (
            <Marker
              key={stop.id}
              latitude={stop.lat}
              longitude={stop.lng}
              onClick={() => setSelectedStop(stop)}
            >
              <div
                title={stop.label}
                className="bg-[#FF4500] w-4 h-4 rounded-full border-2 border-white cursor-pointer"
              />
            </Marker>
          ))}

          {/* Popup for selected stop */}
          {selectedStop && (
            <Popup
              latitude={selectedStop.lat}
              longitude={selectedStop.lng}
              onClose={() => setSelectedStop(null)}
              closeButton={true}
              closeOnClick={false}
              offset={15}
            >
              <div>
                <strong>{selectedStop.label}</strong>
                <p>
                  Lat: {selectedStop.lat.toFixed(3)}, Lng:{" "}
                  {selectedStop.lng.toFixed(3)}
                </p>
              </div>
            </Popup>
          )}

          {/* Route Line (optimized route) */}
          {routeGeoJSON && (
            <Source id="route" type="geojson" data={routeGeoJSON}>
              <Layer
                id="route-layer"
                type="line"
                paint={{
                  "line-color": "#FF4500",
                  "line-width": 4,
                }}
              />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
}
