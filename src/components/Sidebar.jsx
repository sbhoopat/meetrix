import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next"; // Import i18n
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
} from "react-icons/fa"; // Import icons

export default function Sidebar({ role = "user" }) {
  const { t } = useTranslation(); // Initialize i18n translation function
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);
  const [openStudent, setOpenStudent] = useState(false); // Add state for student portal
  const [clickedOutside, setClickedOutside] = useState(false); // Track clicks outside the menu

  const menuRef = useRef(null); // Reference for the menu
  const navItems = [
    { name: t("home"), path: "/", icon: <FaHome size={18} /> }, // Use t() to get the translation for Home
  ];

  const adminSubmenu = [
    {
      name: t("staff"), // Use t() for translating 'Staff'
      path: "/admin/staff",
      icon: <FaUsers size={14} />,
    },
  ];

  const developerSubmenu = [
    {
      name: t("createBusiness"), // Translate "Create Business"
      path: "/developer/create-business",
      icon: <FaPlusCircle size={14} />,
    },
    {
      name: t("viewBusiness"), // Translate "View Business"
      path: "/developer/view-businesses",
      icon: <FaListUl size={14} />,
    },
  ];

  // Student Portal Submenu
  const studentPortalSubmenu = [
    { name: t("dashboard"), path: "/student/dashboard", icon: <FaHome size={14} /> },
    { name: t("upcomingAssignments"), path: "/student/upcoming-assignments", icon: <FaListUl size={14} /> },
    { name: t("gpa"), path: "/student/gpa", icon: <FaListUl size={14} /> },
    { name: t("notifications"), path: "/student/notifications", icon: <FaListUl size={14} /> },
    { name: t("attendance"), path: "/student/attendance", icon: <FaUsers size={14} /> },
  ];

  // Visibility logic
  const canSeeDeveloperMenu = role === "developer";
  const canSeeAdminMenu = role === "admin" || role === "developer";
  const canSeeStudentMenu = role === "admin" || role === "developer" || role === "user"; // Assuming students have "user" role

  // Close submenus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenAdmin(false);
        setOpenDeveloper(false);
        setOpenStudent(false);
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
        ref={menuRef} // Attach the ref for detecting clicks outside
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-[#FF4500] text-white p-1.5 rounded-full shadow-md hover:bg-[#e03e00] transition-all duration-300"
        >
          {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
        </button>

        {/* Header */}
        <div className={`flex items-center gap-2 px-4 mb-8 transition-all duration-300 ${isCollapsed ? "justify-center" : ""}`}>
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
                  isActive ? "bg-[#e03e00] text-white shadow-md" : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`
              }
            >
              <span className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}>{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}

          {/* Admin Menu */}
          {canSeeAdminMenu && (
            <div className="relative">
              <button
                onClick={() => setOpenAdmin(!openAdmin)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  openAdmin ? "bg-[#e03e00] text-white" : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}>{<FaUserShield size={18} />}</span>
                  {!isCollapsed && <span>{t("admin")}</span>}
                </div>

                {!isCollapsed && (
                  <span className="ml-auto">
                    {openAdmin ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
                  </span>
                )}
              </button>
      
              {openAdmin && !isCollapsed && (
                <div className="absolute left-[230px] top-0 bg-white shadow-xl rounded-lg border border-gray-200 py-2 px-2 w-48 z-50 w-fit-content">
                  {adminSubmenu.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setOpenAdmin(false)}
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
          )}

          {/* Developer Menu */}
          {canSeeDeveloperMenu && (
            <div className="relative">
              <button
                onClick={() => setOpenDeveloper(!openDeveloper)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  openDeveloper ? "bg-[#e03e00] text-white" : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}>{<FaCodeBranch size={18} />}</span>
                  {!isCollapsed && <span>{t("developer")}</span>}
                </div>

                {!isCollapsed && (
                  <span className="ml-auto">
                    {openDeveloper ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
                  </span>
                )}
              </button>

              {openDeveloper && !isCollapsed && (
                <div className="absolute left-[230px] top-0 bg-white shadow-xl rounded-lg border border-gray-200 py-2 px-2 w-48 z-50 w-fit-content">
                  {developerSubmenu.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setOpenDeveloper(false)}
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
          )}

          {/* Student Portal Menu */}
          {canSeeStudentMenu && (
            <div className="relative">
              <button
                onClick={() => setOpenStudent(!openStudent)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  openStudent ? "bg-[#e03e00] text-white" : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}>{<FaUsers size={18} />}</span>
                  {!isCollapsed && <span>{t("studentPortal")}</span>}
                </div>

                {!isCollapsed && (
                  <span className="ml-auto">
                    {openStudent ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
                  </span>
                )}
              </button>

              {openStudent && !isCollapsed && (
                <div className="absolute left-[230px] top-0 bg-white shadow-xl rounded-lg border border-gray-200 py-2 px-2 w-48 z-50 w-fit-content">
                  {studentPortalSubmenu.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setOpenStudent(false)}
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
