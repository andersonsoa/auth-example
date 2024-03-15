import bcrypt from "bcryptjs";

export const hash = async (text: string) => {
  return bcrypt.hash(text, 10);
};

export const verify = async (text: string, hashStr: string) => {
  try {
    return bcrypt.compare(text, hashStr);
  } catch {
    return false;
  }
};
