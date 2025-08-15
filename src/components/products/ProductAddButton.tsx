import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

function ProductAddButton() {
  const t = useTranslations("Products");
  return (
    <Button asChild>
      <Link href="/dashboard/products/create">
          <Plus className="size-5" />
          {t("addProduct")}
      </Link>
    </Button>
  )
}

export default ProductAddButton