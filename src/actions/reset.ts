"use server";

import { sendPasswordResetMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { resetSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
import { z } from "zod";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid e-mail!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "E-Mail not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (passwordResetToken) {
    await sendPasswordResetMail(
      passwordResetToken.email,
      passwordResetToken.token,
    );
  }

  return { success: "Reset email sent!" };
};
