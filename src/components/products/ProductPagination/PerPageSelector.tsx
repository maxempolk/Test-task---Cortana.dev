"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface PerPageSelectorProps {
  perPage: number;
  options: number[];
  onPerPageChange: (value: number) => void;
}

export default function PerPageSelector({ perPage, options, onPerPageChange }: PerPageSelectorProps) {
  const t = useTranslations("Products");

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t("Pagination.onPage")}:</span>
      <select
        className="h-9 rounded-md border px-2 text-sm bg-background"
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
