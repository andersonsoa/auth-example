import { db } from "@/database/db";
import { TPasswordResetToken, passwordResetToken } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.query.passwordResetToken.findFirst({
      where: (resetToken, { eq }) => eq(resetToken.token, token),
    });

    return passwordToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.query.passwordResetToken.findFirst({
      where: (resetToken, { eq }) => eq(resetToken.email, email),
    });

    return passwordToken;
  } catch {
    return null;
  }
};

export const createPasswordResetToken = async (data: TPasswordResetToken) => {
  try {
    const [rtoken] = await db
      .insert(passwordResetToken)
      .values(data)
      .returning({
        email: passwordResetToken.email,
        token: passwordResetToken.token,
      });
    return rtoken;
  } catch {
    return null;
  }
};

export const removePasswordResetTokenById = async (id: string) => {
  try {
    return db.delete(passwordResetToken).where(eq(passwordResetToken.id, id));
  } catch {
    return null;
  }
};
