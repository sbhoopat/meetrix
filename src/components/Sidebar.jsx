import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  // Core / Navigation
  FaHome,
  FaChevronLeft,
  FaChevronRight,

  // User & Role Management
  FaUserShield,
  FaUsers,
  FaUsersCog,
  FaIdBadge,
  FaUserFriends,

  // Dashboard & Analytics
  FaTachometerAlt,
  FaChartBar,
  FaChartLine,

  // Project & Structure
  FaBuilding,
  FaProjectDiagram,
  FaCodeBranch,
  FaListUl,
  FaPlusCircle,
  FaCalendarCheck,

  // AI & Automation
  FaRobot,

  // Finance & Resources
  FaMoneyBill,
  FaMoneyBillWave,
  FaGasPump,

  // Transport & Safety
  FaBusAlt,
  FaRoute,
  FaMapMarkedAlt,
  FaChild,
  FaBell,
} from "react-icons/fa";


export default function Sidebar({ role = "user", businessType = "school" }) {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openTransport, setOpenTransport] = useState(false);
  const [openInfrastructure, setOpenInfrastructure] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const menuRef = useRef(null);

  const navItems = [{ name: t("home"), path: "/", icon: <FaHome size={18} /> }];

  // 🔧 Submenus
  const adminSubmenu = [{ name: t("staff"), path: "/admin/staff", icon: <FaUsers size={14} /> }];

  const developerSubmenu = [
    { name: t("createBusiness"), path: "/developer/create-business", icon: <FaPlusCircle size={14} /> },
    { name: t("viewBusiness"), path: "/developer/view-businesses", icon: <FaListUl size={14} /> },
  ];

  const studentPortalSubmenu = [
    { name: t("dashboard"), path: "/student/dashboard", icon: <FaHome size={14} /> },
    { name: t("upcomingAssignments"), path: "/student/upcoming-assignments", icon: <FaListUl size={14} /> },
    { name: t("gpa"), path: "/student/gpa", icon: <FaListUl size={14} /> },
    { name: t("notifications"), path: "/student/notifications", icon: <FaListUl size={14} /> },
    { name: t("attendance"), path: "/student/attendance", icon: <FaUsers size={14} /> },
  ];

  const transportSubmenu = [
   {
    name: t("finance"),
    path: "/transport/finance",
    icon: <FaMoneyBillWave size={14} />,
  },
  {
    name: t("driverManagement"),
    path: "/transport/drivers",
    icon: <FaIdBadge size={14} />,
  },
  {
    name: t("studentTransport"),
    path: "/transport/students",
    icon: <FaChild size={14} />,
  },
  // {
  //   name: t("tripRouteManagement"),
  //   path: "/transport/routes",
  //   icon: <FaRoute size={14} />,
  // },
  {
    name: t("parentApp"),
    path: "/transport/parent-app",
    icon: <FaUserFriends size={14} />,
  },
  {
    name: t("tripTracking"),
    path: "/transport/trip-tracking",
    icon: <FaMapMarkedAlt size={14} />,
  },
  {
    name: t("safetyAlerts"),
    path: "/transport/alerts",
    icon: <FaBell size={14} />,
  },
  // {
  //   name: t("aiAnalytics"),
  //   path: "/transport/analytics",
  //   icon: <FaChartLine size={14} />,
  // },
 
];

  const infrastructureSubmenu = [
    { name: t("customerManagement"), path: "/infra/customers", icon: <FaUsersCog size={14} /> },
    { name: t("salesPipeline"), path: "/infra/pipeline", icon: <FaProjectDiagram size={14} /> },
    { name: t("appointments"), path: "/infra/appointments", icon: <FaCalendarCheck size={14} /> },
    { name: t("analytics"), path: "/infra/analytics", icon: <FaChartBar size={14} /> },
    { name: t("aiObjectionHandler"), path: "/infra/objection-ai", icon: <FaRobot size={14} /> },
  ];

  const salesSubmenu = [{ name: t("salesDashboard"), path: "/infra/sales", icon: <FaChartLine size={14} /> }];

  // Access Control
  const canSeeDeveloperMenu = role === "developer";
  const canSeeAdminMenu = role === "admin" || role === "developer";
  const canSeeStudentMenu = ["admin", "developer", "user"].includes(role) && businessType === "school";
  const canSeeTransportMenu = (role === "admin" || role === "developer") && businessType === "school";
  const canSeeInfrastructureMenu = (role === "admin" || role === "developer") && businessType === "infra";
  const canSeeSalesMenu = (role === "admin" || role === "developer") && businessType === "infra";

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenAdmin(false);
        setOpenDeveloper(false);
        setOpenStudent(false);
        setOpenTransport(false);
        setOpenInfrastructure(false);
        setOpenSales(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex">
      <aside
        className={`${isCollapsed ? "w-16" : "w-56"} bg-white text-[#002133] flex flex-col py-4 transition-all duration-300 shadow-lg relative z-20`}
        ref={menuRef}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-[#FF4500] text-white p-1.5 rounded-full shadow-md hover:bg-[#e03e00] transition-all"
        >
          {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
        </button>

        {/* Header */}
        <div className={`flex items-center gap-2 px-4 mb-8 ${isCollapsed ? "justify-center" : ""}`}>
          {!isCollapsed && <h1 className="text-lg font-semibold text-[#002133]">{t("menu")}</h1>}
        </div>

        <nav className="flex flex-col space-y-2 px-2 relative">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive ? "bg-[#e03e00] text-white shadow-md" : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`
              }
            > 
              <span className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}>{item.icon}</span>
              {!isCollapsed && <span class="text-left">{item.name}</span>}
            </NavLink>
          ))} 

          {canSeeAdminMenu && (
            <DropdownMenu title={t("admin")} icon={<FaUserShield size={18} />} submenu={adminSubmenu} {...{ isCollapsed, isOpen: openAdmin, setIsOpen: setOpenAdmin }} />
          )}

          {canSeeStudentMenu && (
            <DropdownMenu title={t("studentPortal")} icon={<FaUsers size={18} />} submenu={studentPortalSubmenu} {...{ isCollapsed, isOpen: openStudent, setIsOpen: setOpenStudent }} />
          )}

          {canSeeTransportMenu && (
            <DropdownMenu title={t("transportManagement")} icon={<FaBusAlt size={18} />} submenu={transportSubmenu} {...{ isCollapsed, isOpen: openTransport, setIsOpen: setOpenTransport }} />
          )}

          {canSeeInfrastructureMenu && (
            <DropdownMenu title={t("infrastructureCRM")} icon={<FaBuilding size={18} />} submenu={infrastructureSubmenu} {...{ isCollapsed, isOpen: openInfrastructure, setIsOpen: setOpenInfrastructure }} />
          )}

          {canSeeSalesMenu && (
            <DropdownMenu title={t("sales")} icon={<FaMoneyBill size={18} />} submenu={salesSubmenu} {...{ isCollapsed, isOpen: openSales, setIsOpen: setOpenSales }} />
          )}

          {canSeeDeveloperMenu && (
            <DropdownMenu title={t("developer")} icon={<FaCodeBranch size={18} />} submenu={developerSubmenu} {...{ isCollapsed, isOpen: openDeveloper, setIsOpen: setOpenDeveloper }} />
          )}
        </nav>

        <div className="mt-auto px-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
          {!isCollapsed && <p className="truncate">{t("footerText")}</p>}
        </div>
      </aside>
    </div>
  );
}

function DropdownMenu({ title, icon, submenu, isCollapsed, isOpen, setIsOpen }) {
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-all duration-200 ${
          isOpen ? "bg-[#e03e00] text-white" : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}>{icon}</span>
          {!isCollapsed && <span class="text-left">{title}</span>}
        </div>
        {!isCollapsed && <span>{isOpen ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}</span>}
      </button>

      {isOpen && !isCollapsed && (
        <div className="absolute left-[230px] top-0 bg-white shadow-xl rounded-lg border border-gray-200 py-2 px-2 w-60 z-50">
          {submenu.map((sub) => (
            <NavLink
              key={sub.name}
              to={sub.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive ? "bg-[#e03e00] text-white" : "text-[#002133] hover:bg-[#ffe5dc]"
                }`
              }
            >
              {sub.icon}
              <span>{sub.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
