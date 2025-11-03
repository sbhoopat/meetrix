import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const OrangeredButton = styled(Button)({
  backgroundColor: "#FF4500",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#e03e00",
  },
});

const CancelButton = styled(Button)({
  color: "#002133",
  textTransform: "none",
  borderColor: "#ccc",
});

export default function Staff() {
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "photo",
      headerName: "Photo",
      width: 100,
      renderCell: (params) =>
        params.value ? (
          <Avatar
            src={params.value}
            alt={params.row.name}
            sx={{ width: 40, height: 40 }}
          />
        ) : (
          <Avatar sx={{ width: 40, height: 40 }}>
            {params.row.name?.[0] || "?"}
          </Avatar>
        ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "mobileNumber", headerName: "Mobile Number", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.8 },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John Smith",
      mobileNumber: "9876543210",
      subject: "Mathematics",
      email: "john.smith@school.com",
      role: "Admin",
      photo: "",
    },
    {
      id: 2,
      name: "Alice Johnson",
      mobileNumber: "8765432109",
      subject: "Science",
      email: "alice.johnson@school.com",
      role: "User",
      photo: "",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const filteredRows = rows.filter((r) =>
    Object.values(r)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedRow({
      id: null,
      name: "",
      mobileNumber: "",
      subject: "",
      email: "",
      role: "User",
      photo: "",
    });
    setPreviewImage(null);
    setOpenDialog(true);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setPreviewImage(params.row.photo || null);
    setOpenDialog(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedRow((prev) => ({ ...prev, photo: reader.result }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (selectedRow.id) {
      setRows((prev) =>
        prev.map((r) => (r.id === selectedRow.id ? selectedRow : r))
      );
    } else {
      setRows((prev) => [
        ...prev,
        { ...selectedRow, id: prev.length + 1 },
      ]);
    }
    setOpenDialog(false);
    setSelectedRow(null);
    setPreviewImage(null);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="text-[#002133] font-bold">
          Staff Management
        </Typography>
        <OrangeredButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Staff
        </OrangeredButton>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm border border-gray-100 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent text-[#002133] text-sm w-full"
          />
        </div>
      </div>

      {/* Data Table */}
      <div
        style={{
          height: 500,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 12,
          padding: "1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F5F7FA",
              color: "#002133",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              color: "#002133",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(255,69,0,0.06)",
              cursor: "pointer",
            },
          }}
        />
      </div>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold" color="#002133">
            {selectedRow?.id ? "Edit Staff" : "Add New Staff"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          {selectedRow && (
            <Grid container spacing={2}>
              {/* Image Upload */}
              <Grid item xs={12} className="flex flex-col items-center gap-2">
                <Avatar
                  src={previewImage || ""}
                  alt="Staff"
                  sx={{ width: 80, height: 80 }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    textTransform: "none",
                    borderColor: "#FF4500",
                    color: "#FF4500",
                    "&:hover": { borderColor: "#e03e00", color: "#e03e00" },
                  }}
                >
                  Upload Photo
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={selectedRow.name}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Mobile Number"
                  fullWidth
                  value={selectedRow.mobileNumber}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      mobileNumber: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  fullWidth
                  value={selectedRow.subject}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      subject: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email ID"
                  fullWidth
                  value={selectedRow.email}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={selectedRow.role || ""}
                    label="Role"
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        role: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <CancelButton variant="outlined" onClick={() => setOpenDialog(false)}>
            Cancel
          </CancelButton>
          <OrangeredButton variant="contained" onClick={handleSave}>
            Save
          </OrangeredButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
