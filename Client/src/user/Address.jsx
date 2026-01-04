import React, { useEffect, useState } from "react";
import { MapPin, Plus, Edit2, Trash2, X, ArrowLeft } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";


function Address() {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const [userId, setUserId] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= GET USER ID ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  /* ================= FETCH ADDRESS ================= */
  useEffect(() => {
    if (!userId) return;

    const fetchAddress = async () => {
      try {
        const api = `http://localhost:8000/user/getaddress/${userId}`;
        const response = await axios.get(api);
        setAddresses(response.data.address);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading addresses...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/account")}
              className="p-2 rounded-lg bg-white border shadow 
      hover:bg-gray-100 transition"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Saved Addresses
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage delivery addresses for faster checkout
              </p>
            </div>
          </div>
        

          <button
            onClick={() => setShowDrawer(true)}
            className="flex items-center gap-2 bg-black text-white 
            px-5 py-2.5 rounded-xl hover:bg-slate-900 transition shadow-lg"
          >
            <Plus size={18} /> Add Address
          </button>
        </div>   


        {/* ===== ADDRESS GRID ===== */}
        {addresses.length === 0 ? (
          <div className="text-center text-slate-500 mt-20">
            No saved addresses found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="relative rounded-2xl bg-white 
                border border-slate-200 shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-900 rounded-lg text-white">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-slate-800">
                      {addr.fullName}
                    </h3>

                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {addr.address}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Pincode: {addr.pincode}
                    </p>

                    <p className="text-sm text-slate-500">
                      Phone: {addr.phone}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-5 mt-6 text-sm font-medium">
                  <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
                    <Edit2 size={15} /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-rose-600 hover:text-rose-800">
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== ADD ADDRESS DRAWER ===== */}
        {showDrawer && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="flex-1 bg-black/40"
              onClick={() => setShowDrawer(false)}
            />

            <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 animate-slideIn">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Add New Address
                </h2>
                <button onClick={() => setShowDrawer(false)}>
                  <X />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  placeholder="Full Name"
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                />
                <input
                  placeholder="Mobile Number"
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                />
                <textarea
                  placeholder="Complete Address"
                  rows={3}
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-black outline-none resize-none"
                />
                <input
                  placeholder="Pincode"
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <button
                className="mt-6 w-full bg-black text-white py-3 rounded-xl 
                font-semibold hover:bg-slate-900 transition"
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== SLIDE ANIMATION ===== */}
      <style>
        {`
          .animate-slideIn {
            animation: slideIn 0.35s ease-out;
          }
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Address;
