import React from "react";
import DataTable from "../components/DataTable";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#002133] mb-4">Dashboard</h2>
      <DataTable />
    </div>
  );
}
