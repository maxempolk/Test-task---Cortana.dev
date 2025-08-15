"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { getCreateProductSchema, CreateProductFormData } from "./schemas/create-product";
import { useTranslations } from "next-intl";

export default function ProductCreateForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Products.Product");
  const schema = getCreateProductSchema(t);

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image_url: undefined,
    },
    mode: "onTouched",
  });

  const onSubmit = (values: CreateProductFormData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        const payload = {
          ...values,
          image_url: values.image_url ? values.image_url : undefined,
        };
        const res = await fetch(`/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setServerError(data?.error ?? "Ошибка создания");
          return;
        }
        router.push("/dashboard/products");
        router.refresh();
      } catch {
        setServerError("Непредвиденная ошибка");
      }
    });
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-screen-md px-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("create.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Form.name.label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Form.name.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Form.description.label")}</FormLabel>
                    <FormControl>
                      <textarea
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-24 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        placeholder={t("Form.description.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Form.price.label")}</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Form.image_url.label")}</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://..." {...field} />
                    </FormControl>
                    <FormDescription>{t("Form.image_url.description")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {serverError && (
                <div className="text-destructive text-sm" role="alert">
                  {serverError}
                </div>
              )}

              <div className="flex gap-3">
                <Button type="submit" disabled={isPending}>
                  {isPending ? t("Form.submit.loading") : t("Form.submit.save")}
                </Button>
                <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isPending}>
                  {t("Form.submit.cancel")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}


