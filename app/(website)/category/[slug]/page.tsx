"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProductFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [categories, setCategories] = useState<string[]>(searchParams.getAll("category") || []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        categories.forEach(c => params.append("category", c));

        router.replace(`?${params.toString()}`);
    }, [minPrice, maxPrice, categories]);

    return (
        <div>
            {/* Price Inputs */}
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" />
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" />

            {/* Categories */}
            <input type="checkbox" checked={categories.includes("Electronics")} onChange={e => {
                if (e.target.checked) setCategories([...categories, "Electronics"]);
                else setCategories(categories.filter(c => c !== "Electronics"));
            }} /> Electronics
        </div>
    );
};

export default ProductFilter;
