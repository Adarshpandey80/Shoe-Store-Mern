import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "../cartSlice";

function MyCart() {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  let totalAmount = 0;
  cartItems.forEach((item) => {
    totalAmount += item.price * item.qnty;
  });

  return (
    <>
    
     <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col md:flex-row gap-6"
            >
              {/* Image */}
              <div className="w-full md:w-40 h-40 rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {item.description}
                </p>

                <p className="text-lg font-bold">₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      className="px-3 py-1 text-lg hover:bg-gray-100"
                       onClick={() => dispatch(decreaseQty(item._id))}
                    >
                      −
                    </button>

                    <span className="px-4 py-1 font-medium">
                      {item.qnty}
                    </span>

                    <button
                      className="px-3 py-1 text-lg hover:bg-gray-100"
                       onClick={() => dispatch(increaseQty(item._id))}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    className="text-sm text-red-500 hover:underline"
                     onClick={() => dispatch(removeItem(item._id))}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ₹{item.price * item.qnty}
                </p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>

          ))} 


            <div className="text-right mt-6">
                <h2 className="text-2xl font-bold">
                    Total Amount: ₹{totalAmount}
                </h2>

                <button className="mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                    Proceed to Checkout
                </button>

            </div>
        </div>
        
      )}
    </div>
    </>
   
  );
}

export default MyCart;
