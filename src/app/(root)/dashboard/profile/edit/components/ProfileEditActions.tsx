import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditUserFormData } from "@/auth/schemas/edit-user";
import { useTranslations } from "next-intl";

interface ProfileEditActionsProps {
  form: UseFormReturn<EditUserFormData>;
  isPending: boolean;
}

export function ProfileEditActions({ form, isPending }: ProfileEditActionsProps) {
  const t = useTranslations("Profile.Form");

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <Button 
          type="submit" 
          disabled={isPending || !form.formState.isDirty}
        >
          {isPending ? t("submit.loading") : t("submit.save")}
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => form.reset()} 
          disabled={isPending || !form.formState.isDirty}
        >
          {t("submit.reset")}
        </Button>
      </div>
      <Button type="button" variant="destructive" disabled={isPending}>
        <Link href="/dashboard/profile">{t("submit.cancel")}</Link>
      </Button>
    </div>
  );
}
