import { Translator } from "@/i18n/schema";
import { z } from "zod";

export function getEditUserSchema(t: Translator) {
  return z.object({
    name: z.string().min(2, t("validation.name.min")).optional(),
    email: z.email(t("validation.email.invalid")).optional(),
});
}

export type EditUserFormData = z.infer<ReturnType<typeof getEditUserSchema>>;