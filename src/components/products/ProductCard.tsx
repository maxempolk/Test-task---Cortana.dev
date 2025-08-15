import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/types/products";
import { ProductVariant } from "./types/productVariant";
import { Pencil, ShoppingCart } from "lucide-react";
import ProductDeleteModal from "./ProductDeleteModal";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import usdToUah from "@/lib/currencyConverter";

interface ProductCardProps {
  product: Product;
  variant: ProductVariant
}

export default function ProductCard({ product, variant }: ProductCardProps) {
  const t = useTranslations("Products.Product");
  const locale = useLocale();
  const formattedPrice = new Intl.NumberFormat(locale, { style: "currency", currency: "UAH" }).format(
    locale === "uah" ? product.price : usdToUah(product.price)
  );
  return (
    <Card className="w-full max-w-xs pt-0 overflow-hidden mx-auto">
      <Link href={`/product/${product.id}`}>
        <Image src={product.image_url ?? ""} alt={product.name} className="w-full h-full" width={600} height={400} />
      </Link>
      <CardHeader className="p-0">
        <CardTitle className="text-center">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{t("Card.price")}: {formattedPrice}</p>
      </CardContent>
      <CardFooter>
        {variant === ProductVariant.BUY && (
          <Button className="w-full">
            <ShoppingCart className="size-5" />
            {t("Card.buy")}
          </Button>
        )}
        {variant === ProductVariant.MANAGE && (
          <div className="flex flex-col gap-2 w-full">
            <Link href={`/dashboard/products/${product.id}/edit`}>
              <Button className="w-full">
                <Pencil className="size-5" />
                {t("Card.edit")}
              </Button>
            </Link>
            <ProductDeleteModal productId={product.id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
