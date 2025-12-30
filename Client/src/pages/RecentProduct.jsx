import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";



function RecentProduct() {
    
    const [productIds, setProductIds] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);


    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem("productIds")) || [];
        setProductIds(ids);
         console.log(productIds);
        recentProduct();
    }, []);

      
 
    
  const recentProduct = async()=>{
        productIds.map(async(id)=>{
            try {
                const response = await axios.get(`http://localhost:8000/products/recent/${id}`);
                console.log(response.data);
                setRecentProducts((prevProducts) => [...prevProducts, response.data]);
              
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        })
  }

  return (
   <>
    <div className="bg-gray-50 py-8">
  <h1 className="text-3xl font-bold text-center mb-6">
    Recently Viewed Products
  </h1>

  <div className="flex gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide">
    {recentProducts.map((item) => (
      <div
        key={item._id}
        className="min-w-[250px] bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0"
      >
        <img
          src={item.defaultImage}
          alt={item.name}
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <h2 className="text-lg font-semibold truncate">
            {item.name}
          </h2>
          <p className="text-gray-600 mt-1">₹{item.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>

   </>
  )
}


export default RecentProduct