import { Card } from "@mui/material";
import React from "react";
// import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Prospect", value: 20 },
  { name: "Qualification", value: 15 },
  { name: "Proposal", value: 10 },
  { name: "Negotiation", value: 5 },
  { name: "Closure", value: 8 },
];

const COLORS = ["#00324d", "#005f73", "#0a9396", "#94d2bd", "#ee9b00"];

const AnalyticsScreen = () => (
  <div className="p-6 bg-white min-h-screen">
    <h1 className="text-3xl font-semibold text-[#002133] mb-6">Analytics & Reports</h1>

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Leads by Stage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#002133" /> 
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Conversion Ratio</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

export default AnalyticsScreen;
