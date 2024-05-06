"use server";

import { signIn } from "@/lib/auth";
import { sendTwoFactorTokenEmail, sendVerificationMain } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
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
    const verificationToken = await generateVerificationToken(user.email);
    if (verificationToken) {
      await sendVerificationMain(
        verificationToken.email!,
        verificationToken.token!,
      );
    }
    return {
      success: "Verification E-Mail are sent!",
    };
  }

  if (user.email && user.isTwoFactorEnable) {
    const tfToken = await generateTwoFactorToken(user.email);
    if (tfToken) {
      await sendTwoFactorTokenEmail(tfToken.email, tfToken.token);
    }
    return { twoFactor: true };
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
