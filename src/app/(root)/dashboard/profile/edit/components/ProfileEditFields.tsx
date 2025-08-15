import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditUserFormData } from "@/auth/schemas/edit-user";
import { useTranslations } from "next-intl";

interface ProfileEditFieldsProps {
  control: Control<EditUserFormData>;
}

export function ProfileEditFields({ control }: ProfileEditFieldsProps) {
  const t = useTranslations("Profile.Form");

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("name.label")}</FormLabel>
            <FormControl>
              <Input placeholder={t("name.placeholder")} {...field} />
            </FormControl>
            <FormDescription>{t("name.description")}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("email.label")}</FormLabel>
            <FormControl>
              <Input type="email" placeholder={t("email.placeholder")} {...field} />
            </FormControl>
            <FormDescription>{t("email.description")}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
