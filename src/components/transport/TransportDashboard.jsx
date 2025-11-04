// TransportDashboard.jsx
import React from "react";
// import DriverSummary from "./DriverSummary";
// import FleetSummary from "./FleetSummary";
import AnalyticsCard from "./AnalyticsCard";

export default function TransportDashboard() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-[#002133] mb-4">Transport Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* <DriverSummary />
        <FleetSummary /> */}
        <AnalyticsCard />
      </div>

      {/* Recent Trips / Alerts */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-lg font-medium mb-2">Live Trips</h2>
          <p className="text-sm text-gray-600">Active buses: 4 • Average delay: 6 min</p>
          {/* Could embed TripTracking component here */}
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-lg font-medium mb-2">Latest Alerts</h2>
          <ul className="space-y-2">
            <li className="text-sm">Bus 12 over-speeding detected (80 km/h)</li>
            <li className="text-sm">Route A delayed by 12 mins</li>
            <li className="text-sm">Driver license expiring: R. Kumar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
