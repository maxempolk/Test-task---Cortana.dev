"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PageNavigation({ currentPage, totalPages, onPageChange }: PageNavigationProps) {
  const pageWindow = 5;
  const start = Math.max(1, currentPage - Math.floor(pageWindow / 2));
  const end = Math.min(totalPages, start + pageWindow - 1);
  const firstVisible = Math.max(1, end - pageWindow + 1);
  const pages = Array.from({ length: end - firstVisible + 1 }, (_, i) => firstVisible + i);

  const goToPage = (page: number) => onPageChange(page);

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="sm" onClick={() => goToPage(1)} disabled={currentPage === 1}>
        <ChevronsLeft />
      </Button>
      <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft />
      </Button>

      {firstVisible > 1 && (
        <Button variant="ghost" size="sm" onClick={() => goToPage(1)}>
          1
        </Button>
      )}
      {firstVisible > 2 && <span className="px-1 text-muted-foreground">…</span>}

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(p)}
        >
          {p}
        </Button>
      ))}

      {end < totalPages - 1 && <span className="px-1 text-muted-foreground">…</span>}
      {end < totalPages && (
        <Button variant="ghost" size="sm" onClick={() => goToPage(totalPages)}>
          {totalPages}
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(totalPages)}
        disabled={currentPage >= totalPages}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
}
