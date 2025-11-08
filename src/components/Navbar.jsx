import React, { useState, useRef, useEffect } from "react";
import meetrixLogo from "../assets/meetrix_logo.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./i18n/LanguageSwitcher";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const user = {
    name: "John Doe",
    email: "john.doe@meetrix.com",
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false); // Close mobile menu when logging out
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white text-[#002133] px-6 py-3 shadow-md sticky top-0 z-50">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <img src={meetrixLogo} alt="Meetrix" className="h-10 w-auto" />
        <h1 className="text-xl font-semibold tracking-wide hidden sm:block">Meetrix</h1>
      </div>

      {/* Right Section - LanguageSwitcher and Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Language Switcher */}
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block sm:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Profile Icon and Dropdown */}
        <div className="relative hidden sm:block" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition"
          >
            <FaUserCircle size={32} className="text-[#002133]" />
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 text-[#002133] rounded-xl shadow-lg py-3 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-[#E6EBF0] transition mt-1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white bg-opacity-90 sm:hidden z-40 flex flex-col items-center py-8">
          {/* Mobile Language Switcher */}
          <div className="mb-4">
            <LanguageSwitcher />
          </div>

          {/* Mobile Profile Menu */}
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 mb-4 text-xl"
          >
            <FaUserCircle size={30} className="text-[#002133]" />
            <p>{user.name}</p>
          </button>

          {/* Logout Button */}
          {userMenuOpen && (
            <div className="w-full text-center mt-2">
              <button
                onClick={handleLogout}
                className="w-full py-2 text-sm rounded-lg text-[#FF4500] bg-[#E6EBF0] hover:bg-[#D8DCE5]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
