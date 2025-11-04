import React, { useState } from "react";
import { Card ,Button} from "@mui/material";

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
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-semibold text-[#002133] mb-6">Appointments & Meetings</h1>
      <Card className="p-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <input className="border p-2 rounded" placeholder="Meeting Title" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
          <input type="date" className="border p-2 rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}/>
          <input type="time" className="border p-2 rounded" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}/>
        </div>
        <Button onClick={addAppointment} className="mt-3 bg-orange-red text-white  hover:bg-[#00324d]">Add Appointment</Button>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {appointments.map((a) => (
          <Card key={a.id} className="p-4 flex items-center justify-between shadow">
            <div>
              <h3 className="text-lg font-semibold">{a.name}</h3>
              <p className="text-gray-600 flex items-center gap-2"><Calendar size={16}/> {a.date}</p>
              <p className="text-gray-600 flex items-center gap-2"><Clock size={16}/> {a.time}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsScreen;
