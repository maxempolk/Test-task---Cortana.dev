"use client";
import Link from "next/link"
import React, { useContext } from "react"
import { Button } from "@/components/ui/button"
import { UserContext, UserContextType } from "@/app/UserProvider"
import { useTranslations } from "next-intl";
import ChangeLocaleTrigger from "@/components/locale/ChangeLocaleTrigger";

function Header() {
  const t = useTranslations("Header");
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <header className="border-b box-border text-md">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold hover:opacity-80">
            Product Store
          </Link>
          <ChangeLocaleTrigger />
        </div>

        <div className="flex items-center gap-2">
          {
            user ? (
              <>
                <Link href={'/dashboard/profile/'} className="ml-3 text-muted-foreground" aria-label="user-name">
                  {user.name}
                </Link>
                <Button asChild variant="ghost" className="text-md">
                  <Link href="/auth/logout">{t("logout")}</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-md">
                  <Link href="/auth/login">{t("login")}</Link>
                </Button>
                <Button asChild className="text-md">
                  <Link href="/auth/register">{t("register")}</Link>
                </Button>
              </>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header