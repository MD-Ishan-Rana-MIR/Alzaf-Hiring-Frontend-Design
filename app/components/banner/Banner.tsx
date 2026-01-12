// app/page.tsx
import { fetchBanners } from "@/app/api/api";
import { BannerType } from "@/app/utility/type/bannerType";
import BannerCarousel from "./BannerCarousel";


export default async function Banner() {
  const banners: BannerType[] = await fetchBanners();
  console.log("banner is",banners)

  return (
      <div className="">
        <BannerCarousel banners={banners} />
      </div>

  );
}
