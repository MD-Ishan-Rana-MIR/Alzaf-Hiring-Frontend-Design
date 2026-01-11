"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ProductFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [minPrice, setMinPrice] = useState<number | "">(
        Number(searchParams.get("minPrice")) || ""
    );
    const [maxPrice, setMaxPrice] = useState<number | "">(
        Number(searchParams.get("maxPrice")) || ""
    );
    const categories = ["Electronics", "Apparel"];
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        searchParams.getAll("category") || []
    );

    // Update URL query params on change
    useEffect(() => {
        const params = new URLSearchParams();
        if (minPrice !== "") params.set("minPrice", String(minPrice));
        if (maxPrice !== "") params.set("maxPrice", String(maxPrice));
        selectedCategories.forEach((cat) => params.append("category", cat));

        router.replace(`?${params.toString()}`);
    }, [minPrice, maxPrice, selectedCategories]);

    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories((prev) => [...prev, category]);
        } else {
            setSelectedCategories((prev) => prev.filter((c) => c !== category));
        }
    };

    return (
        <div>
            <div className="border-b border-gray-300">
                <h1 className="font-bold text-xl lg:text-2xl px-4 py-3">Filters</h1>
            </div>

            <div className="px-4 py-4">
                <h2 className="font-medium mb-2">Price Range</h2>
                <div className="flex gap-2 mb-4">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                </div>

                <h2 className="font-medium mb-2">Category</h2>
                <ul className="space-y-1">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={(e) =>
                                        handleCategoryChange(cat, e.target.checked)
                                    }
                                    className="accent-orange-500"
                                />
                                {cat}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductFilter;
