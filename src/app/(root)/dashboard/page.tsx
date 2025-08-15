import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("Dashboard");
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-2xl text-muted-foreground">{t("nothingSelected")}</h1>
    </div>
  )
}