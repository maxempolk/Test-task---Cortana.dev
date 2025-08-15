import React from "react";
import { useTranslations } from "next-intl";

interface AuthFormHeaderProps {
  title: string;
}

export function AuthFormHeader({ title }: AuthFormHeaderProps) {
  const t = useTranslations("Auth");

  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight text-center">{title}</h2>
      <p className="text-center text-sm text-muted-foreground">{t("description")}</p>
    </div>
  );
}
