import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is Required" }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Enter your name" }),
  email: z.string().email({ message: "Invalid E-Mail" }),
  password: z.string().min(6, { message: "Password Minimum lenght is 6" }),
});

export const resetSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum of 6 characters required" }),
});
