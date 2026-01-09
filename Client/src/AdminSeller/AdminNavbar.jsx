import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SellerMenu from "./SellerMenu";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Wallet,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  ListPlus 
} from "lucide-react";

const SellerNavbar = () => {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between px-5 md:px-8 h-16">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <Link to="/adminSeller" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
              PrimeWalk
            </div>
            <span className="font-semibold text-slate-800 hidden sm:block">
              Seller
            </span>
          </Link>
        </div>

        {/* CENTER NAV (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">

          <Link to="/adminSeller/dashboard" className="hover:text-blue-600 flex gap-1">
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          

          <Link to="/adminSeller/allproducts" className="hover:text-blue-600 flex gap-1">
            <Package size={18} /> All Products
          </Link>
          <Link to="/adminSeller/productlist" className="hover:text-blue-600 flex gap-1">
            <ListPlus size={18} /> List Products
          </Link>

          <Link to="/adminSeller/order" className="hover:text-blue-600 flex gap-1">
            <ShoppingCart size={18} /> Orders
          </Link>

          <Link to="/seller/payments" className="hover:text-blue-600 flex gap-1">
            <Wallet size={18} /> Payments
          </Link>

          
        </nav>

       
        <SellerMenu/>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {openMenu && (
        <div className="md:hidden bg-white border-t shadow-lg px-5 py-4 space-y-3 text-sm">
          <MobileLink to="//adminSeller/dashboard">Dashboard</MobileLink>

          <button
            onClick={() => setProductMenu(!productMenu)}
            className="flex justify-between w-full"
          >
            Products <ChevronDown size={16} />
          </button>

          {productMenu && (
            <div className="ml-4 space-y-2 text-slate-600">
              <MobileLink to="/adminSeller/allproducts">All Products</MobileLink>
              <MobileLink to="/adminSeller/productlist">List Product</MobileLink>
              {/* <MobileLink to="/seller/products/sale">Sale Products</MobileLink> */}
            </div>
          )}

          <MobileLink to="/adminSeller/order">Orders</MobileLink>
          {/* <MobileLink to="/seller/payments">Payments</MobileLink>
          <MobileLink to="/seller/analytics">Analytics</MobileLink> */}
        </div>
      )}
    </header>
  );
};

/* ===== REUSABLE COMPONENTS ===== */
const DropdownLink = ({ to, children, danger }) => (
  <Link
    to={to}
    className={`block px-4 py-2 text-sm ${
      danger
        ? "text-red-600 hover:bg-red-50"
        : "text-slate-700 hover:bg-slate-100"
    }`}
  >
    {children}
  </Link>
);

const MobileLink = ({ to, children }) => (
  <Link to={to} className="block text-slate-700 hover:text-blue-600">
    {children}
  </Link>
);

export default SellerNavbar;
