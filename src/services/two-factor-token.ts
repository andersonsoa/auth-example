import { db } from "@/database/db";
import { TTwoFactorToken, twoFactorToken } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactor = await db.query.twoFactorToken.findFirst({
      where: (twoFactorToken, { eq }) => eq(twoFactorToken.token, token),
    });

    return twoFactor;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactor = await db.query.twoFactorToken.findFirst({
      where: (twoFactorToken, { eq }) => eq(twoFactorToken.email, email),
    });

    return twoFactor;
  } catch {
    return null;
  }
};

export const createTwoFactorToken = async (data: TTwoFactorToken) => {
  try {
    const [tfToken] = await db.insert(twoFactorToken).values(data).returning({
      email: twoFactorToken.email,
      token: twoFactorToken.token,
    });
    return tfToken;
  } catch {
    return null;
  }
};

export const removeTwoFactorTokenById = async (id: string) => {
  try {
    return db.delete(twoFactorToken).where(eq(twoFactorToken.id, id));
  } catch {
    return null;
  }
};
