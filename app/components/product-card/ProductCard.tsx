"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/app/api/api";
import { Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  products: ProductType[];
}

export default function ProductCard({ products }: ProductCardProps) {
  return (
    <>
      {products.map((product) => (
        <Link href={`/product-details/${product.id}`}>
          <Card
          key={product.id}
          className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Product Image */}
          <div className="relative w-full h-48">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Product Details */}
          <CardContent className="px-4 py-2">
            <h2 className="text-lg font-semibold line-clamp-2">{product.name}</h2>

            <div className="flex items-center gap-2 mt-1">
              <p className="text-primary font-bold text-lg">${product.price}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: Math.round(product.rating) }, (_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
                <span className="text-gray-500 text-sm">({product.rating})</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-1">Brand: {product.brand}</p>

            <p
              className={`mt-2 text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </p>
          </CardContent>

          {/* Add to Cart Button */}
          <CardFooter className="px-4 pb-4">
            <Button
              className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white"
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
        </Link>
      ))}
    </>
  );
}
