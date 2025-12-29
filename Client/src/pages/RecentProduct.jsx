import React from 'react'
import { useEffect, useState } from "react";

function RecentProduct() {
    
    const [productIds, setProductIds] = useState([]);

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem("productIds")) || [];
        setProductIds(ids);
    }, []);
    
    const api =  `http://localhost:8000/products/image/${productIds}`;

  return (
   <>
    <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center py-6">
        Recently Viewed Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-10">
        {productIds.length === 0 ? (
            <p className="text-center col-span-full">No recently viewed products.</p>
        ) : (
            productIds.map((id) => (
            <div
                key={id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
                {/* Image */}
                <div className="overflow-hidden rounded-t-2xl">
                <img
                    src={`http://localhost:8000/products/image/${id}`} // Adjust the URL as needed
                    alt="Recently Viewed Product"


                    className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
                />
                </div>

                {/* Content */}
                <div className="p-5">
                <h2 className="text-lg font-semibold mb-2">Product Name</h2>
                <p className="text-gray-600 mb-4">Brief description of the product.</p>
                <span className="text-xl font-bold text-black">$99.99</span>
                </div>
            </div>
            ))
        )}
        </div>
    </div>  
   
   </>
  )
}


export default RecentProduct