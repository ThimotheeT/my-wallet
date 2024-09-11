import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials" //Importe auth par informations (email/mdp)
import bcrypt from "bcrypt"
import { sql } from '@vercel/postgres';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
        //Vérification des champs
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
         //Vérifie si le mail existe
        try {
          const { rows } = await sql`
            SELECT * FROM users WHERE email = ${credentials.email}
          `;

          const user = rows[0];

          if (!user) {
            return null
          }
           //Compare le mdp et le mdp crypté
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash)

          if (!isPasswordValid) {
            return null
          }
           //Auth réussi, renvoi les infos de l'utilisateur
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            profile_picture_url: user.profile_picture_url
          }
        } catch (error) {
          console.error('Error during authentication :', error);
          return null
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profile_picture_url = user.profile_picture_url;
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.profile_picture_url = token.profile_picture_url;
      }
      return session
    }
  },
  pages: {
    //Défini la page de connexion
    signIn: '/login',
  },
  session: {
    //Utilise des JsonWebToken pour les sessions
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }