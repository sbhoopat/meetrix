import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import CreateBusiness from "./components/CreateBusiness";
import ViewBusinesses from "./components/ViewBusinesses";
import Staff from "./components/Staff";
import AIChatWindow from "./components/chat/AIChatWindow";
import StudentDashboard from "./studentportal/StudentDashboard";
import StudentAssignments from "./studentportal/StudentAssignments";
import StudentGPA from "./studentportal/StudentGPA";
import NotificationCenter from "./studentportal/NotificationCenter";
import AttendanceScreen from "./studentportal/AttendanceScreen";
import CustomerManagementScreen from "./components/infrastructure/CustomerManagementScreen";
import SalesPipelineScreen from "./components/infrastructure/SalesPipelineScreen";
import AppointmentsScreen from "./components/infrastructure/AppointmentsScreen";
import AnalyticsScreen from "./components/infrastructure/AnalyticsScreen";
import ObjectionHandler from "./components/infrastructure/ObjectionHandler";

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className="flex flex-col h-screen">
      {!hideLayout && <Navbar />}
      <div className="flex flex-1">  
        {!hideLayout && <Sidebar role="developer" businessType="infra"/>}
        <main
          className={`flex-1 ${
            hideLayout ? "bg-white" : "bg-[#E6EBF0] p-6 overflow-auto"
          }`} 
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/admin/staff" element={<Staff />} />
            <Route path="/developer/create-business" element={<CreateBusiness />} />
            <Route path="/developer/view-businesses" element={<ViewBusinesses />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="student/upcoming-assignments" element={<StudentAssignments />} />
            <Route path="student/gpa" element={<StudentGPA />} />
            <Route path="student/notifications" element={<NotificationCenter />} />
            <Route path="student/attendance" element={<AttendanceScreen />} />
            {/* Infrastructure CRM */}
            <Route path="/infra/customers" element={<CustomerManagementScreen />} />
            <Route path="/infra/pipeline" element={<SalesPipelineScreen />} />
            <Route path="/infra/appointments" element={<AppointmentsScreen />} />
            <Route path="/infra/analytics" element={<AnalyticsScreen />} />
            <Route path="/infra/objection-ai" element={<ObjectionHandler />} />


          </Routes>
        </main>
         <AIChatWindow />
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
