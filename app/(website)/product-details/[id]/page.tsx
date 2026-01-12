import React from "react";

// API call to fetch product details
export const fetchProductdetails = async (id: number) => {
  try {
    const res = await fetch(
      `https://alzaf-frontend-2025.vercel.app/api/products/${id}`
    );

    if (!res.ok) {
      if (res.status === 404) throw new Error("Product not found");
      if (res.status === 500) throw new Error("Server error");
      throw new Error("Failed to fetch product details");
    }

    const data = await res.json();
    return data.data?.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface PageProps {
  params: {
    id: string; // params from URL are always strings
  };
}

const Page = async ({ params }) => {
  console.log(params)
  // const id = Number(params.id); // convert string to number
  // if (isNaN(id)) return <div>Invalid product ID</div>;

    const { id } = React.use(params)


  const product = await fetchProductdetails(id);

  if (!product) {
    return <div className="p-10 text-center text-red-500">Product not found or server error</div>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
      <p className="mb-2">Category: {product.category}</p>
      <p className="mb-2">Stock: {product.stock}</p>
      <p className="mb-4">Rating: {product.rating} ⭐</p>
      <img
        src={product.image}
        alt={product.name}
        className="w-72 h-72 object-contain border rounded-lg"
      />
      <p className="mt-4">{product.description}</p>
    </div>
  );
};

export default Page;
