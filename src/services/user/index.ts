import { db } from "@/database/db";
import { TUser, users } from "@/database/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const emailTaken = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return emailTaken;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const emailTaken = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    return emailTaken;
  } catch {
    return null;
  }
};

export const createNewUser = async (user: TUser) => {
  try {
    const newUser = await db.insert(users).values(user);
    return newUser;
  } catch {
    return null;
  }
};
