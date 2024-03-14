"use server";

import { verify } from "@/lib/crypt";
import { sleep } from "@/lib/utils";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
import { z } from "zod";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return {
      error: "Invalid credentials.",
    };
  }
  const { email, password } = result.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return {
      error: "Invalid credentials.",
    };
  }

  if (!user.password) {
    return {
      success: "You are successful logged in!",
    };
  }

  const isPasswordEqual = await verify(password, user.password);
  if (!isPasswordEqual) {
    return {
      error: "Invalid credentials.",
    };
  }

  return {
    success: "You are successful logged in!",
  };
};
