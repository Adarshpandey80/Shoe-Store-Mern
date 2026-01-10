import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Store,
  Package,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
} from "lucide-react";

function SuperAdminDashboard() {
  const [stats, setStats] = useState({});
  const [recentSellers, setRecentSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/superadmin/dashboard"
      );
      setStats(res.data.stats);
      setRecentSellers(res.data.recentSellers);
    } catch (error) {
      console.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of platform activity & seller verification
        </p>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">

        <StatCard
          title="Total Sellers"
          value={stats.totalSellers}
          icon={<Store />}
          color="bg-indigo-600"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users />}
          color="bg-blue-600"
        />

        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={<Package />}
          color="bg-purple-600"
        />

        <StatCard
          title="KYC Approved"
          value={stats.approvedSellers}
          icon={<ShieldCheck />}
          color="bg-green-600"
        />

        <StatCard
          title="KYC Pending"
          value={stats.pendingKyc}
          icon={<ShieldAlert />}
          color="bg-yellow-500"
        />

        <StatCard
          title="KYC Rejected"
          value={stats.rejectedKyc}
          icon={<ShieldX />}
          color="bg-red-600"
        />
      </div>

      {/* ===== RECENT SELLERS TABLE ===== */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Recently Registered Sellers
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Store</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">KYC Status</th>
              <th className="px-6 py-4 text-left">Joined</th>
            </tr>
          </thead>

          <tbody>
            {recentSellers.map((seller) => (
              <tr
                key={seller._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {seller.storeName}
                </td>
                <td className="px-6 py-4">{seller.email}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={seller.kycState} />
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(seller.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recentSellers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No sellers found
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== STAT CARD COMPONENT ===== */
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">
        {value ?? 0}
      </p>
    </div>
  </div>
);

/* ===== STATUS BADGE ===== */
const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default SuperAdminDashboard;
