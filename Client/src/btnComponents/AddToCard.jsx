import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../cartSlice'
import {toast} from "react-toastify"

function AddToCard({product}) {
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart.cartItem);

    const addtocard = () => {
        console.log("Add to Cart clicked");
        dispatch(addToCart({_id:product._id, name:product.name, description:product.description, category:product.category,  image:product.defaultImage, price:product.price, qnty:1}));
        toast.success("Product added successfully" , {position:"top-center"})
    }

    return (
        <>
            <button className="flex-1 border border-black text-black py-3 rounded-lg text-lg font-medium hover:bg-black hover:text-white transition"
                onClick={addtocard }
            >
                Add to Cart
                
            </button>
        </>
    )
}

export default AddToCard