import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import meetrixLogo from "../assets/meetrix_logo.png"; // Ensure correct path
import { useAlert } from "./alerts/AlertContext";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isLogin) {
      navigate("/");
    } else {
      showAlert("Account created successfully!", "success");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col justify-center items-center p-10 text-white bg-gradient-to-br from-orange-500 to-red-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <img src={meetrixLogo} alt="Meetrix logo" className="h-20 mb-4" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Meetrix</h1>
            <p className="text-gray-200 text-lg font-medium mb-6">
              Igniting the innovative self
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition">
                <FaGooglePlay /> Google Play
              </button>
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition">
                <FaApple /> App Store
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center" style={{ backgroundColor: "#E6EBF0" }}>
          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setIsLogin(false)}
              className={`sparkle-btn px-6 py-2 rounded-lg font-medium transition ${
                !isLogin
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-red-500/40"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Signup
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`sparkle-btn px-6 py-2 rounded-lg font-medium transition ${
                isLogin
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-red-500/40"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Login
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                required
              />
            )}

            <p className="text-xs text-gray-600 mt-1">
              By signing up, you agree with our{" "}
              <a href="#" className="text-[#002133] underline">
                Terms & Conditions
              </a>
            </p>

            <button
              type="submit"
              className="sparkle-btn mt-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 text-white py-2 rounded-lg font-medium transition shadow-md shadow-red-400/40"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
