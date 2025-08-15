"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clamp } from "../../../lib/utils";
import PerPageSelector from "./PerPageSelector";
import PageNavigation from "./PageNavigation";
import PageInfo from "./PageInfo";

interface ProductPaginationProps {
  totalItems?: number;
  totalPages?: number;
  perPageOptions?: number[];
  defaultPerPage?: number;
}

export default function ProductPagination({
  totalItems,
  totalPages: totalPagesProp,
  perPageOptions = [12, 24, 48],
  defaultPerPage = 12,
}: ProductPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = React.useMemo(() => {
    const raw = Number(searchParams.get("page") ?? 1);
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
  }, [searchParams]);

  const perPage = React.useMemo(() => {
    const raw = Number(searchParams.get("perPage") ?? defaultPerPage);
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : defaultPerPage;
  }, [searchParams, defaultPerPage]);

  const totalPages = React.useMemo(() => {
    if (typeof totalPagesProp === "number" && totalPagesProp > 0) return Math.floor(totalPagesProp);
    if (typeof totalItems === "number" && totalItems >= 0) return Math.max(1, Math.ceil(totalItems / perPage));
    return 1;
  }, [totalItems, perPage, totalPagesProp]);

  const updateQuery = React.useCallback(
    (next: { page?: number; perPage?: number }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.perPage !== undefined) {
        params.set("perPage", String(next.perPage));
        params.set("page", "1");
      }
      if (next.page !== undefined) {
        const safePage = clamp(next.page, 1, totalPages);
        params.set("page", String(safePage));
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams, totalPages]
  );

  const goToPage = (page: number) => updateQuery({ page });
  const setPerPage = (value: number) => updateQuery({ perPage: value });

  const normalizedOptions = React.useMemo(() => {
    const set = new Set(perPageOptions);
    if (!set.has(perPage)) set.add(perPage);
    return Array.from(set).sort((a, b) => a - b);
  }, [perPageOptions, perPage]);

  if (totalPages <= 1 && (!totalItems || totalItems <= perPage)) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 max-w-7xl mx-auto">
      <PerPageSelector
        perPage={perPage}
        options={normalizedOptions}
        onPerPageChange={setPerPage}
      />

      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      {typeof totalItems === "number" && (
        <PageInfo
          currentPage={currentPage}
          perPage={perPage}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}
