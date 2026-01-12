import { BannerType } from "../utility/type/bannerType";

export const BASE_URL = "https://alzaf-frontend-2025.vercel.app/api";

// fetch all category api 

export const fetchAllCategory = async () => {
    const res = await fetch(`${BASE_URL}/categories`);
    const data = await res.json();
    return data?.data?.categories
}


// category by product api 

export const categoryByProductApi = async (categoryName: string, minPrice: number, maxPrice: number) => {
    const res = await fetch(`${BASE_URL}/products?categories=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    const data = await res.json();
    return data?.data?.products;
}


// app/api/api.ts
export interface CategoryType {
  id: number | string;
  name: string;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
  brand: string;
}

export interface ProductsFilters {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string[];
  page?: number;
  limit?: number;
}

// Fetch categories
export const fetchCategories = async (): Promise<CategoryType[]> => {
  const res = await fetch("https://alzaf-frontend-2025.vercel.app/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data?.categories || [];
};

// Fetch products
export const fetchProducts = async (
  filters: ProductsFilters
): Promise<{ products: ProductType[]; totalPages: number }> => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  if (filters.category && filters.category.length > 0)
    params.append("category", filters.category.join(","));
  params.append("page", (filters.page || 1).toString());
  params.append("limit", (filters.limit || 10).toString());

  const res = await fetch(`https://alzaf-frontend-2025.vercel.app/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();

  return {
    products: data.data?.products || [],
    totalPages: data.data?.pagination?.totalPages || 1,
  };
};


export const fetchBanners = async (): Promise<BannerType[]> => {
  const res = await fetch("https://alzaf-frontend-2025.vercel.app/api/banners");
  if (!res.ok) throw new Error("Failed to fetch banners");
  const data = await res.json();
  return data.data?.banners || [];
};



// 🔹 SERVER SIDE PRODUCT FETCH (only category)


export const fetchProductsByCategory = async (category?: string) => {
  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }

  params.append("page", "1");
  params.append("limit", "10");

  const res = await fetch(
    `https://alzaf-frontend-2025.vercel.app/api/products?${params.toString()}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    products: data.data?.products || [],
    totalPages: data.data?.pagination?.totalPages || 1,
  };
};



// product details 

// lib/fetchProductDetails.ts


export const fetchProductdetails = async (
  id: number
): Promise<ProductType> => {
  const res = await fetch(
    `https://alzaf-frontend-2025.vercel.app/api/products/${id}`,
    { cache: "no-store" }
  );

  

  const data = await res.json();

  return data.data?.data as ProductType;
};
