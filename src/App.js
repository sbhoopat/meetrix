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
import StudentDashboard from "./components/studentportal/StudentDashboard";
import StudentAssignments from "./components/studentportal/StudentAssignments";
import StudentGPA from "./components/studentportal/StudentGPA";
import NotificationCenter from "./components/studentportal/NotificationCenter";
import AttendanceScreen from "./components/studentportal/AttendanceScreen";
import CustomerManagementScreen from "./components/infrastructure/CustomerManagementScreen";
import SalesPipelineScreen from "./components/infrastructure/SalesPipelineScreen";
import AppointmentsScreen from "./components/infrastructure/AppointmentsScreen";
import AnalyticsScreen from "./components/infrastructure/AnalyticsScreen";
import ObjectionHandler from "./components/infrastructure/ObjectionHandler";
import SalesDashboard from "./components/infrastructure/sales/SalesDashboard";
import DriverManagement from "./components/transport/DriverManagement";
import StudentRoutes from "./components/transport/StudentRoutes";
import TripTracking from "./components/transport/TripTracking";
import ParentTrackingWidget from "./components/transport/ParentTrackingWidget";
import TransportDashboard from "./components/transport/TransportDashboard";
import RouteManagement from "./components/transport/RouteManagement";
import AlertsAndSafety from "./components/transport/AlertsAndSafety";
import TransportFinance from "./components/transport/TransportFinance";

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className="flex flex-col h-screen">
      {!hideLayout && <Navbar />}
      <div className="flex flex-1">  
        {!hideLayout && <Sidebar role="developer" businessType="school"/>}
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
            <Route path="/infra/sales" element={<SalesDashboard />} />

             <Route path="/transport/dashboard" element={<TransportDashboard />} />
            <Route path="/transport/drivers" element={<DriverManagement />} />
            <Route path="transport/students" element={<StudentRoutes />} />
            <Route path="/transport/routes" element={<RouteManagement />} />
            <Route path="/transport/trip-tracking" element={<TripTracking />} />
            <Route path="/transport/parent-app" element={<ParentTrackingWidget />} />
            <Route path="/transport/alerts" element={<AlertsAndSafety />} />
            <Route path="/transport/finance" element={<TransportFinance />} />




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
