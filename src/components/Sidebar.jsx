import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserShield,
  FaChevronLeft,
  FaChevronRight,
  FaCodeBranch,
  FaPlusCircle,
  FaListUl,
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaUsersCog,
  FaCalendarCheck,
  FaRobot,
  FaProjectDiagram,
} from "react-icons/fa";

export default function Sidebar({ role = "user", businessType = "school" }) {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openInfrastructure, setOpenInfrastructure] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { name: t("home"), path: "/", icon: <FaHome size={18} /> },
  ];

  const adminSubmenu = [
    { name: t("staff"), path: "/admin/staff", icon: <FaUsers size={14} /> },
  ];

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

  // 🏗 Infrastructure CRM submenu
  const infrastructureSubmenu = [
    { name: t("customerManagement"), path: "/infra/customers", icon: <FaUsersCog size={14} /> },
    { name: t("salesPipeline"), path: "/infra/pipeline", icon: <FaProjectDiagram size={14} /> },
    { name: t("appointments"), path: "/infra/appointments", icon: <FaCalendarCheck size={14} /> },
    { name: t("analytics"), path: "/infra/analytics", icon: <FaChartBar size={14} /> },
    { name: t("aiObjectionHandler"), path: "/infra/objection-ai", icon: <FaRobot size={14} /> },
  ];

  const canSeeDeveloperMenu = role === "developer";
  const canSeeAdminMenu = role === "admin" || role === "developer";
  const canSeeStudentMenu = ["admin", "developer", "user"].includes(role) && businessType === "school";
  const canSeeInfrastructureMenu = (role === "admin" || role === "developer") && businessType === "infra";

  // 🔒 Close submenus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenAdmin(false);
        setOpenDeveloper(false);
        setOpenStudent(false);
        setOpenInfrastructure(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex">
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-56"
        } bg-white text-[#002133] flex flex-col py-4 transition-all duration-300 shadow-lg relative z-20`}
        ref={menuRef}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-[#FF4500] text-white p-1.5 rounded-full shadow-md hover:bg-[#e03e00] transition-all duration-300"
        >
          {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
        </button>

        {/* Header */}
        <div
          className={`flex items-center gap-2 px-4 mb-8 transition-all duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          {!isCollapsed && <h1 className="text-lg font-semibold text-[#002133]">{t("menu")}</h1>}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 px-2 relative">
          {/* Home */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#e03e00] text-white shadow-md"
                    : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`
              }
            >
              <span className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}>{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}

          {/* Admin Menu */}
          {canSeeAdminMenu && (
            <DropdownMenu
              title={t("admin")}
              icon={<FaUserShield size={18} />}
              isCollapsed={isCollapsed}
              isOpen={openAdmin}
              setIsOpen={setOpenAdmin}
              submenu={adminSubmenu}
            />
          )}

          {/* Student Portal */}
          {canSeeStudentMenu && (
            <DropdownMenu
              title={t("studentPortal")}
              icon={<FaUsers size={18} />}
              isCollapsed={isCollapsed}
              isOpen={openStudent}
              setIsOpen={setOpenStudent}
              submenu={studentPortalSubmenu}
            />
          )}

          {/* Infrastructure CRM */}
          {canSeeInfrastructureMenu && (
            <DropdownMenu
              title={t("infrastructureCRM")}
              icon={<FaBuilding size={18} />}
              isCollapsed={isCollapsed}
              isOpen={openInfrastructure}
              setIsOpen={setOpenInfrastructure}
              submenu={infrastructureSubmenu}
            />
          )}

          {/* 👨‍💻 Developer Menu (Now Last) */}
          {canSeeDeveloperMenu && (
            <DropdownMenu
              title={t("developer")}
              icon={<FaCodeBranch size={18} />}
              isCollapsed={isCollapsed}
              isOpen={openDeveloper}
              setIsOpen={setOpenDeveloper}
              submenu={developerSubmenu}
            />
          )}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
          {!isCollapsed && <p className="truncate">{t("footerText")}</p>}
        </div>
      </aside>
    </div>
  );
}

// 🧩 Reusable Dropdown Menu Component
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
          {!isCollapsed && <span>{title}</span>}
        </div>
        {!isCollapsed && (
          <span className="ml-auto">{isOpen ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}</span>
        )}
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
