'use client'

import React from 'react'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog'
import { Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { deleteProduct } from '@/fetches/product'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface ProductDeleteModalProps {
  productId: string;
}

function ProductDeleteModal({ productId }: ProductDeleteModalProps) {
  const router = useRouter();
  const t = useTranslations("Products.Product.Card.delete");
  const handleDelete = async () => {
    await deleteProduct(productId);
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="size-5" />
          {t("title")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
          <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
              {t("confirm")}
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>{t("title")}</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProductDeleteModal