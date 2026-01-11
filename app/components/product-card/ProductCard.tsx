import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ProductType } from "@/app/utility/type/productType";

const ProductCard = ({ product }: { product: ProductType }) => {
    return (
        <Card className="group overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300">

            {/* Image */}
            <CardHeader className="p-0 relative  ">
                <Link href={`/products/${product.id}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className=" w-full h-56 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>

                {/* Category Badge */}
                <Badge className="absolute top-3 left-3 bg-black/80 text-white">
                    {product.category}
                </Badge>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-4 space-y-2">
                <h3 className="text-base font-semibold line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">
                        ({product.stock} in stock)
                    </span>
                </div>

                {/* Price */}
                <div className="text-lg font-bold text-orange-500">
                    ${product.price}
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button className="w-full rounded-xl">
                    Add to Cart
                </Button>

                <Button variant="outline" className="w-full rounded-xl">
                    Buy Now
                </Button>
            </CardFooter>

        </Card>
    );
};

export default ProductCard;
