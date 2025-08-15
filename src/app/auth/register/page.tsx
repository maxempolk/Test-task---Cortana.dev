"use client";
import { AuthForm } from "@/app/auth/components";
import { AuthFormData } from "@/auth/schemas/auth-form";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const handleRegister = async (data: AuthFormData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to register");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <AuthForm title={t("Register.title")} onSubmit={handleRegister} isRegister={true} />
      </div>
    </>
  );
}
