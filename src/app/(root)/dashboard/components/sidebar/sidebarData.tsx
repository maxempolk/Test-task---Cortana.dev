import { Package, User } from "lucide-react";
import { Translator } from "@/i18n/schema";

export function getItems(t: Translator) {
  return [
    { href: "/dashboard/products", label: t("products"), match: (p: string) => p.startsWith("/dashboard/products"), icon: Package },
    { href: "/dashboard/profile", label: t("profile"), match: (p: string) => p.startsWith("/dashboard/profile"), icon: User },
  ]
} 