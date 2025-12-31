import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, buyNow } from "../cartSlice";
import { useNavigate } from "react-router-dom";
import BuyNow from "../btnComponents/BuyNow";
import AddToCard from "../btnComponents/AddToCard";
import Relatedproducts from "./Relatedproducts";


function ShowProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart.cartItem);

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState("");

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/products/${id}`
            );
            setProduct(response.data);
            setActiveImage(response.data.defaultImage);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) {
        return <p className="text-center mt-10">Loading...</p>;
    }




    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* LEFT: IMAGES */}
                    <div>
                        {/* Main Image */}
                        <div className="border rounded-xl overflow-hidden mb-4">
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="w-full h-[420px] object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {[product.defaultImage, ...product.images].map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="thumb"
                                    onMouseEnter={() => setActiveImage(img)}
                                    onMouseLeave={() => setActiveImage(product.defaultImage)}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition
                                ${activeImage === img ? "border-black" : "border-gray-300"}`}
                                />

                            ))}
                        </div>
                    </div>

                    {/* RIGHT: DETAILS */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        <h1 className="text-xl font-medium">{product.category} <span className="text-amber-950">Shoes</span></h1>

                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-black">
                                ₹{product.price}
                            </span>
                            <span className="text-green-600 text-sm font-medium">
                                In Stock
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">

                            <BuyNow product={product} />
                            <AddToCard product={product} />

                        </div>

                        {/* Extra Info */}
                        <div className="pt-6 border-t space-y-2 text-sm text-gray-600">
                            <p>✔ 100% Original Products</p>
                            <p>✔ Free Delivery</p>
                            <p>✔ Easy 7 Days Return</p>
                        </div>
                    </div>
                </div>
            </div>
            <Relatedproducts category={product.category} />
        </>
    );
}

export default ShowProduct;
