import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/database/db";
import { authOptions } from "@/lib/auth.config";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
import { verify } from "@/lib/crypt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authOptions,
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (result.success) {
          const { email, password } = result.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await verify(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
});
