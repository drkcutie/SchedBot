import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "", // Added required clientSecret
    })
  ],
  adapter: SupabaseAdapter({
    url:process.env.SUPABASE_URL,
    secret:process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  pages: {
    signIn: "/",
    error: "/", // This will handle the error query parameter
  },
  callbacks: {
    async session({session, token}) {
      if (session.user && token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

// Proper exports for Next.js App Router
export { handler as GET, handler as POST };

function SupabaseAdapter(arg0: {}): import("next-auth/adapters").Adapter | undefined {
    throw new Error("Function not implemented.");
}
