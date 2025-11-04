// AlertsAndSafety.jsx (simplified)
import React from "react";

export default function AlertsAndSafety() {
  const sampleAlerts = [
    { id: 1, type: "overspeed", message: "Bus 12 speed 85 km/h", severity: "high", time: "10:32 AM" },
    { id: 2, type: "geofence", message: "Bus 5 deviated from route", severity: "medium", time: "09:10 AM" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Safety & Alerts</h2>
      <div className="space-y-3">
        {sampleAlerts.map(a => (
          <div key={a.id} className={`p-3 rounded border ${a.severity === "high" ? "bg-red-50" : "bg-yellow-50"}`}>
            <div className="font-medium">{a.message}</div>
            <div className="text-sm text-gray-600">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
