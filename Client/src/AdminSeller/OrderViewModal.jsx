import React from "react";
import { X } from "lucide-react";
import DownloadReceipt from "./DownloadReceipt";

function OrderViewModal({ order, onClose }) {
    if (!order) return null;

    const downloadReceipt = () => {

    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">

                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between p-5 border-b">
                    <h2 className="text-xl font-bold text-gray-900">
                        Order Details
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6 text-gray-500 hover:text-black" />
                    </button>
                </div>

                {/* ===== BODY ===== */}
                <div className="p-6 space-y-6">

                    {/* ORDER INFO */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <Info label="Order ID" value={order.orderId} />
                        <Info label="Payment ID" value={order.paymentId} />
                        <Info label="Amount" value={`₹${order.amount}`} />
                        <Info label="Status" value={order.paymentStatus} />
                        <Info
                            label="Date"
                            value={new Date(order.createdAt).toLocaleString()}
                        />
                    </div>

                    {/* PRODUCTS */}
                    <div>
                        <h3 className="font-semibold mb-3 text-gray-900">
                            Products
                        </h3>

                        <div className="space-y-3">
                            {order.products.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
                                >
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-semibold">₹{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ===== FOOTER ===== */}
                <div className="flex justify-end gap-3 p-5 border-t">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => DownloadReceipt(order)}
                        className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
                    >
                        Download Receipt
                    </button>

                </div>
            </div>
        </div>
    );
}

export default OrderViewModal;

const Info = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
    </div>
);
