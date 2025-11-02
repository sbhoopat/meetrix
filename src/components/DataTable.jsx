import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// Custom MUI styles
const StyledButton = styled(Button)({
  backgroundColor: "#002133",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#00394d",
  },
});

const StyledToolbarButton = styled(Button)({
  color: "#002133 !important",
  borderColor: "#002133 !important",
  textTransform: "none",
  fontWeight: 600,
  backgroundColor: "transparent !important",
  "&:hover": {
    backgroundColor: "#002133 !important",
    color: "#fff !important",
    borderColor: "#002133 !important",
  },
});


function CustomToolbar() {
  return (
    <GridToolbarContainer className="flex justify-end gap-2 p-2">
      <StyledToolbarButton variant="outlined">
        <GridToolbarColumnsButton />
      </StyledToolbarButton>
      <StyledToolbarButton variant="outlined">
        <GridToolbarFilterButton />
      </StyledToolbarButton>
      <StyledToolbarButton variant="outlined">
        <GridToolbarDensitySelector />
      </StyledToolbarButton>
      <StyledToolbarButton variant="outlined">
        <GridToolbarExport />
      </StyledToolbarButton>
    </GridToolbarContainer>
  );
}

export default function DataTable() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", mobile: "1234567890" },
    { id: 2, name: "Jane Smith", mobile: "9876543210" },
    { id: 3, name: "Alex Johnson", mobile: "9876501234" },
  ]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "mobile", headerName: "Mobile Number", flex: 1 },
  ];

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleSave = () => {
    setRows((prev) =>
      prev.map((r) => (r.id === selectedRow.id ? selectedRow : r))
    );
    setOpen(false);
  };

  return (
    <div
      style={{
        height: 480,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: "1rem",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowClick={handleRowClick}
        checkboxSelection
        disableRowSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#E6EBF0",
            color: "#002133",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: "#002133",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#002133 !important",
          },
        }}
      />

      {/* Dialog (Popup) */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: { borderRadius: 16, padding: "10px 20px" },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#002133",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Edit Row
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Name"
            value={selectedRow?.name || ""}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Mobile"
            value={selectedRow?.mobile || ""}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, mobile: e.target.value })
            }
            fullWidth
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", gap: 1 }}>
          <StyledButton onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </StyledButton>
          <StyledButton onClick={handleSave} variant="contained">
            Save
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
