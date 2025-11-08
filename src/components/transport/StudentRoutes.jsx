import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, MenuItem, Select, TextField } from "@mui/material";

export default function StudentRoutes() {
  const [rows] = useState([
    { id: 1, student: "Anu", grade: "5", route: "R1", stop: "Stop A" },
    { id: 2, student: "Kiran", grade: "6", route: "R2", stop: "Stop B" },
  ]);
  
  const [selectedRoute, setSelectedRoute] = useState("");

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Student Routes & Stops</h2>

      {/* Controls Section */}
      <div className="mb-4 flex flex-wrap gap-3">
        <TextField
          select
          label="Route"
          size="small"
          sx={{ minWidth: 160, flex: 1 }}
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
        >
          <MenuItem value="R1">Route R1</MenuItem>
          <MenuItem value="R2">Route R2</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="warning"
          sx={{ maxWidth: "200px", flexShrink: 0 }}
        >
          Assign Selected
        </Button>
      </div>

      {/* DataGrid Section */}
      <div style={{ height: "calc(100vh - 220px)" }}>
        <DataGrid
          rows={rows}
          columns={[
            { field: "student", headerName: "Student", flex: 1 },
            { field: "grade", headerName: "Class", width: 100 },
            { field: "route", headerName: "Route", width: 120 },
            { field: "stop", headerName: "Stop", width: 160 },
          ]}
          checkboxSelection
          pageSize={5}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
