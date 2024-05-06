import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/database/db";
import { authOptions } from "@/lib/auth.config";
import { loginSchema } from "@/schemas";
import { getUserByEmail, getUserById, updateUserById } from "@/services/user";
import { verify } from "@/lib/password";
import {
  getTwoFactorConfirmationByUserId,
  removeTwoFactorConfirmationById,
} from "@/services/two-factor-confirmation";

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
  callbacks: {
    async signIn(params) {
      if (params.account?.provider !== "credentials") return true;
      const user = await getUserById(params.user.id!);

      if (!user?.emailVerified) {
        return false;
      }

      if (user.isTwoFactorEnable) {
        const tfConfirmation = await getTwoFactorConfirmationByUserId(user.id);

        if (!tfConfirmation) {
          return false;
        }

        await removeTwoFactorConfirmationById(tfConfirmation.id);
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      if (!user.roles) return token;
      token.roles = user.roles;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.roles = token.roles as "ADMIN" | "USER";
      }

      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      if (!user.id) return;
      await updateUserById(user.id, {
        emailVerified: new Date(),
      });
    },
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
