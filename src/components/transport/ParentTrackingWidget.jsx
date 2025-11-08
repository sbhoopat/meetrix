import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBusAlt,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import loadRazorpayScript from "../payment/loadRazorpay";

export default function ParentTrackingPage({ studentId = "STU12345" }) {
  const [tripData, setTripData] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpted, setIsOpted] = useState(true);
  const [optDialog, setOptDialog] = useState(false);
  const [formData, setFormData] = useState({
    studentId,
    routeId: "",
    startDate: "",
    paymentType: "card",
  });

  const [optedPlans, setOptedPlans] = useState([]);

  // Mocked Routes Data
  const mockedRoutes = [
    {
      id: "route1",
      name: "Route 1 - Miyapur to JNTU",
      distance: "15 km",
      estimatedTime: "30 mins",
      stops: [
        { id: 1, name: "Miyapur", lat: 17.4981608, lng: 78.3567628 },
        { id: 2, name: "Mayuri Nagar", lat: 17.5128, lng: 78.3686 },
        { id: 3, name: "Nizampet", lat: 17.5164805, lng: 78.3766275 },
        { id: 4, name: "JNTUH", lat: 17.495924, lng: 78.392632 },
      ],
      driver: {
        name: "Harris Whitaker",
        phoneNumber: "+1234567890",
        status: "In Transit",
        profilePicture: "https://randomuser.me/api/portraits/men/64.jpg",
      },
    },
    {
      id: "route2",
      name: "Route 2 - City Center to Airport",
      distance: "18 km",
      estimatedTime: "40 mins",
      stops: [
        { id: 1, name: "City Center", lat: 17.450, lng: 78.450 },
        { id: 2, name: "Suburb", lat: 17.455, lng: 78.460 },
        { id: 3, name: "Airport", lat: 17.465, lng: 78.475 },
      ],
      driver: {
        name: "John Doe",
        phoneNumber: "+1234567891",
        status: "In Transit",
        profilePicture: "https://randomuser.me/api/portraits/men/65.jpg",
      },
    },
  ];

  useEffect(() => {
    // Fetch transport data
    const fetchTripData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/transport/parent/tracking/${studentId}`
        );
        setTripData(res.data);
        setIsOpted(res.data?.plan?.isOpted || false);
        setLoading(false);
        setOptedPlans(res.data?.plans || []); // Fetch previous opted plans
      } catch (err) {
        console.error(err);
        setError("Unable to load transport data.");
        setLoading(false);
      }
    };

    // Mock fetch routes data
    const fetchRoutes = async () => {
      setRoutes(mockedRoutes);  // Replace with real API call if available
      setLoading(false);
    };

    fetchTripData();
    fetchRoutes();
  }, [studentId]);

  // Razorpay payment handler
  const startRazorpayCheckout = async (planAmount) => {
    try {
      await loadRazorpayScript();
      const createRes = await axios.post(
        `http://localhost:5000/api/transport/opt/${studentId}`,
        {
          studentId: formData.studentId,
          routeId: formData.routeId,
          startDate: formData.startDate,
          planAmount,
        }
      );

      const { order, razorpayKeyId } = createRes.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "School Transport Services",
        description: "Bus Service Subscription",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/transport/verify_payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                studentId,
                planAmount,
              }
            );

            if (verifyRes.data.success) {
              alert("✅ Payment successful! Bus service opted.");
              setIsOpted(true);
              const updated = await axios.get(
                `http://localhost:5000/api/transport/parent/tracking/${studentId}`
              );
              setTripData(updated.data);
              setOptDialog(false);
            } else {
              alert("⚠️ Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed. Try again later.");
          }
        },
        prefill: {
          name: tripData?.student?.parentName || "Parent",
          contact: tripData?.student?.parentPhone || "",
        },
        theme: { color: "#FF4500" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const handleOptBus = () => {
    setOptDialog(true);
  };

  const handleSubmitOpt = () => {
    if (!formData.routeId || !formData.startDate) {
      alert("Please select route and start date.");
      return;
    }
    const planAmount = 1500; // Example: ₹1500
    startRazorpayCheckout(planAmount);
  };

  // Define columns for DataGrid
  const columns = [
    { field: "route", headerName: "Route", width: 180 },
    { field: "amount", headerName: "Amount (₹)", width: 130 },
    { field: "startDate", headerName: "Start Date", width: 180 },
    { field: "renewalDate", headerName: "Renewal Date", width: 180 },
    { field: "status", headerName: "Status", width: 130 },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading transport data...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  const { student, bus, driver, route, plan, eta, status } = tripData || {};

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#FF4500]">
            <FaBusAlt /> Bus Service Details
          </h2>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              status === "On Time"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status || "Inactive"}
          </span>
        </div>

        {/* STUDENT INFO */}
        <div className="mt-4 text-gray-800">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaUserGraduate className="text-[#FF4500]" />
            {student?.name} • Grade {student?.grade}
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <FaMapMarkerAlt className="text-[#FF4500]" />
            {route?.destination || "N/A"}
          </div>
        </div>

        {/* BUS INFO */}
        {isOpted ? (
          <div className="mt-4 text-sm text-gray-700">
            <p>
              <strong>Bus:</strong> #{bus?.busNumber} ({bus?.model})
            </p>
            <p>
              <strong>Driver:</strong> {driver?.name} •{" "}
              <a
                href={`tel:${driver?.phone}`}
                className="text-[#FF4500] inline-flex items-center gap-1"
              >
                <FaPhoneAlt /> Call
              </a>
            </p>
            <p>
              <FaClock className="inline text-[#FF4500]" /> ETA:{" "}
              <strong>{eta || "N/A"}</strong> min
            </p>

            {/* PLAN DETAILS */}
            <div className="mt-4 border-t pt-3">
              <h3 className="font-semibold text-gray-800 mb-1">Your Plan</h3>
              <p>
                <strong>Route:</strong> {route?.name || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> ₹{plan?.amount || 1500}
              </p>
              <p>
                <strong>Opted On:</strong> {plan?.optedOn || "N/A"}
              </p>
              <p>
                <strong>Renewal Date:</strong> {plan?.renewalDate || "N/A"}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => startRazorpayCheckout(plan?.amount || 1500)}
                className="px-6 py-2 bg-[#FF4500] text-white rounded-lg font-medium hover:bg-[#e03e00] transition-all"
              >
                Renew Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-600">
            <p className="mb-4">
              You haven’t opted for the school bus service yet.
            </p>
            <button
              onClick={handleOptBus}
              className="px-6 py-2 bg-[#FF4500] text-white rounded-lg font-medium hover:bg-[#e03e00] transition-all"
            >
              Opt for Bus Service
            </button>
          </div>
        )}
      </div>

      {/* ---- OPT-IN MODAL ---- */}
      {optDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[450px] shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-[#FF4500]">
              Opt for Bus Service
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Student ID</label>
                <input
                  type="text"
                  value={formData.studentId}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Select Route</label>
                <select
                  value={formData.routeId}
                  onChange={(e) =>
                    setFormData({ ...formData, routeId: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                >
                  <option value="">-- Choose Route --</option>
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.distance} km) - ₹{r.amount}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Payment Method
                </label>
                <div className="space-y-2 mt-2">
                  {["card", "upi", "cred"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        value={type}
                        checked={formData.paymentType === type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentType: e.target.value,
                          })
                        }
                      />
                      {type === "card" && "Credit/Debit Card"}
                      {type === "upi" && "PhonePe / GPay (UPI)"}
                      {type === "cred" && "CRED Payment"}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOptDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOpt}
                className="px-4 py-2 bg-[#FF4500] text-white rounded-lg hover:bg-[#e03e00]"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
