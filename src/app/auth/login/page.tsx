"use client";
import { AuthForm } from "@/app/auth/components";
import { AuthFormData } from "@/auth/schemas/auth-form";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const handleLogin = async (data: AuthFormData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to login");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <AuthForm title={t("Login.title")} onSubmit={handleLogin} isRegister={false} />
      </div>
    </>
  );
}
