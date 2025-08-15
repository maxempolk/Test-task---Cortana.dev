import { z } from "zod";
import { Translator } from "@/i18n/schema";

export const getRegisterUserSchema = (t: Translator) => {
  return z.object({
    name: z.string().min(2, t("validation.name.min")),
    email: z.email(t("validation.email.invalid")),
    password: z.string().min(8, t("validation.password.min")),
    confirmPassword: z.string().min(8, t("validation.password.min")),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: t("validation.confirmPassword.match"),
  });
};

export type RegisterUserFormData = z.infer<ReturnType<typeof getRegisterUserSchema>>;
