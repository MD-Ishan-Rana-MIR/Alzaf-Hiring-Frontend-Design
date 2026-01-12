"use client";

import MaxWidth from "./components/max-width/MaxWidth";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <MaxWidth>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-gray-500 mt-2">{error.message}</p>

        <button
          onClick={() => reset()}
          className="mt-4 cursor-pointer  px-6 py-2 bg-primary text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    </MaxWidth>
  );
}
