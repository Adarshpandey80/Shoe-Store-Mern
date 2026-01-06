import React from "react";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addWatchlistProd, removeWatchlistProd } from "../cartSlice";

function WatchlistBtn({ product }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.cart.watchCart);

  // ✅ check if product already in watchlist
  const isLiked = watchlist.some(
    (item) => item._id === product._id
  );

  const toggleWatchlist = () => {
    if (isLiked) {
      dispatch(removeWatchlistProd(product._id));
    } else {
      dispatch(
        addWatchlistProd({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.defaultImage,
        })
      );
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className="absolute top-3 right-3 bg-white p-2 rounded-full 
      shadow-md hover:scale-110 transition z-10"
    >
      <Heart
        className={`w-5 h-5 transition ${
          isLiked
            ? "text-red-500 fill-red-500"
            : "text-gray-600"
        }`}
      />
    </button>
  );
}

export default WatchlistBtn;
