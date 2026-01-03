import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import BuyNow from '../btnComponents/BuyNow'
import AddToCard from '../btnComponents/AddToCard'

function Women() {
  const [womenProducts, setWomenProducts] = useState([]);

  const fetchWomenProducts = async () => {
    try {
      const api = "http://localhost:8000/products/womenProducts";
      const response = await axios.get(api);
      setWomenProducts(response.data);
    } catch (error) {
      console.error("Error fetching women products:", error);
    }
  };

  useEffect(() => {
    fetchWomenProducts();
  }, []);

  const storeProductId = (id) => {
    // get existing ids
    const storedIds = JSON.parse(localStorage.getItem("productIds")) || [];

    // avoid duplicate ids (optional but recommended)
    if (!storedIds.includes(id)) {
      storedIds.unshift(id); // add to the beginning

      if (storedIds.length > 10) {
        storedIds.pop();
      }
    }
    // save back to localStorage
    localStorage.setItem("productIds", JSON.stringify(storedIds));
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 py-10">
      {/* Page Heading */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Women’s Collection
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Elegant styles crafted for comfort & confidence
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {womenProducts.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-64 overflow-hidden">
              <Link to={`/product/${item._id}`} onClick={() => storeProductId(item._id)}>
                <img
                  src={item.defaultImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Link>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {item.isNewArrival && (
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {item.isSale && (
                  <span className="bg-pink-600 text-white text-xs px-3 py-1 rounded-full">
                    SALE
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-lg truncate">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 capitalize mt-1">
                {item.category}
              </p>

              <p className="text-xl font-bold mt-3">
                ₹{item.price}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-5">
                <BuyNow product={item} />
                <AddToCard product={item} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {womenProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No women’s products available
        </p>
      )}
    </div>
  );
}

export default Women;
