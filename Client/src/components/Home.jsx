import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSelector , useDispatch} from 'react-redux';
import { addToCart } from "../cartSlice";
import { Link } from "react-router-dom";
import Carousel from "../pages/Carousel";

function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart.cartItem);

  const fetchData = async () => {
    try {
      const api = "http://localhost:8000/products/showProducts";
      const response = await axios.get(api);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


 const storeProductId = (id) => {
  // get existing ids
  const storedIds = JSON.parse(localStorage.getItem("productIds")) || [];

  // avoid duplicate ids (optional but recommended)
  if (!storedIds.includes(id)) {
    storedIds.push(id);
  }

  // save back to localStorage
  localStorage.setItem("productIds", JSON.stringify(storedIds));
};


  return (
    <>
    <Carousel/>
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6">
        Latest Shoes Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-10">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-2xl">
              <button className="w-full h-56 overflow-hidden" onClick={() => storeProductId(item._id)}>
                <Link to={`/product/${item._id}`}>
              <img
                src={item.defaultImage}
                alt={item.name}
                className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
              />
              </Link>
              </button>
              
              
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-black">
                  ₹{item.price}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Buy Now
                </button>

                <button
                  className="flex-1 border border-black text-black py-2 rounded-lg font-medium hover:bg-black hover:text-white transition"
                  onClick={() => dispatch(addToCart({_id:item._id, name:item.name, description:item.description, category:item.category,  image:item.defaultImage, price:item.price, qnty:1}))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}

export default Home;
