import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CognitoProvider from "next-auth/providers/cognito";
import { decode } from 'next-auth/jwt';


export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  
  // Configure one or more authentication providers
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Return true to allow sign in and false to block sign in.
      
      return true;
    },
    async redirect({ url, baseUrl }){
      // Return the url to redirect to after successful sign in.
      return baseUrl;
    },
    async jwt({ token,  user, account, profile }){
     
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.refreshToken = account.refresh_token
      }
      console.log(token);
      return token
    },
    async session({ session, token, user }) {
      console.log(token);
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.idToken = token.idToken
      
      console.log("SESSION")
      console.log(session)
      
      return session;
    }
    /*async jwt({ token, account, profile, user }){
      // Retrieve jwt tokens
      if (account) {
        // account is provided upon the inital auth
        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
        }
      }
    },
    async session({ session, token }) {
      /* 
         Forward tokens to client in case you need to make authorized
         API calls to an AWS service directly from the front end.
      
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    }
    */
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
