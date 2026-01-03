import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BuyNow from '../btnComponents/BuyNow'
import AddToCard from '../btnComponents/AddToCard'


function SeeCategoryProd() {
    const { category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);

    const fetchCategoryProducts = async () => {
        const api = `http://localhost:8000/products/category/${category}`;
        try {
            const response = await axios.get(api);
            setCategoryProducts(response.data);

        } catch (error) {
            console.error("Error fetching category products:", error);
        }
    }
    useEffect(() => {
        fetchCategoryProducts();
    }, [category]);


  return (
   <>
   <div className="bg-gray-50 min-h-screen px-4 sm:px-6 py-10">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold capitalize">
          {category} Collection
        </h1>
        <p className="text-gray-500 mt-2">
          Explore premium {category} products curated for you
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categoryProducts.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-64 bg-gray-100 overflow-hidden">
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.defaultImage}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>

              {/* BADGES */}
              <div className="absolute top-4 left-4 flex gap-2">
                {item.isNewArrival && (
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    New
                  </span>
                )}
                {item.isSale && (
                  <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                    Sale
                  </span>
                )}
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
              <p className="text-xl font-bold mt-3">
                ₹{item.price}
              </p>

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
      {categoryProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">
          No products found in this category
        </p>
      )}
    </div>
   </>
  )
}

export default SeeCategoryProd