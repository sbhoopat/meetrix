import React, { useState } from "react";
import { Card, Button } from "@mui/material";
import { Calendar, Clock } from "lucide-react";

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", time: "" });

  const addAppointment = () => {
    if (!form.name) return alert("Enter meeting title");
    setAppointments([...appointments, { ...form, id: Date.now() }]);
    setForm({ name: "", date: "", time: "" });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#002133] mb-6">Appointments & Meetings</h1>

      {/* Form Section */}
      <Card className="p-4 mb-6 shadow-md rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded-md w-full"
            placeholder="Meeting Title"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded-md w-full"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            className="border p-2 rounded-md w-full"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <Button
          onClick={addAppointment}
          className="mt-4 w-full bg-orange-600 text-white hover:bg-orange-700"
        >
          Add Appointment
        </Button>
      </Card>

      {/* Appointments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {appointments.map((a) => (
          <Card key={a.id} className="p-4 flex flex-col justify-between shadow-md rounded-md">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">{a.name}</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar size={16} /> {a.date}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Clock size={16} /> {a.time}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsScreen;
