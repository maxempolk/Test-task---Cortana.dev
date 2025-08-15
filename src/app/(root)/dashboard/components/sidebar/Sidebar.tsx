"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getItems } from "./sidebarData";
import { useTranslations } from "next-intl";

function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("Dashboard.Sidebar");

  const items = getItems(t);

  return (
    <aside className="w-full">
      <div className="px-2 pb-2">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("title")}</div>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {  
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "justify-start w-full gap-3 text-base",
                active && "bg-accent text-accent-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Link href={item.href} className="flex items-center">
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;