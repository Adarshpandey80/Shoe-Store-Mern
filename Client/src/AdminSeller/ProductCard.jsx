const ProductCard = ({ product }) => {
  const stockStatus =
    product.stock === 0
      ? "Out of Stock"
      : product.stock < 10
      ? "Low Stock"
      : "In Stock";

  const stockColor =
    stockStatus === "In Stock"
      ? "text-green-600"
      : stockStatus === "Low Stock"
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
      
      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={product.defaultImage}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 truncate">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-slate-900">
            ₹{product.price}
          </span>
          <span className={`text-sm font-medium ${stockColor}`}>
            {stockStatus}
          </span>
        </div>

        <div className="mt-3 flex gap-2 text-xs">
          {product.isNewArrival && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              New
            </span>
          )}
          {product.isSale && (
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">
              Sale
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard