"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Laura Cooper",
    email: "laura.cooper@example.com",
    phone: "+1 234 567 890",
    gender: "Female",
    style: "Elegant, Sophisticated",
  });

  const orders = [
    { id: "ORD12345", date: "2024-05-01", status: "Shipped", total: "$120.00" },
    { id: "ORD12346", date: "2024-04-20", status: "Delivered", total: "$89.99" },
    { id: "ORD12347", date: "2024-03-15", status: "Processing", total: "$45.50" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { key: "profile", label: "User Info" },
    { key: "changePassword", label: "Change Password" },
    { key: "orderHistory", label: "Order History" },
    { key: "trackOrder", label: "Track Orders" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 border-r p-4 space-y-2 pt-20">
        <h1 className="text-xl font-bold mb-4">Manage Account</h1>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setIsEditing(false);
            }}
            className={`block w-full text-left px-4 py-2 rounded  ${
              activeTab === tab.key ? "border font-bold" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-20">
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="profile" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Info</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow"
                >
                  Save
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                {isEditing ? (
                  <select
                    value={user.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p className="border rounded px-3 py-2">{user.gender}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Style</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.style}
                    onChange={(e) => handleInputChange("style", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="border rounded px-3 py-2">{user.style}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "changePassword" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="changePassword" className="space-y-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input type="password" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input type="password" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input type="password" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" />
              </div>
              <button type="submit" className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow">
                Update Password
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === "orderHistory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="orderHistory" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            <div className="overflow-x-auto">
              <table className="w-full border rounded shadow text-left">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Order ID</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1), duration: 0.6 }}
                    >
                      <td className="border px-4 py-2">{order.id}</td>
                      <td className="border px-4 py-2">{order.date}</td>
                      <td className="border px-4 py-2">{order.status}</td>
                      <td className="border px-4 py-2">{order.total}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "trackOrder" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="trackOrder" className="space-y-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Track Orders</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Enter Order ID</label>
                <input
                  type="text"
                  placeholder="ORD12345"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <button type="submit" className="px-4 py-2 border rounded shadow hover:shadow-lg transition-shadow">
                Track
              </button>
            </form>
            <p className="italic text-sm">Tracking info will appear here.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
