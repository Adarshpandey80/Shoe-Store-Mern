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
    {/* <div className="bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-bold text-center py-6">
    Recently Viewed Products
  </h1>

  <div className="px-6 pb-10">
    <Carousel className="w-full max-w-7xl mx-auto">
      <CarouselContent>
        {recentProducts.map((item) => (
          <CarouselItem
            key={item._id}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden mx-2">
              <img
                src={item.defaultImage}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {item.name}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</div> */}
   </>
  )
}


export default RecentProduct