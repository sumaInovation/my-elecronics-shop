import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // හැමවිටම account එක තෝරන්න window එක පෙන්වයි
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  
  // Security secret එක (.env.local එකේ තියෙන්න ඕනේ)
  secret: process.env.NEXTAUTH_SECRET,

  // Callbacks පාවිච්චි කරලා user session එක control කරන්න පුළුවන්
  callbacks: {
    async session({ session, token }) {
      // මෙතැනදී session එකට අමතර විස්තර (උදා: user ID) එකතු කරන්න පුළුවන්
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },

  // Logout වුණාට පස්සේ හෝ Error එකක් ආවොත් යන තැන් (Optional)
  pages: {
    signIn: '/', // Login වෙන්න වෙනම page එකක් නැති නිසා මුල් පිටුවටම යනවා
    error: '/',  // Error එකක් ආවොත් මුල් පිටුවටම යනවා
  },
  
  // Session එක පවත්වාගන්නා ආකාරය
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };