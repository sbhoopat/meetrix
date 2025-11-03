// AlertContext.js
import React, { createContext, useState, useContext } from "react";
import CustomAlert from "./CustomAlert";

// Create a context for the alert
const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext); // Custom hook to access the alert context
};

export const AlertProvider = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success"); // success or failure
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message, type = "success") => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/* Render the alert component globally */}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        isVisible={alertVisible}
      />
    </AlertContext.Provider>
  );
};
