"use server";

import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return {
      error: "Invalid fields.",
    };
  }
  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
