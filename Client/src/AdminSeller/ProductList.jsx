import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function ProductList() {
  const navigate = useNavigate()

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);



  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProduct({
      ...product,
      [name]: value,
    });

  };
  console.log(product);

  const handleImage = (e) => {
    setImages(e.target.files);
  }

  const handleTag = (e) => {
    let { value, checked } = e.target;
    if (value === 'new') {
      setProduct({
        ...product,
        isNewArrival: checked,
      });

    } else if (value === 'sale') {
      setProduct({
        ...product,
        isSale: checked,
      });
    }
  }

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const api = "http://localhost:8000/products/listProducts";

const token = localStorage.getItem("sellertoken");

    let formData = new FormData();

    for (let key in product) {
      formData.append(key, product[key]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const response = await axios.post(api, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(response.data)
    navigate("/adminSeller/dashboard")
  } catch (error) {
    if (error.response?.data?.message === "KYC_NOT_VERIFIED") {
      toast.error("Complete your KYC Frist" , {position : "top-center"})
      navigate("/adminSeller/kyc");
    } else {
      console.error(error);
    }
  }
};


  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Product
          </h2>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"

              onChange={handleChange}
              placeholder="Nike Air Zoom Pegasus"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                required
              >
                <option value="">Select Category</option>
                <option value="running">Running</option>
                <option value="casual">Casual</option>
                <option value="basketball">Basketball</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">For</label>
              <select name="gender" onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* Tags */}
            <div className="flex gap-4 mt-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" value='new' onChange={handleTag} />
                <span>New Arrival</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value='sale' onChange={handleTag} />
                <span>On Sale</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"

                onChange={handleChange}
                placeholder="12999"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"

              onChange={handleChange}
              rows="4"
              placeholder="Premium lightweight running shoes..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Image URLs */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Product Images
            </label>
            <input
              type="file"
              name='images'
              onChange={handleImage}
              multiple
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p className='text-xs text-gray-500'>Choose multiple images  </p>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Save Product
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-white border-2 border-black  text-black py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  )
}


export default ProductList