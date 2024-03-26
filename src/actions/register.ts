"use server";

import { registerSchema } from "@/schemas";
import { z } from "zod";

import { createNewUser, getUserByEmail } from "@/services/user";
import { hash } from "@/lib/password";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationMain } from "@/lib/mail";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return {
      error: "Invalid data!",
    };
  }

  const { name, email, password } = result.data;

  const passwordHashed = await hash(password);

  const emailIsTaken = await getUserByEmail(email);
  if (emailIsTaken) {
    return {
      error: "E-Mail already in use.",
    };
  }
  await createNewUser({
    email,
    name,
    password: passwordHashed,
  });

  const verificationToken = await generateVerificationToken(email);
  if (verificationToken) {
    await sendVerificationMain(
      verificationToken.email!,
      verificationToken.token!,
    );
  }

  return {
    success: "Confirmation email are sent!",
  };
};
