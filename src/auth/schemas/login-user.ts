import { z } from "zod";
import { Translator } from "@/i18n/schema";

export const getLoginUserSchema = (t: Translator) => {
  return z.object({
    email: z.email(t("validation.email.invalid")),
    password: z.string().min(8, t("validation.password.min")),
  });
};

export type LoginUserFormData = z.infer<ReturnType<typeof getLoginUserSchema>>;
