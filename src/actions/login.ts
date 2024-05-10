"use server";

import { signIn } from "@/lib/auth";
import { sendTwoFactorTokenEmail, sendVerificationMain } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { loginSchema } from "@/schemas";
import {
  createTwoFactorConfirmation,
  getTwoFactorConfirmationByUserId,
  removeTwoFactorConfirmationById,
} from "@/services/two-factor-confirmation";
import {
  getTwoFactorTokenByEmail,
  removeTwoFactorTokenById,
} from "@/services/two-factor-token";
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
  const { email, password, code } = result.data;

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
    if (code) {
      const existingTfToken = await getTwoFactorTokenByEmail(user.email);
      if (!existingTfToken) {
        return { error: "Invalid code" };
      }
      if (existingTfToken.token !== code) {
        return { error: "Invalid code" };
      }

      const hasExpired = new Date(existingTfToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired" };
      }

      await removeTwoFactorTokenById(existingTfToken.id);

      const existingTfConfirmation = await getTwoFactorConfirmationByUserId(
        user.id,
      );
      if (existingTfConfirmation) {
        await removeTwoFactorConfirmationById(existingTfConfirmation.id);
      }

      const tfC = await createTwoFactorConfirmation({
        userId: user.id,
      });
      console.log("AQUI", { tfC });
    } else {
      const tfToken = await generateTwoFactorToken(user.email);
      if (tfToken) {
        await sendTwoFactorTokenEmail(tfToken.email, tfToken.token);
      }
      return { twoFactor: true };
    }
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
