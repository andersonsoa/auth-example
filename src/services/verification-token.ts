import { db } from "@/database/db";
import { TVerificationToken, verificationToken } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return db.query.verificationToken.findFirst({
      where: (verificationToken, { eq }) => eq(verificationToken.email, email),
    });
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return db.query.verificationToken.findFirst({
      where: (verificationToken, { eq }) => eq(verificationToken.token, token),
    });
  } catch {
    return null;
  }
};

export const createVerificationToken = async (data: TVerificationToken) => {
  try {
    return db.insert(verificationToken).values(data);
  } catch {
    return null;
  }
};

export const removeVerificationTokenByID = async (id: string) => {
  try {
    return db.delete(verificationToken).where(eq(verificationToken.id, id));
  } catch {
    return null;
  }
};
