import { Metadata, ResolvingMetadata } from "next";
import ProductListPagginated from "@/components/products/ProductListPaginated";
import { ProductVariant } from "@/components/products/types/productVariant";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMeta = await parent;
  return {
    title: `${parentMeta.title?.absolute} — Home`,
  };
}

interface HomeProps {
  searchParams: Promise<{ page: number; perPage: number }>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <>
      <section className="flex-1 px-6 pt-10">
        <ProductListPagginated variant={ProductVariant.BUY} searchParams={searchParams} />
      </section>
    </>
  );
}
