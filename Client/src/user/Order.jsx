import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Download } from "lucide-react";
  import jsPDF from "jspdf";

function Order() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchOrderHistory = async () => {
      try {
        const api = `http://localhost:8000/user/getOrderHistory/${userId}`;
        const response = await axios.get(api);
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userId]);



const downloadReceipt = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Order Invoice", 20, 20);

  doc.setFontSize(11);
  doc.text(`Order ID: ${order.orderId}`, 20, 35);
  doc.text(`Payment ID: ${order.paymentId}`, 20, 42);
  doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 49);
  doc.text(`Total Amount: ₹${order.amount}`, 20, 56);
  doc.text(`Payment Status: ${order.paymentStatus}`, 20, 63);

  doc.text("Products:", 20, 75);

  let y = 85;
  order.products.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.name} | ₹${item.price} × ${item.quantity}`,
      20,
      y
    );
    y += 8;
  });

  doc.text("Thank you for shopping with us!", 20, y + 15);

  doc.save(`order_${order.orderId}.pdf`);
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orderHistory.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          You have not placed any orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orderHistory.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-6 border"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    <b>Order ID:</b> <span className="font-medium">{order.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <b>Payment ID:</b> <span className="font-medium">{order.paymentId}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <b>Placed on:</b>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-lg">₹{order.amount}</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${order.paymentStatus === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="mt-4 space-y-3">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => downloadReceipt(order)}
                  className="flex items-center gap-2 px-4 py-2 text-sm 
                  border rounded-lg hover:bg-gray-100 transition"
                >
                  <Download size={16} /> Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
