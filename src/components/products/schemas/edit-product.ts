import { Translator } from "@/i18n/schema";
import { z } from "zod";

export const getEditProductSchema = (t: Translator) => {
  return z.object({
    name: z.string().min(2, t("validation.name.min")).refine((v) => v.trim() !== "", t("validation.name.required")),
    description: z.string().min(5, t("validation.description.min")).refine((v) => v.trim() !== "", t("validation.description.required")),
    price: z
      .number({ error: t("validation.price.number") })
      .min(0, t("validation.price.min")).refine((v) => v > 0, t("validation.price.min")),
      image_url: z
      .string()
      .trim()
      .optional()
      .refine(val => !val || z.url().safeParse(val).success, t("validation.image_url.url"))
  });
};

export type EditProductFormData = z.infer<ReturnType<typeof getEditProductSchema>>;