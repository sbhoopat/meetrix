import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserShield, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome size={18} /> },
    { name: "Admin", path: "/admin", icon: <FaUserShield size={18} /> },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-48"
      } bg-[#002133] text-white flex flex-col py-4 transition-all duration-300 relative`}
    >
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-5 bg-[#E6EBF0] text-[#002133] p-1.5 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        {isCollapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
      </button>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-2 px-2 mt-10">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
                isActive
                  ? "bg-[#E6EBF0] text-[#002133]"
                  : "hover:bg-[#00394d]"
              }`
            }
          >
            <span className="flex justify-center w-6">{item.icon}</span>
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
