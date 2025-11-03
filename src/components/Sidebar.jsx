import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // import the useTranslation hook
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
} from "react-icons/fa";

export default function Sidebar({ role = "user" }) {
  // roles: "developer" | "admin" | "user"
  const { t } = useTranslation(); // Initialize i18n translation function
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openDeveloper, setOpenDeveloper] = useState(false);

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

  // Visibility logic
  const canSeeDeveloperMenu = role === "developer";
  const canSeeAdminMenu = role === "admin" || role === "developer";

  return (
    <div className="relative flex">
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-56"
        } bg-white text-[#002133] flex flex-col py-4 transition-all duration-300 shadow-lg relative z-20`}
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
              <span
                className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}

          {/* Admin Menu */}
          {canSeeAdminMenu && (
            <div className="relative">
              <button
                onClick={() => setOpenAdmin(!openAdmin)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  openAdmin
                    ? "bg-[#e03e00] text-white"
                    : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}
                  >
                    <FaUserShield size={18} />
                  </span>
                  {!isCollapsed && <span>{t("admin")}</span>}
                </div>

                {!isCollapsed && (
                  <span className="ml-auto">
                    {openAdmin ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
                  </span>
                )}
              </button>

              {openAdmin && !isCollapsed && (
                <div className="absolute left-[230px] top-0 bg-white shadow-xl rounded-lg border border-gray-200 py-2 px-2 w-48 z-50">
                  {adminSubmenu.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setOpenAdmin(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? "bg-[#e03e00] text-white"
                            : "text-[#002133] hover:bg-[#ffe5dc]"
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
                  openDeveloper
                    ? "bg-[#e03e00] text-white"
                    : "bg-[#FF4500] text-white hover:bg-[#ff5a1f]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex justify-center ${isCollapsed ? "w-full" : "w-6"}`}
                  >
                    <FaCodeBranch size={18} />
                  </span>
                  {!isCollapsed && <span>{t("developer")}</span>}
                </div>

                {!isCollapsed && (
                  <span className="ml-auto">
                    {openDeveloper ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
                  </span>
                )}
              </button>

              {openDeveloper && !isCollapsed && (
                <div className="absolute left-[230px] top-0 bg-white shadow-xl rounded-lg border border-gray-200 py-2 px-2 w-48 z-50">
                  {developerSubmenu.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setOpenDeveloper(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? "bg-[#e03e00] text-white"
                            : "text-[#002133] hover:bg-[#ffe5dc]"
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
