"use client";

import { useState, useEffect } from "react";
import ProductsCard from "@/app/components/product-card/ProductCard";
import { ProductType, fetchProducts, ProductsFilters } from "@/app/api/api";
import MaxWidth from "@/app/components/max-width/MaxWidth";

interface ProductsClientProps {
  initialProducts: ProductType[];
  initialTotalPages: number;
  filters: ProductsFilters;
}

export default function ProductsClient({
  initialProducts,
  initialTotalPages,
  filters,
}: ProductsClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(filters.page || 1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  // Fetch products whenever page or filters change
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ ...filters, page });
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page, filters.search, filters.minPrice, filters.maxPrice, filters.category]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <ProductsCard products={products} />
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded-md ${p === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
