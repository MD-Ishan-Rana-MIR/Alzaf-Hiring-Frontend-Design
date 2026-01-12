// app/not-found.tsx

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl">Product not found</p>
      <p className="text-gray-500 mt-2">
        The product you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-primary text-white rounded-lg"
      >
        Back To Home Page
      </Link>
    </div>
  );
}
