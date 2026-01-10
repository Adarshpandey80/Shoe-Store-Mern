import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({});
  const [terms, setTerms] = useState(false)

  const handlChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTermsChange = (e) => {
    setTerms(e.target.checked);
  };


  const handlSubmit = async (e) => {
    e.preventDefault();

    if (!terms) {
      toast.alert("Please accept Terms & Conditions", { position: "top-center" });
      return;
    }

    try {
      const api = "http://localhost:8000/admin/register";
      const response = await axios.post(api, formData);

     toast.success(response.data.message , {position:"top-center"})
      console.log(response.data);
       navigate("/adminSeller/login")
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };




  return (
    <>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

  <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl 
    overflow-hidden grid grid-cols-1 md:grid-cols-2">

    {/* ===== LEFT SELLER INFO PANEL ===== */}
    <div className="hidden md:flex flex-col justify-between 
      bg-[#0F172A] text-white p-12">

      <div>
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
          ShoeVerse Seller Hub
        </h1>

        <p className="text-gray-300 mb-8 text-lg">
          Grow Your Footwear Business Online
        </p>

        <ul className="space-y-5 text-sm">
          <li className="flex items-center gap-3">
            <span className="text-green-400">✔</span>
            List Products & Manage Inventory
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✔</span>
            Pan-India Logistics Support
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✔</span>
            Secure & Timely Payments
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✔</span>
            Seller Analytics & Growth Insights
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-400">
        © 2026 ShoeVerse Seller Services Pvt. Ltd.
      </p>
    </div>

    {/* ===== RIGHT SELLER REGISTER FORM ===== */}
    <form
      onSubmit={handlSubmit}
      className="p-8 md:p-12 flex flex-col gap-4"
    >

      <h2 className="text-3xl font-bold text-gray-900">
        Register as a Seller
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Start selling on ShoeVerse in just a few steps
      </p>

      {/* SELLER NAME */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Seller Full Name
        </label>
        <input
          type="text"
          name="username"
          onChange={handlChange}
          required
          placeholder="Your full name"
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      </div>

      {/* BUSINESS / STORE NAME */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Store / Brand Name
        </label>
        <input
          type="text"
          name="storeName"
          onChange={handlChange}
          required
          placeholder="Your store name"
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Business Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handlChange}
          required
          placeholder="seller@yourbrand.com"
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      </div>

      {/* BUSINESS TYPE */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Business Type
        </label>
        <select
          name="businessType"
          onChange={handlChange}
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        >
          <option value="">Select</option>
          <option value="individual">Individual</option>
          <option value="proprietorship">Proprietorship</option>
          <option value="partnership">Partnership</option>
          <option value="company">Private Limited</option>
        </select>
      </div>

      {/* GST */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          GST Number (Optional)
        </label>
        <input
          type="text"
          name="gst"
          onChange={handlChange}
          placeholder="GSTIN (if available)"
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      </div>

      {/* MOBILE */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input
          type="tel"
          name="phone"
          onChange={handlChange}
          pattern="[0-9]{10}"
          placeholder="10-digit mobile number"
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      </div>

      {/* BUSINESS ADDRESS */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Business Address
        </label>
        <textarea
          name="address"
          onChange={handlChange}
          required
          placeholder="Warehouse / business address"
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handlChange}
          required
          placeholder="Create strong password"
          className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      </div>

      {/* TERMS */}
      <div className="flex items-start gap-2 mt-2">
        <input
          type="checkbox"
          required
          onChange={handleTermsChange}
          className="accent-indigo-600 mt-1"
        />
        <p className="text-sm text-gray-600">
          I agree to ShoeVerse Seller{" "}
          <span className="text-indigo-600 font-semibold hover:underline cursor-pointer">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-indigo-600 font-semibold hover:underline cursor-pointer">
            Policies
          </span>
        </p>
      </div>

      {/* CTA */}
      <button
        type="submit"
        className="mt-4 bg-[#0F172A] text-white py-3 rounded-xl 
        font-semibold text-lg hover:bg-black transition"
      >
        Register as Seller
      </button>

      {/* LOGIN */}
      <p className="text-sm text-center text-gray-600 mt-4">
        Already a Seller?
        <Link
          to="/adminSeller/login"
          className="text-indigo-700 font-semibold ml-1 hover:underline"
        >
          Login
        </Link>
      </p>

      <p className="text-xs text-center text-gray-400 mt-2">
        🔒 Secure Seller Platform • Trusted by Growing Brands
      </p>

    </form>
  </div>
</div>



    </>
  )
}

export default Register