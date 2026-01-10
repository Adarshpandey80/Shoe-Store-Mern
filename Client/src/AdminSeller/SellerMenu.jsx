import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";

function SellerMenu() {
      const [open, setOpen] = useState(false);
      const navigate = useNavigate();
        const isLoggedIn = !!localStorage.getItem("sellertoken");

       const handleLogout = () => {
    localStorage.removeItem("sellertoken");
    localStorage.removeItem("sellerInfo");

    navigate("/adminSeller/login");
  };

  return (
    <>
    <div className="relative">
      {/* USER ICON */}
      <User
        className="w-5 h-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/adminSeller/kyc"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                KYC
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
    </>
  )
}

export default SellerMenu