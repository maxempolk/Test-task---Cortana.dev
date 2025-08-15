import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface AuthFormSubmitButtonProps {
  isSubmitting: boolean;
  submitText?: string;
  title: string;
}

export function AuthFormSubmitButton({ isSubmitting, submitText, title }: AuthFormSubmitButtonProps) {
  const t = useTranslations("Auth");

  return (
    <Button variant="outline" type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting && (
        <Loader2 className="size-4 animate-spin" />
      )}
      {submitText || t(`${title}.submit`)}
    </Button>
  );
}
