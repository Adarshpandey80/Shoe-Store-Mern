import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"


function KYCForm() {
 
  const navigate= useNavigate()

  


  const [formData, setFormData] = useState({
    businessName: "",
    panNumber: "",
    gstNumber: "",
    panCard: null,
    aadhaar: null,
    cheque: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

     const response = await axios.post("http://localhost:8000/admin/submit-kyc", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sellertoken")}`,
      },
    });
    toast.success(response.data.message , {position : "top-center"});
    navigate("/adminSeller/dashboard")
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Seller KYC Verification
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Complete KYC to start listing your products
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Business Name */}
          <div>
            <label className="text-sm font-medium">Business Name</label>
            <input
              type="text"
              name="businessName"
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* PAN */}
          <div>
            <label className="text-sm font-medium">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* GST */}
          <div>
            <label className="text-sm font-medium">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* PAN CARD */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">PAN Card</label>
            <input
              type="file"
              name="panCard"
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* AADHAAR */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Aadhaar Card</label>
            <input
              type="file"
              name="aadhaar"
              onChange={handleChange}
              required
               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* CHEQUE */}
          {/* <div>
            <label className="text-sm font-medium">Cancelled Cheque</label>
            <input
              type="file"
              name="cheque"
              onChange={handleChange}
              required
              className="w-full mt-1"
            />
          </div> */}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white py-3 rounded-xl font-semibold hover:bg-black transition"
            >
              Submit KYC
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default KYCForm;
