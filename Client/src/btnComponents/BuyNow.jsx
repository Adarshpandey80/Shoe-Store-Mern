import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { buyNow } from '../cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BuyNow({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buyNowItem = useSelector((state) => state.cart.buyNowItem);

  const buyProduct = () => {
    console.log("Buy Now clicked");
    dispatch(buyNow({ _id: product._id, name: product.name, description: product.description, category: product.category, image: product.defaultImage, price: product.price, qnty: 1 }));
    navigate("/checkout");
  }





  return (
    <>
      <button className="flex-1 bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
        onClick={buyProduct}>
        Buy Now
      </button>
    </>
  )
}

export default BuyNow