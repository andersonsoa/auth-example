"use server";

import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
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

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "Invalid Credentials!" };
  }

  if (!user.emailVerified) {
    await generateVerificationToken(user.email);
    return {
      success: "Verification E-Mail are sent!",
    };
  }

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
