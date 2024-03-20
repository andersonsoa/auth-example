import type { NextAuthConfig } from "next-auth";

export const authOptions = {
  providers: [],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;
