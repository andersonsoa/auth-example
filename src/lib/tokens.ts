import crypto from "crypto";

import {
  createPasswordResetToken,
  getPasswordResetTokenByEmail,
  removePasswordResetTokenById,
} from "@/services/password-reset-token";
import {
  createVerificationToken,
  getVerificationTokenByEmail,
  removeVerificationTokenByID,
} from "@/services/verification-token";
import { v4 as uuidv4 } from "uuid";
import {
  createTwoFactorToken,
  getTwoFactorTokenByEmail,
  removeTwoFactorTokenById,
} from "@/services/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await removeVerificationTokenByID(existingToken.id);
  }

  const verificationToken = await createVerificationToken({
    email,
    expires,
    token,
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await removePasswordResetTokenById(existingToken.id);
  }

  const resetToken = await createPasswordResetToken({
    email,
    expires,
    token,
  });

  return resetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await removeTwoFactorTokenById(existingToken.id);
  }

  const tfToken = await createTwoFactorToken({
    email,
    expires,
    token,
  });

  return tfToken;
};
