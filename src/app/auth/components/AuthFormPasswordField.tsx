import React, { useState } from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";
import { AuthFormData } from "@/auth/schemas/auth-form";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface AuthFormPasswordFieldProps {
  control: Control<AuthFormData>;
  isSubmitting: boolean;
  isConfirmPassword?: boolean;
}

export function AuthFormPasswordField({ control, isSubmitting, isConfirmPassword }: AuthFormPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const t = useTranslations("Auth");

  return (
    <FormField
      control={control}
      name={isConfirmPassword ? "confirmPassword" : "password"}
      rules={{
        required: t("validation.password.required"),
        minLength: { value: 8, message: t("validation.password.min") },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{isConfirmPassword ? "Confirm Password" : "Password"}</FormLabel>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <Lock className="size-4" />
            </div>
            <FormControl>
              <Input
                className="pl-9 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...field}
              />
            </FormControl>
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className={cn(
                "absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors",
                isSubmitting && "pointer-events-none opacity-60"
              )}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
