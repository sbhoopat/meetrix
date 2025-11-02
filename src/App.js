import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

// Layout wrapper that conditionally hides header & sidebar
function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className="flex flex-col h-screen">
      {!hideLayout && <Navbar />}
      <div className="flex flex-1">
        {!hideLayout && <Sidebar />}
        <main
          className={`flex-1 ${
            hideLayout ? "bg-white" : "bg-[#E6EBF0] p-6 overflow-auto"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
