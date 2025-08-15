"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface PageInfoProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
}

export default function PageInfo({ currentPage, perPage, totalItems }: PageInfoProps) {
  const t = useTranslations("Products");

  return (
    <div className="text-sm text-muted-foreground">
      {t("Pagination.shown")} {(currentPage - 1) * perPage + 1}
      —{Math.min(currentPage * perPage, totalItems)} {t("Pagination.of")} {totalItems}
    </div>
  );
}
