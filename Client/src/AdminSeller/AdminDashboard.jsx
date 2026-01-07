import React from "react";
import {
  Package,
  Layers,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Seller Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your products, stock & orders
        </p>
      </div>

      {/* ===== KPI SECTION ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Total Products"
          value="128"
          icon={<Package />}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Total Orders"
          value="642"
          icon={<ShoppingCart />}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="In Stock"
          value="94"
          icon={<TrendingUp />}
          color="bg-emerald-100 text-emerald-600"
        />

        <StatCard
          title="Low / Out Stock"
          value="34"
          icon={<AlertTriangle />}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* ===== PRODUCT TYPE SUMMARY ===== */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Product Type Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <CategoryCard
            title="Men's Shoes"
            count="48"
            stock="In Stock: 36"
          />

          <CategoryCard
            title="Women's Shoes"
            count="32"
            stock="In Stock: 25"
          />

          <CategoryCard
            title="New Drops"
            count="21"
            stock="In Stock: 18"
          />

          <CategoryCard
            title="Sale Products"
            count="27"
            stock="In Stock: 15"
          />
        </div>
      </div>

      {/* ===== STOCK TABLE ===== */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Product Stock Overview
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Stock</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <StockRow
                name="AirMax Pro"
                category="Men"
                stock="24"
                status="In Stock"
              />
              <StockRow
                name="FlexRun Women"
                category="Women"
                stock="6"
                status="Low Stock"
              />
              <StockRow
                name="StreetX Limited"
                category="New Drop"
                stock="0"
                status="Out of Stock"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
  </div>
);

const CategoryCard = ({ title, count, stock }) => (
  <div className="border rounded-xl p-5 hover:shadow-md transition">
    <div className="flex items-center justify-between mb-2">
      <Layers className="text-slate-600" size={20} />
      <span className="text-sm text-slate-500">
        {count} items
      </span>
    </div>
    <h3 className="font-semibold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 mt-1">{stock}</p>
  </div>
);

const StockRow = ({ name, category, stock, status }) => {
  const statusStyle =
    status === "In Stock"
      ? "bg-green-100 text-green-700"
      : status === "Low Stock"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";

  return (
    <tr className="border-b last:border-none">
      <td className="px-4 py-3 font-medium">{name}</td>
      <td className="px-4 py-3">{category}</td>
      <td className="px-4 py-3 font-semibold">{stock}</td>
      <td className="px-4 py-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default AdminDashboard;
