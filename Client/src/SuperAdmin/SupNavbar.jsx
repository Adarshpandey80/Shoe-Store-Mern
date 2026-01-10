import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

function SupNavbar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ===== BRAND ===== */}
        <Link to="/superadmin" className="text-2xl font-extrabold text-slate-900">
          ShoeVerse<span className="text-indigo-600">.</span>Admin
        </Link>

        {/* ===== DESKTOP NAV ===== */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/superadmin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          {/* <NavLink to="/superadmin/sellers" className={navLinkClass}>
            Sellers
          </NavLink> */}

          <NavLink to="/superadmin/kycrequist" className={navLinkClass}>
            KYC Requests
          </NavLink>

         
        </nav>

        {/* ===== PROFILE ===== */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Super Admin
            </span>
          </div>
        </div>

        {/* ===== MOBILE MENU BUTTON ===== */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4 shadow-lg">
          <NavLink onClick={() => setOpen(false)} to="/superadmin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          {/* <NavLink onClick={() => setOpen(false)} to="/superadmin/sellers" className={navLinkClass}>
            Sellers
          </NavLink> */}

          <NavLink onClick={() => setOpen(false)} to="/superadmin/kyc" className={navLinkClass}>
            KYC Requests
          </NavLink>

       

          <div className="pt-3 border-t text-sm text-gray-500">
            Logged in as <span className="font-semibold">Super Admin</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default SupNavbar;
