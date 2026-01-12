import ProductFilter from "@/app/components/product-filter/ProductFilter";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { fetchCategories, fetchProducts, CategoryType } from "@/app/api/api";
import ProductsClient from "@/app/components/product/ProductClient";

export default async function ProductList() {
    const categories: CategoryType[] = await fetchCategories();
    const { products, totalPages } = await fetchProducts({ page: 1, limit: 10 });

    return (
        <MaxWidth>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="md:w-[20%]   " >
                    <ProductFilter categories={categories} />
                </div>
                <div className="md:w-[80%] " >
                    <ProductsClient
                        initialProducts={products}
                        initialTotalPages={totalPages}
                        filters={{ page: 1, limit: 10 }}
                    />
                </div>
            </div>


        </MaxWidth>
    );
}
