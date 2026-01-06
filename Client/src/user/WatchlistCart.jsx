import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeartOff, ShoppingCart } from "lucide-react";
import { removeWatchlistProd, addToCart } from "../cartSlice";
import { Link } from "react-router-dom";
import AddToCard from "../btnComponents/AddToCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


function WatchlistCart() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => state.cart.watchCart);

    return (
        <div className="min-h-screen  from-slate-100 to-slate-200 py-10 px-6">
            <div className="max-w-7xl mx-auto">

                {/* ===== HEADER ===== */}
                <div className="mb-8 flex items-center justify-between">
                    {/* Left: Back Button + Title */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-full border bg-white shadow-sm 
                           hover:bg-gray-100 transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>


                        <div>
                            <h1 className="text-4xl font-bold text-slate-900">
                                My Wishlist
                            </h1>
                            <p className="text-slate-500 mt-1">
                                Items you love, saved for later ❤️
                            </p>
                        </div>
                    </div>
                </div>


                {/* ===== EMPTY STATE ===== */}
                {watchlist.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-12 text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="Empty Wishlist"
                            className="w-36 mx-auto mb-6"
                        />
                        <h2 className="text-2xl font-semibold mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Tap the ❤️ icon to save products you like
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center 
              bg-black text-white px-8 py-3 rounded-xl 
              hover:bg-gray-900 transition shadow-lg"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    /* ===== GRID ===== */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {watchlist.map((item) => (
                            <div
                                key={item._id}
                                className="group relative bg-white/70 backdrop-blur 
                rounded-3xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* SAVED BADGE */}
                                <span
                                    className="absolute top-4 left-4 z-10 
                  bg-black text-white text-xs px-3 py-1 rounded-full"
                                >
                                    Saved
                                </span>

                                {/* IMAGE */}
                                <Link to={`/product/${item._id}`}>
                                    <div className="overflow-hidden rounded-t-3xl">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-56 object-cover 
                      group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>

                                {/* CONTENT */}
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg truncate">
                                        {item.name}
                                    </h3>

                                    <p className="text-2xl font-bold text-slate-900 mt-2">
                                        ₹{item.price}
                                    </p>

                                    <p className="text-sm text-green-600 font-medium mt-1">
                                        In Stock
                                    </p>

                                    {/* ACTIONS */}
                                    <div className="flex gap-3 mt-5">
                                        <AddToCard />

                                        <button
                                            onClick={() =>
                                                dispatch(removeWatchlistProd(item._id))
                                            }
                                            className="p-2.5 rounded-xl border 
                      hover:bg-red-50 transition"
                                            title="Remove from wishlist"
                                        >
                                            <HeartOff className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default WatchlistCart;
