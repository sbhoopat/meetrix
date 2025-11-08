import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";

export default function DriverManagement() {
  const [rows, setRows] = useState([
    { id: 1, name: "Raju Kumar", license: "DL12345", phone: "9876543210", status: "Active", lastTraining: "2025-02-12" },
    { id: 2, name: "S. Patel", license: "DL98765", phone: "9876501234", status: "Active", lastTraining: "2024-09-18" },
  ]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "license", headerName: "License", width: 140 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "lastTraining", headerName: "Training", width: 140 },
  ];

  const handleRowClick = (p) => { setSelected(p.row); setOpen(true); };
  const handleSave = () => {
    // call backend to save
    setOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#002133]">Driver Management</h2>
        <Button 
          variant="contained" 
          color="warning" 
          onClick={() => { setSelected({}); setOpen(true); }}
          className="text-sm sm:text-base"
        >
          Add Driver
        </Button>
      </div>

      {/* Responsive Table */}
      <div style={{ height: 480 }} className="w-full overflow-x-auto">
        <DataGrid rows={rows} columns={columns} pageSize={10} onRowClick={handleRowClick} />
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle className="text-xl">{selected?.id ? "Edit Driver" : "Add Driver"}</DialogTitle>
        <DialogContent>
          <TextField 
            label="Name" 
            fullWidth 
            margin="dense" 
            defaultValue={selected?.name || ""} 
            className="text-sm sm:text-base"
          />
          <TextField 
            label="License" 
            fullWidth 
            margin="dense" 
            defaultValue={selected?.license || ""} 
            className="text-sm sm:text-base"
          />
          <TextField 
            label="Phone" 
            fullWidth 
            margin="dense" 
            defaultValue={selected?.phone || ""} 
            className="text-sm sm:text-base"
          />
          <TextField 
            label="Last Training" 
            type="date" 
            fullWidth 
            margin="dense" 
            defaultValue={selected?.lastTraining || ""} 
            InputLabelProps={{ shrink: true }} 
            className="text-sm sm:text-base"
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button onClick={() => setOpen(false)} className="text-sm sm:text-base">Cancel</Button>
            <Button variant="contained" color="warning" onClick={handleSave} className="text-sm sm:text-base">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
