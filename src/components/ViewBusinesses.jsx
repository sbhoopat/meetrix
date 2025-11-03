import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Checkbox,
    FormControlLabel,
    IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function ViewBusiness() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [rows, setRows] = useState([
        {
            id: 1,
            businessType: "School",
            businessName: "Green Valley High School",
            fields: [
                { fieldName: "Student Name", fieldType: "text", isRequired: true },
                { fieldName: "Admission Date", fieldType: "date", isRequired: true },
                { fieldName: "Class", fieldType: "dropdown", isRequired: false },
                { fieldName: "Parent Contact", fieldType: "text", isRequired: false },
            ],
        },
        {
            id: 2,
            businessType: "Infrastructure",
            businessName: "Metro City Builders",
            fields: [
                { fieldName: "Project Name", fieldType: "text", isRequired: true },
                { fieldName: "Start Date", fieldType: "date", isRequired: true },
                { fieldName: "End Date", fieldType: "date", isRequired: false },
                { fieldName: "Location", fieldType: "text", isRequired: true },
            ],
        },
        {
            id: 3,
            businessType: "School",
            businessName: "Sunrise Public School",
            fields: [
                { fieldName: "Teacher Name", fieldType: "text", isRequired: true },
                { fieldName: "Subject", fieldType: "dropdown", isRequired: false },
            ],
        },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const columns = [
        { field: "businessType", headerName: "Business Type", width: 180 },
        { field: "businessName", headerName: "Business Name", width: 250 },
        {
            field: "fields",
            headerName: "Fields (as JSON)",
            flex: 1,
            valueGetter: (params) => JSON.stringify(params.row.fields),
            renderCell: (params) => (
                <span
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontFamily: "monospace",
                        fontSize: "13px",
                        color: "#002133",
                    }}
                    title={params.value}
                >
                    {params.value}
                </span>
            ),
        },
    ];

    const filteredRows = rows.filter((row) => {
        const matchesType = filterType ? row.businessType === filterType : true;
        const matchesSearch =
            row.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            JSON.stringify(row.fields)
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleRowClick = (params) => {
        setSelectedRow({ ...params.row });
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedRow(null);
    };

    const handleSave = () => {
        setRows((prev) =>
            prev.map((r) => (r.id === selectedRow.id ? selectedRow : r))
        );
        setOpenDialog(false);
    };

    const handleAddField = () => {
        const updatedFields = [
            ...selectedRow.fields,
            { fieldName: "", fieldType: "text", isRequired: false },
        ];
        setSelectedRow({ ...selectedRow, fields: updatedFields });
    };

    const handleDeleteField = (index) => {
        const updatedFields = selectedRow.fields.filter((_, i) => i !== index);
        setSelectedRow({ ...selectedRow, fields: updatedFields });
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h5" className="text-[#002133] font-bold">
                    View Businesses
                </Typography>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm border border-gray-100 w-full md:w-1/3">
                    <SearchIcon sx={{ color: "#002133" }} />
                    <input
                        type="text"
                        placeholder="Search by name or field..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="outline-none bg-transparent text-[#002133] text-sm w-full"
                    />
                </div>

                <TextField
                    select
                    label="Filter by Business Type"
                    size="small"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="School">School</MenuItem>
                    <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                </TextField>
            </div>

            {/* Table */}
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
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
            >
                <DialogTitle>
                    <Typography variant="h6" fontWeight="bold" color="#002133">
                        {selectedRow?.businessName || "Business Details"}
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    {selectedRow && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Business Type"
                                    fullWidth
                                    value={selectedRow.businessType}
                                    onChange={(e) =>
                                        setSelectedRow({
                                            ...selectedRow,
                                            businessType: e.target.value,
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Business Name"
                                    fullWidth
                                    value={selectedRow.businessName}
                                    onChange={(e) =>
                                        setSelectedRow({
                                            ...selectedRow,
                                            businessName: e.target.value,
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <div className="flex justify-between items-center mt-3 mb-2">
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600, color: "#002133" }}
                                    >
                                        Fields
                                    </Typography>
                                    <Button
                                        startIcon={<AddCircleOutlineIcon />}
                                        variant="contained"
                                        size="small"
                                        onClick={handleAddField}
                                        sx={{
                                            backgroundColor: "#FF4500",
                                            color: "#fff",
                                            fontWeight: 600,
                                            textTransform: "none",
                                            "&:hover": {
                                                backgroundColor: "#e03e00",
                                            },
                                        }}
                                    >
                                        Add Field
                                    </Button>
                                </div>
                            </Grid>

                            {selectedRow.fields.map((field, index) => (
                                <React.Fragment key={index}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Field Name"
                                            fullWidth
                                            value={field.fieldName}
                                            onChange={(e) => {
                                                const updated = [...selectedRow.fields];
                                                updated[index].fieldName = e.target.value;
                                                setSelectedRow({ ...selectedRow, fields: updated });
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Field Type"
                                            select
                                            fullWidth
                                            value={field.fieldType}
                                            onChange={(e) => {
                                                const updated = [...selectedRow.fields];
                                                updated[index].fieldType = e.target.value;
                                                setSelectedRow({ ...selectedRow, fields: updated });
                                            }}
                                        >
                                            <MenuItem value="text">Text</MenuItem>
                                            <MenuItem value="date">Date</MenuItem>
                                            <MenuItem value="dropdown">Dropdown</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={10} sm={3}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={field.isRequired}
                                                    onChange={(e) => {
                                                        const updated = [...selectedRow.fields];
                                                        updated[index].isRequired = e.target.checked;
                                                        setSelectedRow({ ...selectedRow, fields: updated });
                                                    }}
                                                />
                                            }
                                            label="Required"
                                        />
                                    </Grid>

                                    <IconButton
                                        onClick={() => handleDeleteField(index)}
                                        sx={{
                                            color: "#FF4500",
                                            // backgroundColor: "rgba(255, 69, 0, 0.1)",
                                            "&:hover": {
                                                color: "#fff",
                                                backgroundColor: "#FF4500",
                                            },
                                            borderRadius: 2,
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                </React.Fragment>
                            ))}
                        </Grid>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <CancelButton variant="outlined" onClick={handleClose}>
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
