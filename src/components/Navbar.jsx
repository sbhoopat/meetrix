import React, { useState } from "react";
import meetrixLogo from "../assets/meetrix_logo.png";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom/dist";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "john.doe@meetrix.com",
  };

  const handleLogout = () => {
    // alert(`User ${user.name} has logged out.`);
    setUserMenuOpen(false);
     navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-[#002133] text-white px-6 py-3 shadow-md relative">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <img src={meetrixLogo} alt="Meetrix" className="h-10" />
        <h1 className="text-xl font-semibold">Meetrix</h1>
      </div>

      {/* Right Section - Profile Icon */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <FaUserCircle size={30} />
        </button>

        {/* Dropdown Menu */}
        {userMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white text-[#002133] rounded-lg shadow-lg py-3 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-[#E6EBF0] mt-1"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
