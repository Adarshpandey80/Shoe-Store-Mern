import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-16">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShoeVerse</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Premium footwear for every step. Discover the best shoes with
            comfort, style, and performance.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Men Shoes</Link></li>
            <li><Link to="/" className="hover:text-white">Women Shoes</Link></li>
            <li><Link to="/" className="hover:text-white">Sports Shoes</Link></li>
            <li><Link to="/" className="hover:text-white">New Arrivals</Link></li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-white">Shipping & Returns</Link></li>
            <li><Link to="/" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/" className="hover:text-white">Size Guide</Link></li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ShoeVerse. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
