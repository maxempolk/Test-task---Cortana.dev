"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { AuthFormHeader } from "./AuthFormHeader";
import { AuthFormNameField } from "./AuthFormNameField";
import { AuthFormEmailField } from "./AuthFormEmailField";
import { AuthFormPasswordField } from "./AuthFormPasswordField";
import { AuthFormSubmitButton } from "./AuthFormSubmitButton";
import { AuthFormError } from "./AuthFormError";
import { getLoginUserSchema } from "@/auth/schemas/login-user";
import { getRegisterUserSchema } from "@/auth/schemas/register-user";
import { LoginUserFormData } from "@/auth/schemas/login-user";
import { RegisterUserFormData } from "@/auth/schemas/register-user";
import { AuthFormData } from "@/auth/schemas/auth-form";

interface AuthFormMainProps<T extends 'login' | 'register'> {
  title: string;
  onSubmit: (data: T extends 'login' ? LoginUserFormData : RegisterUserFormData) => Promise<void>;
  submitText?: string;
  isRegister?: boolean;
}

export default function AuthFormMain<T extends 'login' | 'register'>({
  title,
  onSubmit,
  submitText,
  isRegister,
}: AuthFormMainProps<T>) {
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("Auth");
  const schema = isRegister ? getRegisterUserSchema(t) : getLoginUserSchema(t);
  const form = useForm<AuthFormData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  async function handleFormSubmit(data: AuthFormData) {
    try {
      setServerError(null);
      await onSubmit(data as T extends 'login' ? LoginUserFormData : RegisterUserFormData);
      window.location.href = "/";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setServerError(message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="max-w-md mx-auto w-full p-8 space-y-6 rounded-xl border bg-card shadow-lg supports-[backdrop-filter]:bg-card/80"
      >
        <AuthFormHeader title={title} />
        <AuthFormError error={serverError} />

        {isRegister && <AuthFormNameField control={form.control} />}
        
        <AuthFormEmailField control={form.control} />
        <AuthFormPasswordField control={form.control} isSubmitting={form.formState.isSubmitting}/>
        {isRegister && <AuthFormPasswordField control={form.control} isSubmitting={form.formState.isSubmitting} isConfirmPassword={true} />}
        <AuthFormSubmitButton 
          isSubmitting={form.formState.isSubmitting} 
          submitText={submitText} 
          title={title} 
        />
      </form>
    </Form>
  )
}