import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecentProduct from "../pages/RecentProduct";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"
import {
  User,
  Box,
  Gift,
  Heart,
  HelpCircle,
  ShoppingBag,
  Edit,
  CreditCard,
  LogOut,
} from "lucide-react";





const Dashboard = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  };

  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  


 const userData = async ()=>{
  const api = 'http://localhost:8000/user/getuserdata';
    try {
      const response = await axios.get(api);
      console.log(response.data)
     
    } catch (error) {
      console.error("Error fetching sale products:", error);
    }
 }


useEffect(()=>{
  userData();
} ,[])




  return (
    <> 
    <Navbar/>

    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-8 md:py-10">

  {/* ===== MAIN CONTAINER ===== */}
  <div className="max-w-6xl mx-auto space-y-6">

    {/* ===== USER HEADER ===== */}
    <div className="bg-indigo-700 p-6 rounded-2xl shadow-lg flex items-center gap-4 text-white">
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center 
        text-2xl font-bold text-indigo-700">
        {username[0]}
      </div>

      <div>
        <h2 className="text-2xl font-bold">Welcome , {username}</h2>
        <p className="text-indigo-200 text-sm">{email}</p>
      </div>
    </div>

    {/* ===== QUICK ACTION BOXES ===== */}
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Your Activity
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/account/order"
          className="bg-white rounded-2xl shadow-md p-5 
          flex flex-col items-center hover:shadow-xl transition hover:-translate-y-1"
        >
          <Box className="w-7 h-7 text-yellow-500" />
          <span className="mt-2 font-semibold">Orders</span>
        </Link>

        <Link
          to="/account/cart"
          className="bg-white rounded-2xl shadow-md p-5 
          flex flex-col items-center hover:shadow-xl transition hover:-translate-y-1"
        >
          <ShoppingBag className="w-7 h-7 text-indigo-500" />
          <span className="mt-2 font-semibold">Your Cart</span>
        </Link>

        <Link
          to="/account/watchlist"
          className="bg-white rounded-2xl shadow-md p-5 
          flex flex-col items-center hover:shadow-xl transition hover:-translate-y-1"
        >
          <Heart className="w-7 h-7 text-pink-500" />
          <span className="mt-2 font-semibold">Wishlist</span>
        </Link>

        <Link
          to="/account/helpcenter"
          className="bg-white rounded-2xl shadow-md p-5 
          flex flex-col items-center hover:shadow-xl transition hover:-translate-y-1"
        >
          <HelpCircle className="w-7 h-7 text-green-500" />
          <span className="mt-2 font-semibold">Help Center</span>
        </Link>
      </div>
    </div>

    {/* ===== ACCOUNT SETTINGS ===== */}
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Account Settings
      </h3>

      <div className="divide-y">
        <Link
          to="/account/profile"
          className="flex items-center gap-3 px-4 py-3 
          hover:bg-gray-50 rounded-lg transition"
        >
          <Edit className="w-5 h-5 text-gray-600" />
          Edit Profile
        </Link>

        <Link
          to="/account/address"
          className="flex items-center gap-3 px-4 py-3 
          hover:bg-gray-50 rounded-lg transition"
        >
          <User className="w-5 h-5 text-gray-600" />
          Manage Addresses
        </Link>

        <Link
          to="/adminSeller"
          className="flex items-center gap-3 px-4 py-3 
          hover:bg-gray-50 rounded-lg transition"
        >
          <CreditCard className="w-5 h-5 text-gray-600" />
          Sell Your Products
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 
          text-red-600 font-semibold hover:bg-red-50 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>

    {/* ===== RECENT PRODUCTS ===== */}
    <div className="bg-white rounded-2xl shadow-lg p-5">
      

      <RecentProduct />
    </div>

  </div>
</div>
 </>
  );
};

export default Dashboard;
