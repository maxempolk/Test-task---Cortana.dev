import { getProducts, getProductsTotalCount } from "@/actions/product";
import { ProductVariant } from "./types/productVariant";
import ProductList from "./ProductList";
import ProductPagination from "./ProductPagination";
import { getTranslations } from "next-intl/server";
import ProductAddButton from "./ProductAddButton";

interface ProductListPaginatedProps {
  variant: ProductVariant;
  searchParams: Promise<{ page: number; perPage: number }>;
}
  
  export default async function ProductListPaginated({ variant, searchParams }: ProductListPaginatedProps) {
    const t = await getTranslations("Products");
    let { page = 1, perPage = 12 } = await searchParams;
    page = Number(page);
    perPage = Number(perPage);
    
    const defaultPerPage = 12;
    const perPageOptions = [12, 24, 48];
    const products = await getProducts({ page, perPage });
    const totalCount = await getProductsTotalCount();
    const totalPages = Math.ceil(totalCount / perPage);
  
    return (
      <>
        <section className="flex-1 px-6">
          <div className='flex justify-between items-center mb-4 max-w-7xl mx-auto'>
          <h1 className='text-2xl font-bold'>{t("title")}</h1>
          {variant === ProductVariant.MANAGE && <ProductAddButton />}
        </div>
          { products.length != 0 ? 
          <ProductList products={products} variant={variant} />
          :
          <div className="flex justify-center items-center h-full">
            <p className="text-2xl font-bold">{t("noProducts")}</p>
          </div>
          }
          <ProductPagination totalItems={totalCount} totalPages={totalPages} perPageOptions={perPageOptions} defaultPerPage={defaultPerPage} />
        </section>
      </>
    );
  }