import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"

function Register() {

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
      const api = "http://localhost:8000/user/register";
      const response = await axios.post(api, formData);

      alert("Registration successful!");
      console.log(response.data);

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  console.log(formData)
  console.log(terms)


  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl 
                  overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* ===== LEFT PREMIUM INFO PANEL ===== */}
          <div className="hidden md:flex flex-col justify-between 
                    bg-[#0F172A] text-white p-12">

            <div>
              <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
                ShoeVerse
              </h1>
              <p className="text-gray-300 mb-8 text-lg">
                Premium Footwear • Trusted by Millions
              </p>

              <ul className="space-y-5 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">★</span>
                  Fast & Secure Checkout
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">★</span>
                  Free Delivery on First Order
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">★</span>
                  Easy Returns & Refunds
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-400">★</span>
                  Exclusive Member Discounts
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-400">
              © 2026 ShoeVerse. Secure payments guaranteed.
            </p>
          </div>

          {/* ===== RIGHT SIGNUP FORM ===== */}
          <form
            onSubmit={handlSubmit}
            className="p-8 md:p-12 flex flex-col gap-4"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Join ShoeVerse for faster checkout & premium benefits
            </p>

            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="username"
                onChange={handlChange}
                required
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-2.5 border rounded-xl 
                focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handlChange}
                required
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2.5 border rounded-xl 
               focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

            {/* ===== GENDER (OPTIONAL) ===== */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Gender (Optional)</label>
              <select
                name="gender"
                onChange={handlChange}
                className="border border-gray-300 rounded-lg px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* MOBILE */}
            <div>
              <label className="text-sm font-medium text-gray-700">Mobile Number</label>
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

            {/* PINCODE */}
            <div>
              <label className="text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                name="pincode"
                onChange={handlChange}
                pattern="[0-9]{6}"
                placeholder="Check delivery availability"
                className="w-full mt-1 px-4 py-2.5 border rounded-xl 
                  focus:ring-2 focus:ring-indigo-600 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Used to check delivery & service availability
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Your Address</label>
              <textarea
                type="email"
                name="address"
                onChange={handlChange}
                required
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2.5 border rounded-xl 
               focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handlChange}
                required
                placeholder="Create strong password"
                className="w-full mt-1 px-4 py-2.5 border rounded-xl 
          focus:ring-2 focus:ring-indigo-600 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                8+ characters with letters & numbers
              </p>
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" required className="accent-indigo-600 mt-1" onChange={handleTermsChange} />
              <p className="text-sm text-gray-600">
                I agree to ShoeVerse{" "}
                <span className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                  Terms
                </span>{" "}
                &{" "}
                <span className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="mt-4 bg-[#0F172A] text-white py-3 rounded-xl 
             font-semibold text-lg hover:bg-black transition"
            >
              Create Account
            </button>

            {/* LOGIN */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?
              <Link
                to="/login"
                className="text-indigo-700 font-semibold ml-1 hover:underline"
              >
                Login
              </Link>
            </p>

            {/* TRUST */}
            <p className="text-xs text-center text-gray-400 mt-2">
              🔒 Secure signup • Trusted by 1M+ users
            </p>
          </form>

        </div>
      </div>



    </>
  )
}

export default Register