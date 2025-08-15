import ProductCard from "./ProductCard";
import { Product } from "@/types/products";
import { ProductVariant } from "./types/productVariant";

interface ProductListProps {
  products: Product[];
  variant: ProductVariant
}

export default function ProductList({ products, variant }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
