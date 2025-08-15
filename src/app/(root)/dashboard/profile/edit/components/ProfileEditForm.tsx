"use client";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserContext, UserContextType } from "@/app/UserProvider";
import { Form } from "@/components/ui/form";
import { getEditUserSchema, EditUserFormData } from "@/auth/schemas/edit-user";
import { useTranslations } from "next-intl";
import { ProfileEditFields } from "./ProfileEditFields";
import { ProfileEditActions } from "./ProfileEditActions";
import { ProfileEditError } from "./ProfileEditError";

export function ProfileEditForm() {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Profile.Form");

  const schema = getEditUserSchema(t);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name, email: user.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const onSubmit = (values: EditUserFormData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/users/me", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setServerError(data?.error ?? "Ошибка сохранения");
          return;
        }

        const updated = (await res.json()) as { id: string; name: string; email: string };
        setUser(updated);
      } catch {
        setServerError("Непредвиденная ошибка");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfileEditFields control={form.control} />
        
        <ProfileEditError error={serverError} />
        
        <ProfileEditActions form={form} isPending={isPending} />
      </form>
    </Form>
  );
}
