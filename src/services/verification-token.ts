import { db } from "@/database/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return db.query.verificationToken.findFirst({
      where: (token, { eq }) => eq(token.email, email),
    });
  } catch {
    return null;
  }
};
