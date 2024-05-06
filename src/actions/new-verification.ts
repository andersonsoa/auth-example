"use server";

import { getUserByEmail, updateUserById } from "@/services/user";
import {
  getVerificationTokenByToken,
  removeVerificationTokenByID,
} from "@/services/verification-token";

export const newVerification = async (token: string) => {
  const exitingToken = await getVerificationTokenByToken(token);
  if (!exitingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const hasExpired = new Date(exitingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(exitingToken.email);
  if (!existingUser) {
    return { error: "User does not exits!" };
  }

  await updateUserById(existingUser.id, {
    emailVerified: new Date(),
    email: exitingToken.email,
  });

  await removeVerificationTokenByID(exitingToken.id);

  return {
    success: "E-mail verified! enjoy",
  };
};
