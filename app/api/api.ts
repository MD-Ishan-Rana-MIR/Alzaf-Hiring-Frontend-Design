const BASE_URL = "https://alzaf-frontend-2025.vercel.app/api";

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