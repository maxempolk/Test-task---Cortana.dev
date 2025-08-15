import React from 'react'
import { ProductVariant } from '@/components/products/types/productVariant';
import ProductListPagginated from '@/components/products/ProductListPaginated';

interface ProductsPageProps {
  searchParams: Promise<{ page: number; perPage: number }>;
}

async function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <>
      <ProductListPagginated variant={ProductVariant.MANAGE} searchParams={searchParams} />
    </>
  )
}

export default ProductsPage