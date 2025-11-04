// StudentRoutes.jsx (simplified)
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, MenuItem, Select, TextField } from "@mui/material";

export default function StudentRoutes() {
  const [rows] = useState([
    { id: 1, student: "Anu", grade: "5", route: "R1", stop: "Stop A" },
    { id: 2, student: "Kiran", grade: "6", route: "R2", stop: "Stop B" },
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Student Routes & Stops</h2>

      <div className="mb-4 flex gap-3">
        <TextField select label="Route" size="small" sx={{ minWidth: 160 }}>
          <MenuItem value="R1">Route R1</MenuItem>
          <MenuItem value="R2">Route R2</MenuItem>
        </TextField>
        <Button variant="contained" color="warning">Assign Selected</Button>
      </div>

      <div style={{ height: 480 }}>
        <DataGrid rows={rows} columns={[
          { field: "student", headerName: "Student", flex: 1 },
          { field: "grade", headerName: "Class", width: 100 },
          { field: "route", headerName: "Route", width: 120 },
          { field: "stop", headerName: "Stop", width: 160 },
        ]} checkboxSelection />
      </div>
    </div>
  );
}
