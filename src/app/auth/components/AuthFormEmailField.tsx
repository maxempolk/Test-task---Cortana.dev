import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { AuthFormData } from "@/auth/schemas/auth-form";
import { useTranslations } from "next-intl";

interface AuthFormEmailFieldProps {
  control: Control<AuthFormData>;
}

export function AuthFormEmailField({ control }: AuthFormEmailFieldProps) {
  const t = useTranslations("Auth");

  return (
    <FormField
      control={control}
      name="email"
      rules={{
        required: t("validation.email.required"),
        pattern: {
          value: /^\S+@\S+$/i,
          message: t("validation.email.invalid"),
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <Mail className="size-4" />
            </div>
            <FormControl>
              <Input className="pl-9" type="email" placeholder="your@email.com" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
