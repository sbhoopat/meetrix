import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaPlus,
  FaGasPump,
  FaTools,
  FaShieldAlt,
  FaMoneyBill,
  FaBusAlt,
  FaRupeeSign,
  FaCog,
  FaFilePdf,
} from "react-icons/fa";
import MeetrixLogo from "../../assets/meetrix_logo.png";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = ["#FF4500", "#007bff", "#28a745", "#20c997", "#fd7e14", "#6f42c1"];

const TransportFinance = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    vehicleNumber: "",
    category: "Fuel",
    amount: "",
    date: "",
    notes: "",
  });

  const pdfRef = useRef();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transport/finance");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/transport/finance/add", form);
      setForm({ vehicleNumber: "", category: "Fuel", amount: "", date: "", notes: "" });
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const totalAmount = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const categoryTotals = Object.values(
    expenses.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || { name: item.category, value: 0 };
      acc[item.category].value += parseFloat(item.amount);
      return acc;
    }, {})
  );

  const columns = [
    {
      field: "vehicleNumber",
      headerName: "Vehicle No",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaBusAlt color="#FF4500" /> {params.value}
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => {
        const iconMap = {
          Fuel: <FaGasPump color="#28a745" />,
          Maintenance: <FaTools color="#007bff" />,
          Tyres: <FaCog color="#6f42c1" />,
          Insurance: <FaShieldAlt color="#fd7e14" />,
          Other: <FaMoneyBill color="#20c997" />,
        };
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {iconMap[params.value] || <FaMoneyBill />} {params.value}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount (₹)",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FaRupeeSign size={12} /> {params.value}
        </div>
      ),
    },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1.5 },
  ];

  // ✅ Fixed PDF Export (multi-page + no PNG signature error)
  const handleDownloadPDF = async () => {
    const input = pdfRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
    const pageWidth = 190;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: input.scrollWidth,
      });

      // ✅ Convert to JPEG to avoid PNG decode errors
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // Header section
      const logoImg = new Image();
      logoImg.src = MeetrixLogo;

      await new Promise((resolve) => {
        logoImg.onload = resolve;
      });

      pdf.addImage(logoImg, "PNG", 10, 8, 20, 20);
      pdf.setFontSize(18);
      pdf.setTextColor("#FF4500");
      pdf.text("EduConnect Transport Finance Report", 35, 20);
      pdf.setFontSize(11);
      pdf.setTextColor("#333");
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 35, 27);

      let heightLeft = imgHeight;
      let position = 35;

      pdf.addImage(imgData, "JPEG", margin, position, pageWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.height - 35;

      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight + 35;
        pdf.addImage(imgData, "JPEG", margin, position, pageWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.height;
      }

      pdf.save(`EduConnect_Transport_Finance_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "white", minHeight: "100vh" }} ref={pdfRef}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#002133]">
          Transport Finance Dashboard
        </h2>
        <div className="flex items-center gap-3">
          <Typography variant="h6" color="#FF4500">
            ₹ {totalAmount.toLocaleString("en-IN")}
          </Typography>
          <FaRupeeSign size={22} className="text-[#FF4500]" />
        </div>
      </div>

      {/* Chart Section */}
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 4, borderRadius: "12px", background: "#f9f9f9" }}
      >
        <Typography variant="h6" mb={2}>
          Expense Distribution by Category
        </Typography>
        {categoryTotals.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryTotals}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {categoryTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No expenses recorded yet.
          </Typography>
        )}
      </Paper>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          background: "#f9f9f9",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <TextField
          label="Vehicle Number"
          name="vehicleNumber"
          value={form.vehicleNumber}
          onChange={handleChange}
          size="small"
          required
          sx={{ flex: 1 }}
        />
        <TextField
          select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          size="small"
          sx={{ flex: 1 }}
        >
          <MenuItem value="Fuel">Fuel</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Tyres">Tyres</MenuItem>
          <MenuItem value="Insurance">Insurance</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Amount (₹)"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          size="small"
          required
          sx={{ flex: 1 }}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          size="small"
          required
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          size="small"
          sx={{ flex: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<FaPlus />}
          sx={{
            bgcolor: "#FF4500",
            "&:hover": { bgcolor: "#e03e00" },
            textTransform: "none",
            px: 3,
            py: 1,
          }}
        >
          Add Expense
        </Button>

        <Button
          variant="outlined"
          startIcon={<FaFilePdf />}
          onClick={handleDownloadPDF}
          sx={{
            borderColor: "#FF4500",
            color: "#FF4500",
            textTransform: "none",
            px: 3,
            py: 1,
            "&:hover": { borderColor: "#e03e00", color: "#e03e00" },
          }}
        >
          Download PDF Report
        </Button>
      </form>

      {/* DataGrid */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={expenses}
          getRowId={(row) => `${row.vehicleNumber}-${row.date}-${row.amount}`}
          columns={columns}
          pageSize={10}
          disableColumnMenu
          disableDensitySelector
          disableColumnSelector
          disableSelectionOnClick
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FF4500",
              color: "white",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TransportFinance;
