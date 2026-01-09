import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StateCard";
import StatusBadge from "./StatusBadge";
import OrderViewModal from "./OrderViewModal";


function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const api = "http://localhost:8000/admin/allOrders";
      const response = await axios.get(api);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-500 mt-1">
          View and manage all customer orders
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
        <StatCard title="Pending Orders" value={orders.filter(o => o.paymentStatus === "pending").length} />
        <StatCard title="Completed Orders" value={orders.filter(o => o.paymentStatus === "success").length} />
      </div>

      {/* ===== ORDERS TABLE ===== */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Products</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-indigo-600">
                    #{order.orderId}
                  </td>

                  <td className="px-6 py-4">
                    {order.userId?.email || "User"}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹{order.amount}
                  </td>

                  <td className="px-6 py-4">
                    {order.products.length} items
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={order.paymentStatus} />
                  </td>

                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                   <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    View
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No orders found
          </div>
        )}
      </div>

      {/* ===== MODAL ===== */}
      {selectedOrder && (
        <OrderViewModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    
    </div>
  );
}

export default Orders;
