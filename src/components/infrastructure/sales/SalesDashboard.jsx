// SalesDashboard.jsx
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { FaCalendarAlt, FaFilter } from "react-icons/fa";

export default function SalesDashboard() {
  const { t } = useTranslation();

  // --- Filters state ---
  const [product, setProduct] = useState("All Products");
  const [region, setRegion] = useState("All Regions");
  const [period, setPeriod] = useState("This Month");

  // --- Dummy data (replace with real API data) ---
  const kpis = {
    targetAmount: "₹5.894Cr",
    invoicedAmount: "₹3.995L",
    hots: "₹6.105Cr",
    outstanding: "₹5.756Cr",
    pctTarget: "24%",
  };

  const recommendedCards = [
    { title: t("Target"), subtitle: "₹5.894Cr", note: "Achieved ₹3.995L" },
    { title: "Achieved Invoicing", subtitle: "-₹3.995L", note: "New deals 0" },
    { title: "Invoice Generation", subtitle: "₹15.613L", note: "Existing deals ₹4.059L" },
    { title: "Payments", subtitle: "₹0", note: "Pending" },
  ];

  const revenueSeries = [
    { month: "Aug", revenue: 1200000 },
    { month: "Sep", revenue: 1500000 },
    { month: "Oct", revenue: 1100000 },
    { month: "Nov", revenue: 1800000 },
    { month: "Dec", revenue: 2000000 },
    { month: "Jan", revenue: 1700000 },
  ];

  const leadsPerStage = [
    { stage: "Prospect", count: 24 },
    { stage: "Qualification", count: 16 },
    { stage: "Proposal", count: 9 },
    { stage: "Negotiation", count: 4 },
    { stage: "Closure", count: 2 },
  ];

  const salesPeople = [
    { id: 1, name: "Vikram", deals: 12, revenue: "₹2.1L", conversion: "18%" },
    { id: 2, name: "Sonia", deals: 9, revenue: "₹1.4L", conversion: "15%" },
    { id: 3, name: "Amit", deals: 7, revenue: "₹1.0L", conversion: "12%" },
  ];

  // derived totals (memoized)
  const totalLeads = useMemo(() => leadsPerStage.reduce((s, x) => s + x.count, 0), [leadsPerStage]);

  // small helper
  const formatCurrency = (v) =>
    typeof v === "number" ? v.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }) : v;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header / Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#002133]">{t("Sales Dashboard") || "Sales Dashboard"}</h2>
          <p className="text-sm text-gray-500 mt-1">{t("welcome")}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
            <FaCalendarAlt className="text-[#002133]" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="outline-none text-sm"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
            <FaFilter className="text-[#002133]" />
            <select value={product} onChange={(e) => setProduct(e.target.value)} className="outline-none text-sm">
              <option>All Products</option>
              <option>Product A</option>
              <option>Product B</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="outline-none text-sm">
              <option>All Regions</option>
              <option>North</option>
              <option>South</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Top Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
          <span className="text-xs text-gray-500">Target Amount</span>
          <span className="text-xl font-semibold text-[#002133]">{kpis.targetAmount}</span>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
          <span className="text-xs text-gray-500">Invoiced</span>
          <span className="text-xl font-semibold text-[#002133]">{kpis.invoicedAmount}</span>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
          <span className="text-xs text-gray-500">HOTS</span>
          <span className="text-xl font-semibold text-[#002133]">{kpis.hots}</span>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
          <span className="text-xs text-gray-500">Outstanding</span>
          <span className="text-xl font-semibold text-[#002133]">{kpis.outstanding}</span>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
          <span className="text-xs text-gray-500">Target Achieved</span>
          <span className="text-xl font-semibold text-[#002133]">{kpis.pctTarget}</span>
        </div>
      </div>

      {/* Recommended / Cards - horizontal */}
      <div className="mb-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recommendedCards.map((c, i) => (
            <div
              key={i}
              className="min-w-[240px] bg-white rounded-lg p-4 shadow-md flex-shrink-0"
            >
              <div className="text-sm text-gray-500 mb-1">{c.title}</div>
              <div className="text-2xl font-bold text-[#002133]">{c.subtitle}</div>
              <div className="text-xs text-gray-400 mt-2">{c.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / big chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#002133]">Revenue Trend</h3>
            <div className="text-sm text-gray-500"> {period} • {product} • {region} </div>
          </div>

          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7A33" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF7A33" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(val) => formatCurrency(val)} />
                <Area type="monotone" dataKey="revenue" stroke="#FF7A33" fillOpacity={1} fill="url(#colorRv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {leadsPerStage.map((l, i) => (
              <div key={i} className="bg-[#FFFAF7] rounded p-3">
                <div className="text-xs text-gray-500">{l.stage}</div>
                <div className="text-xl font-semibold text-[#002133]">{l.count}</div>
                <div className="text-xs text-gray-400">of {totalLeads} leads</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: salespeople + small charts */}
        <div className="bg-white rounded-lg p-5 shadow-sm space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-[#002133]">Salesperson Performance</h4>
            <div className="mt-3 space-y-3">
              {salesPeople.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.deals} deals • {s.conversion} conv.</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#002133]">{s.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#002133] mb-2">Leads by Stage</h4>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsPerStage}>
                  <XAxis dataKey="stage" hide />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF7A33" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            <strong>Notes:</strong> Data shown is demo/static. Replace with backend API results for live metrics.
          </div>
        </div>
      </div>
    </div>
  );
}
