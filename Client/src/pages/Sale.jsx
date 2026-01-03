import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BuyNow from '../btnComponents/BuyNow'
import AddToCard from '../btnComponents/AddToCard'

function Sale() {
  const [saleProducts, setSaleProducts] = useState([]);

  const fetchSaleProducts = async () => {
    const api = 'http://localhost:8000/products/saleProducts';
    try {
      const response = await axios.get(api);
      setSaleProducts(response.data);

    } catch (error) {
      console.error("Error fetching sale products:", error);
    }
  }


  useEffect(() => {
    fetchSaleProducts();
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
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 sm:px-6 py-12">

        {/* SALE HEADER */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-red-500">
            MEGA SALE 🔥
          </h1>
          <p className="text-gray-300 mt-3 text-sm sm:text-base">
            Limited-time deals on top styles – grab them before they’re gone
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {saleProducts.map((item) => (
            <div
              key={item._id}
              className="group bg-white text-black rounded-3xl overflow-hidden shadow-md hover:shadow-red-500/40 transition-all duration-300"
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

                {/* SALE BADGE */}
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-xs px-4 py-1 rounded-full font-semibold tracking-wide">
                    SALE
                  </span>
                </div>

                {/* DISCOUNT TAG (Optional UI) */}
                <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                  Hot Deal
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-semibold text-lg truncate">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 capitalize mt-1">
                  {item.category}
                </p>

                {/* PRICE */}
                <div className="flex items-center gap-3 mt-3">
                  <p className="text-xl font-bold text-red-600">
                    ₹{item.price}
                  </p>
                  <p className="text-sm line-through text-gray-400">
                    ₹{Math.round(item.price * 1.3)}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-5">
                  <BuyNow product={item} />
                  <AddToCard product={item} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {saleProducts.length === 0 && (
          <p className="text-center text-gray-400 mt-16 text-lg">
            No sale products available right now
          </p>
        )}
      </div>
    </>
  )
}

export default Sale