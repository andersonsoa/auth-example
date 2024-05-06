"use server";

import { hash } from "@/lib/password";
import { newPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/services/password-reset-token";
import { getUserByEmail, updateUserById } from "@/services/user";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exists!" };
  }

  const hashedPassword = await hash(password);

  await updateUserById(existingUser.id, {
    password: hashedPassword,
  });

  return { success: "Password was changed!" };
};
