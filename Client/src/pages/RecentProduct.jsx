import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RecentProduct() {
  const navigate = useNavigate();
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("productIds")) || [];

    if (ids.length === 0) return;

    fetchRecentProducts(ids);
  }, []);

  const fetchRecentProducts = async (ids) => {
    try {
      const requests = ids.map((id) =>
        axios.get(`http://localhost:8000/products/recent/${id}`)
      );

      const responses = await Promise.all(requests);

      const products = responses.map((res) => res.data);
      setRecentProducts(products);
    } catch (error) {
      console.error("Error fetching recent products:", error);
    }
  };

  if (recentProducts.length === 0) return null;

  return (
    <div className="bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Recently Viewed Products
      </h1>

      <div className="flex gap-6 overflow-x-auto px-6 pb-4">
        {recentProducts.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            
            className="min-w-[240px] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.defaultImage}
              alt={item.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-sm font-semibold truncate">
                {item.name}
              </h2>
              <p className="text-lg font-bold mt-1">
                ₹{item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentProduct;
