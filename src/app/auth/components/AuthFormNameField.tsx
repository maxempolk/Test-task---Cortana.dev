import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User2 } from "lucide-react";
import { AuthFormData } from "@/auth/schemas/auth-form";
import { useTranslations } from "next-intl";

interface AuthFormNameFieldProps {
  control: Control<AuthFormData>;
}

export function AuthFormNameField({ control }: AuthFormNameFieldProps) {
  const t = useTranslations("Auth");

  return (
    <FormField
      control={control}
      name="name"
      rules={{
        required: t("validation.name.required"),
        minLength: { value: 2, message: t("validation.name.min") },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <User2 className="size-4" />
            </div>
            <FormControl>
              <Input className="pl-9" placeholder="Your name" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
