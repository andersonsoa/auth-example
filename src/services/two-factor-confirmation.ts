import { db } from "@/database/db";
import {
  TTwoFactorConfirmation,
  twoFactorConfirmation,
} from "@/database/schema";
import { eq } from "drizzle-orm";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const tfConfirmation = await db.query.twoFactorConfirmation.findFirst({
      where: (twoFactorConfirmation, { eq }) =>
        eq(twoFactorConfirmation.userId, userId),
    });

    return tfConfirmation;
  } catch {
    return null;
  }
};

export const createTwoFactorConfirmation = async (
  data: TTwoFactorConfirmation,
) => {
  try {
    const [tfConfirmation] = await db
      .insert(twoFactorConfirmation)
      .values(data)
      .returning({
        id: twoFactorConfirmation.id,
        userId: twoFactorConfirmation.userId,
      });
    return tfConfirmation;
  } catch {
    return null;
  }
};

export const removeTwoFactorConfirmationById = async (id: string) => {
  try {
    return db
      .delete(twoFactorConfirmation)
      .where(eq(twoFactorConfirmation.id, id));
  } catch {
    return null;
  }
};
