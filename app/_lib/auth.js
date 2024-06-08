import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth /* The Current Session */, request }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
