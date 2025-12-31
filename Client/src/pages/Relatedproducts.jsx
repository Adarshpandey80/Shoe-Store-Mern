import React from 'react'
import axios from 'axios';
import { useEffect  , useState} from 'react';
import { Link } from 'react-router-dom';

function Relatedproducts({ category }) {
    const [products , setProducts] = useState([]);

    const relatedProducts = async() => {
         const api = `http://localhost:8000/products/related/${category}`;
        try {
            const response = await axios.get( api);
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };

  useEffect(() => {
        relatedProducts();
    }, [category]);
   
  return (
     <>
       <div className="mt-14">
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-6">
        Related Products
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.defaultImage}
                alt={item.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
              />
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
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold text-black">
                  ₹{item.price}
                </span>

                <span className="text-xs text-green-600 font-medium">
                  In Stock
                </span>
              </div>

              {/* Button */}
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
