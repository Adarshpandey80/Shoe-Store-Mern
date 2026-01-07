import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Filter } from "lucide-react";
import FilterButton from "./FilterButton";
import ProductCard from "./ProductCard"

function Products() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ===== FETCH ALL PRODUCTS ONCE ===== */
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const api = "http://localhost:8000/admin/showAllProducts";
        const response = await axios.get(api);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  /* ===== FILTER LOGIC ===== */
  const filteredProducts = products.filter((product) => {
    if (activeFilter === "men") return product.gender === "men";
    if (activeFilter === "women") return product.gender === "women";
    if (activeFilter === "new") return product.isNewArrival === true;
    if (activeFilter === "sale") return product.isSale === true;
    return true;
  });

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading products...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          All Products
        </h1>
        <p className="text-slate-500 mt-1">
          Manage & monitor your listed products
        </p>
      </div>

      {/* ===== FILTER TABS ===== */}
      <div className="flex flex-wrap gap-3 mb-8">
        <FilterButton label="All" active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
        <FilterButton label="Men" active={activeFilter === "men"} onClick={() => setActiveFilter("men")} />
        <FilterButton label="Women" active={activeFilter === "women"} onClick={() => setActiveFilter("women")} />
        <FilterButton label="New Drops" active={activeFilter === "new"} onClick={() => setActiveFilter("new")} />
        <FilterButton label="Sale" active={activeFilter === "sale"} onClick={() => setActiveFilter("sale")} />
      </div>

      {/* ===== PRODUCT GRID ===== */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-slate-500 mt-20">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
