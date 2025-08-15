import { z } from "zod";
import { getLoginUserSchema } from "./login-user";
import { getRegisterUserSchema } from "./register-user";

type LoginFormData = z.infer<ReturnType<typeof getLoginUserSchema>>;
type RegisterFormData = z.infer<ReturnType<typeof getRegisterUserSchema>>;

export interface AuthFormProps<T extends 'login' | 'register'> {
  type: T;
  onSubmit: (data: T extends 'login' ? LoginFormData : RegisterFormData) => void;
  loading?: boolean;
}

export type AuthFormData = LoginFormData | RegisterFormData;