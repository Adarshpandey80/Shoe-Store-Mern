import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X , Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserMenu from "../user/UserMenu";




const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItem);

  let totalitem = 0;
  cartItems.forEach((item) => {
    totalitem += item.qnty;
  });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider"
        >
          Prime<span className="text-yellow-400">Walk</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-medium text-gray-700">
          <li>
            <Link
              to="/mens"
              className="relative after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/women"
              className="relative after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to="/newarrival"
              className="relative after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
            >
              New Drops
            </Link>
          </li>
          <li>
            <Link
              to="/sale"
              className="relative after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
            >
              Sale
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6">

          {/* Normal Search */}
          <Search className="w-5 h-5 cursor-pointer" />

          {/* AI Search */}
          <Sparkles
            className="w-5 h-5 cursor-pointer text-purple-600 hover:scale-110 transition"
            title="AI Shoe Finder"
            onClick={() => navigate("/ai-search")}
          />

      
          <UserMenu />

          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 rounded-full">
              {totalitem}
            </span>
          </Link>

        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-center gap-6 py-6 font-medium">
            <Link
              to="/men"
              onClick={() => setOpen(false)}
              className="relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:-bottom-1"
            >
              Men
            </Link>
            <Link
              to="/women"
              onClick={() => setOpen(false)}
              className="relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:-bottom-1"
            >
              Women
            </Link>
            <Link
              to="/new"
              onClick={() => setOpen(false)}
              className="relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:-bottom-1"
            >
              New Drops
            </Link>
            <Link
              to="/sale"
              onClick={() => setOpen(false)}
              className="relative after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:-bottom-1"
            >
              Sale
            </Link>

            <div className="flex gap-6">
              <Link to="/search"><Search /></Link>
              <Link to="/ai-search"><Sparkles /></Link>
              <Link to="/login"><User /></Link>
              <Link to="/cart"><ShoppingBag /></Link>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

