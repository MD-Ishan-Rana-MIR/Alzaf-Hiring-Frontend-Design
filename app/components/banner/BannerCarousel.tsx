"use client"
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { BannerType } from "@/app/utility/type/bannerType";
import Link from "next/link";

interface BannerCarouselProps {
  banners: BannerType[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!banners || banners.length === 0) return null;

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  // Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full  h-[calc(100vh-64px)] 
  sm:h-[calc(100vh-800px)] 
  lg:h-[calc(100vh-130px)] overflow-hidden -mt-10  bg-gray-400  ">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 flex px-16 flex-col md:flex-row items-center ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Left side: Text */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center  text-black rounded-l-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">{banner.title}</h2>
            <p className="mt-2 text-sm sm:text-base font-medium">{banner.subtitle}</p>
            <p className="mt-2 text-lg sm:text-xl font-semibold">{banner.description}</p>
            <p className="mt-2 text-sm sm:text-base line-clamp-3">{banner.description}</p>
            <Link href={banner.link}>
              <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                {banner.buttonText}
                <span className="text-lg">→</span>
              </button>
            </Link>
          </div>

          {/* Right side: Image */}
          <div className="w-full md:w-1/2 relative h-64 sm:h-96 md:h-full rounded-r-xl overflow-hidden">
            <Image
              src={banner.image}
              alt={banner.title || `Banner ${index + 1}`}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2  cursor-pointer  -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-black/60 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 cursor-pointer   -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-black/60 shadow-lg"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 cursor-pointer  left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-colors ${idx === currentIndex ? "bg-white" : "bg-red-400"
              }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
