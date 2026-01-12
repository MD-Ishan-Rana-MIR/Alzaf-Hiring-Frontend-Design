import { fetchProductdetails } from "@/app/api/api";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const productDetails = await fetchProductdetails(id);

  console.log(productDetails)

  return (
    <div>
      {
        productDetails.brand
      }
    </div>
  );
}