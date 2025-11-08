import React, { useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import { PlusCircle, Phone, Calendar, MessageCircle } from "lucide-react";

const CustomerManagementScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    requirements: "",
    budget: "",
    location: "",
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name) return alert("Please enter customer name");
    setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
    setNewCustomer({ name: "", contact: "", requirements: "", budget: "", location: "" });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#002133] mb-6">Customer Management</h1>

      {/* Add New Lead Form */}
      <Card className="p-4 mb-6 shadow-md rounded-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New Lead</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "contact", "requirements", "budget", "location"].map((field) => (
            <input
              key={field}
              className="border p-2 rounded-md w-full"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newCustomer[field]}
              onChange={(e) => setNewCustomer({ ...newCustomer, [field]: e.target.value })}
            />
          ))}
        </div>
        <Button
          onClick={handleAddCustomer}
          className="mt-4 w-full bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add Customer
        </Button>
      </Card>

      {/* Customer List */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Customer List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c) => (
          <Card key={c.id} className="p-4 shadow-md rounded-md">
            <CardContent>
              <h3 className="text-lg sm:text-xl font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.contact}</p>
              <p className="text-sm">Req: {c.requirements}</p>
              <p className="text-sm">Budget: ₹{c.budget}</p>
              <p className="text-sm">Location: {c.location}</p>
              <div className="flex justify-between gap-4 mt-4 text-[#002133]">
                <Phone size={18} />
                <Calendar size={18} />
                <MessageCircle size={18} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerManagementScreen;
