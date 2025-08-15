import type { Metadata, ResolvingMetadata } from "next";
import ProductCreateForm from "@/components/products/ProductCreateForm";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMeta = await parent;
  return {
    title: `${parentMeta.title?.absolute} — Создание товара`,
  };
}

export default function CreateProductPage() {
  return <ProductCreateForm />;
}
