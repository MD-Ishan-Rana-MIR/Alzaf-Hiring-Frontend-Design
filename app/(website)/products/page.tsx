
import { CategoryType, fetchCategories, fetchProductsByCategory } from "@/app/api/api";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import ProductFilter from "@/app/components/product-filter/ProductFilter";
import ProductsClient from "@/app/components/product/ProductClient";

interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
  brand: string;
}

interface ProductsPageProps {
  searchParams: {
    category?: string;
  };
}



export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams.category || "All Products";
  const categories: CategoryType[] = await fetchCategories();

  // 🔹 API CALL
  const { products, totalPages } = await fetchProductsByCategory(
    category !== "All Products" ? category : undefined
  );

  return (
    <MaxWidth>
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{category}</h1>
        <p className="text-sm text-gray-500">
          Showing products for {category}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter */}
        <div className="md:w-[20%]">
          <ProductFilter categories={categories} />
        </div>

        {/* Products */}
        <div className="md:w-[80%]">
          <ProductsClient
            initialProducts={products}
            initialTotalPages={totalPages}
            filters={{
              category: category !== "All Products" ? [category] : [],
              page: 1,
              limit: 10,
            }}
          />
        </div>
      </div>
    </MaxWidth>
  );
}
