import React from "react";

export default function AlertsAndSafety() {
  const sampleAlerts = [
    { id: 1, type: "overspeed", message: "Bus 12 speed 85 km/h", severity: "high", time: "10:32 AM" },
    { id: 2, type: "geofence", message: "Bus 5 deviated from route", severity: "medium", time: "09:10 AM" },
    { id: 3, type: "overspeed", message: "Bus 3 speed 95 km/h", severity: "high", time: "08:45 AM" },
    { id: 4, type: "geofence", message: "Bus 7 deviated from route", severity: "medium", time: "07:30 AM" },
    // Add more sample alerts if needed
  ];

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      <h2 className="text-2xl sm:text-xl font-semibold mb-6 text-[#002133]">Safety & Alerts</h2>
      <div className="space-y-4 max-h-screen overflow-y-auto">
        {sampleAlerts.map((a) => (
          <div
            key={a.id}
            className={`p-4 sm:p-3 rounded-lg shadow-sm border transition-all duration-200 max-w-full ${
              a.severity === "high" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="font-medium text-[#002133] text-base sm:text-sm">{a.message}</div>
            <div className="text-sm text-gray-600">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
