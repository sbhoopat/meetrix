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
  MenuItem,
  Grid,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// --- Styled Buttons ---
const OrangeredButton = styled(Button)({
  backgroundColor: "#FF4500",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#e03e00",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  },
});

const CancelButton = styled(Button)({
  color: "#002133",
  textTransform: "none",
  borderColor: "#ccc",
});

export default function AdmissionEnquiry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      studentName: "John Doe",
      gender: "Male",
      dob: "2014-06-15",
      age: "10 Years 3 Months",
      currentSchool: "ABC Public School",
      currentClass: "IV",
      soughtClass: "V",
      motherName: "Jane Doe",
      fatherName: "Robert Doe",
      mobile: "9876543210",
      email: "john@example.com",
      address: "123 Park Avenue, City",
    },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const columns = [
    { field: "studentName", headerName: "Student Name", flex: 1, minWidth: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "dob", headerName: "Date of Birth", width: 130 },
    { field: "currentClass", headerName: "Current Class", width: 120 },
    { field: "soughtClass", headerName: "Admission Class", width: 150 },
    { field: "mobile", headerName: "Mobile No", width: 130 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  ];

  const filteredRows = rows.filter((r) =>
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setSelectedRow({
      id: null,
      studentName: "",
      gender: "",
      dob: "",
      age: "",
      currentSchool: "",
      currentClass: "",
      soughtClass: "",
      motherName: "",
      fatherName: "",
      mobile: "",
      email: "",
      address: "",
    });
    setOpenDialog(true);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleSave = () => {
    if (selectedRow.id) {
      setRows((prev) =>
        prev.map((r) => (r.id === selectedRow.id ? selectedRow : r))
      );
    } else {
      setRows((prev) => [...prev, { ...selectedRow, id: prev.length + 1 }]);
    }
    setOpenDialog(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <Typography
          variant={isMobile ? "h6" : "h5"}
          className="text-[#002133] font-bold"
        >
          Admission Enquiry
        </Typography>
        <OrangeredButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          fullWidth={isMobile}
        >
          Add New Enquiry
        </OrangeredButton>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm border border-gray-100 w-full md:w-1/3">
          <SearchIcon sx={{ color: "#002133" }} />
          <input
            type="text"
            placeholder="Search by student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent text-[#002133] text-sm w-full"
          />
        </div>
      </div>

      {/* Responsive Table / Card View */}
      {!isMobile ? (
        <div
          style={{
            height: isTablet ? 450 : 500,
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
            onRowClick={(params) => handleRowClick(params.row)}
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
      ) : (
        // --- Card View for Mobile ---
        <div className="grid grid-cols-1 gap-4">
          {filteredRows.map((row) => (
            <Card
              key={row.id}
              className="rounded-2xl shadow-md border border-gray-100"
              onClick={() => handleRowClick(row)}
            >
              <CardContent>
                <Typography variant="h6" className="font-semibold text-[#FF4500]">
                  {row.studentName}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  <strong>Gender:</strong> {row.gender}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>DOB:</strong> {row.dob}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Class:</strong> {row.currentClass} → {row.soughtClass}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Mobile:</strong> {row.mobile}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Email:</strong> {row.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Address:</strong> {row.address}
                </Typography>
              </CardContent>
              <CardActions className="flex justify-end">
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleRowClick(row)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
        PaperProps={{
          sx: { borderRadius: isMobile ? 0 : 3, p: 2 },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold" color="#002133">
            {selectedRow?.id ? "Edit Enquiry" : "New Enquiry"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          {selectedRow && (
            <Grid container spacing={2}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="student-info"
                  id="student-info-header"
                >
                  <Typography className="font-semibold">Student Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Student Name"
                        fullWidth
                        value={selectedRow.studentName}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, studentName: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Gender"
                        select
                        fullWidth
                        value={selectedRow.gender}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, gender: e.target.value })
                        }
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={selectedRow.dob}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, dob: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Current Age"
                        fullWidth
                        value={selectedRow.age}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, age: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="parent-info"
                  id="parent-info-header"
                >
                  <Typography className="font-semibold">Parent Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mother's Name"
                        fullWidth
                        value={selectedRow.motherName}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, motherName: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Father's Name"
                        fullWidth
                        value={selectedRow.fatherName}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, fatherName: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="contact-info"
                  id="contact-info-header"
                >
                  <Typography className="font-semibold">Contact Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile No"
                        fullWidth
                        value={selectedRow.mobile}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, mobile: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        fullWidth
                        value={selectedRow.email}
                        onChange={(e) =>
                          setSelectedRow({ ...selectedRow, email: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="address-info"
                  id="address-info-header"
                >
                  <Typography className="font-semibold">Residential Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Address"
                    fullWidth
                    multiline
                    rows={2}
                    value={selectedRow.address}
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, address: e.target.value })
                    }
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <CancelButton variant="outlined" onClick={handleClose} fullWidth={isMobile}>
            Cancel
          </CancelButton>
          <OrangeredButton
            variant="contained"
            onClick={handleSave}
            fullWidth={isMobile}
          >
            Save
          </OrangeredButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
