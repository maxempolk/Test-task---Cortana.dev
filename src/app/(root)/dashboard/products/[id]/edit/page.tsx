import React from 'react'
import { getProductById } from '@/actions/product'
import ProductEditForm from '@/components/products/ProductEditForm'
import { getTranslations } from 'next-intl/server'

async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  const t = await getTranslations("Products.Product");

  if (!product) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">{t("edit.notFound")}</div>
    )
  }

  return (
    <ProductEditForm product={product} />
  )
}

export default EditProductPage