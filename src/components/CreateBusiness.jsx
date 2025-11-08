import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAlert } from "./alerts/AlertContext";

const OrangeredButton = styled(Button)(() => ({
  backgroundColor: "#FF4500",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#e03e00",
  },
}));

export default function CreateBusiness() {
  const [businessType, setBusinessType] = useState("School");
  const { showAlert } = useAlert();

  const [schoolName, setSchoolName] = useState("");
  const [infraName, setInfraName] = useState("");

  const [schoolFields, setSchoolFields] = useState([
    { fieldName: "", fieldType: "text", isRequired: false },
  ]);

  const [infraFields, setInfraFields] = useState([
    { fieldName: "", fieldType: "text", isRequired: false },
  ]);

  const handleAddField = () => {
    if (businessType === "School") {
      setSchoolFields([
        ...schoolFields,
        { fieldName: "", fieldType: "text", isRequired: false },
      ]);
    } else {
      setInfraFields([
        ...infraFields,
        { fieldName: "", fieldType: "text", isRequired: false },
      ]);
    }
  };

  const handleChangeField = (index, key, value) => {
    if (businessType === "School") {
      const updated = [...schoolFields];
      updated[index][key] = value;
      setSchoolFields(updated);
    } else {
      const updated = [...infraFields];
      updated[index][key] = value;
      setInfraFields(updated);
    }
  };

  const handleSave = () => {
    const data =
      businessType === "School"
        ? { name: schoolName, fields: schoolFields }
        : { name: infraName, fields: infraFields };

    console.log("Saved Business Data:", { type: businessType, ...data });
    showAlert(`${businessType} business saved successfully!`, "success");
  };

  // Determine current fields and name based on selected type
  const currentName = businessType === "School" ? schoolName : infraName;
  const currentFields = businessType === "School" ? schoolFields : infraFields;

  const handleNameChange = (value) => {
    if (businessType === "School") setSchoolName(value);
    else setInfraName(value);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <Card
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          backgroundColor: "white",
          padding: "16px",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="#002133" gutterBottom>
            Create Business
          </Typography>

          {/* Business Type Dropdown */}
          <TextField
            select
            label="Business Type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Infrastructure">Infrastructure</MenuItem>
          </TextField>

          {/* Business Name */}
          <TextField
            label="Name of Business"
            value={currentName}
            onChange={(e) => handleNameChange(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          {/* Fields Section */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#002133"
            sx={{ mt: 2, mb: 1 }}
          >
            Fields
          </Typography>

          {currentFields.map((field, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Field Name"
                  value={field.fieldName}
                  onChange={(e) =>
                    handleChangeField(index, "fieldName", e.target.value)
                  }
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  label="Field Type"
                  value={field.fieldType}
                  onChange={(e) =>
                    handleChangeField(index, "fieldType", e.target.value)
                  }
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="dropdown">Dropdown</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.isRequired}
                      onChange={(e) =>
                        handleChangeField(index, "isRequired", e.target.checked)
                      }
                    />
                  }
                  label="Required"
                />
              </Grid>
            </Grid>
          ))}

          {/* Add Field Button */}
          <Button
            variant="outlined"
            onClick={handleAddField}
            sx={{
              mt: 2,
              borderColor: "#FF4500",
              color: "#FF4500",
              width: "100%",
            }}
          >
            + Add Field
          </Button>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <OrangeredButton
              variant="contained"
              onClick={handleSave}
              sx={{ width: "100%" }}
            >
              Save Business
            </OrangeredButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
