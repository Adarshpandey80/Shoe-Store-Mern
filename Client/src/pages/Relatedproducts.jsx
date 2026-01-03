import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Relatedproducts({ category }) {
  const [products, setProducts] = useState([]);

  const relatedProducts = async () => {
    const api = `http://localhost:8000/products/related/${category}`;
    try {
      const response = await axios.get(api);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    relatedProducts();
  }, [category]);

   const visibleProducts = products.slice(0, 12); // Show only first 10 products

  return (
    <>
      <div className="mt-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Related Products</h2>

          <Link
            to={`/product/category/${products[0]?.category}`}
            className="text-sm font-semibold text-black hover:underline"
          >
            See More →
          </Link>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {visibleProducts.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item._id}`}
              className="w-48 sm:w-56 md:w-60 flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"

            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={item.defaultImage}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {item.description}
                </p>

                {/* Price */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold">₹{item.price}</span>
                  <span className="text-xs text-green-600 font-medium">
                    In Stock
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm 
            opacity-0 group-hover:opacity-100 transition"
                >
                  View Product
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  )
}

export default Relatedproducts
