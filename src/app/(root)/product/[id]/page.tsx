import Image from "next/image";
import { getProductById } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import usdToUah from "@/lib/currencyConverter";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const parentMeta = await parent;
  const product = await getProductById(id);

  return {
    title: `${parentMeta.title?.absolute} — ${product?.name ?? "Товар"}`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  const t = await getTranslations("Products.Product");
  const locale = await getLocale();
  if (!product) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">{t("notFound")}</div>
    );
  }

  return (
    <section className="flex-1 px-6 pt-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg border">
          <Image
            src={product.image_url ?? "/vercel.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-2xl font-bold">{new Intl.NumberFormat(locale, { style: "currency", currency: "UAH" }).format(
            locale === "en" ? usdToUah(product.price) : product.price
          ) }</p>
          <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
          <Button size="lg" className="w-full md:w-auto">
            <ShoppingCart className="size-5" />
            {t("buy")}
          </Button>
        </div>
      </div>
    </section>
  );
}