import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; //Importe auth par informations (email/mdp)
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";

// Config NextAuth
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials", // Nom fournisseur auth
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      //Vérification des champs
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        //Vérifie si le mail existe
        try {
          const { rows } = await sql`
            SELECT * FROM users WHERE email = ${credentials.email}
          `;

          const user = rows[0]; // Récupère l'utilisateur correspondant à l'email

          if (!user) {
            return null;
          }
          //Compare le mdp et le mdp crypté
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            return null;
          }
          //Auth réussi, renvoi les infos de l'utilisateur
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            profile_picture_url: user.profile_picture_url,
          };
        } catch (error) {
          console.error("Error during authentication :", error); // Log d'erreur en cas de problème
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Callback pour le JWT (JSON Web Token)
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id; // Ajoute l'ID de l'utilisateur au token
        token.profile_picture_url = user.profile_picture_url; // Ajoute l'URL de la photo de profil au token
      }
      // Gère la mise à jour du token
      if (trigger === "update" && session?.user?.profile_picture_url) {
        token.profile_picture_url = session.user.profile_picture_url;
      }
      return token;
    },
    // Callback pour la session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Ajoute l'ID de l'utilisateur à la session
        session.user.profile_picture_url = token.profile_picture_url; // Ajoute l'URL de la photo de profil à la session
      }
      return session;
    },
  },
  pages: {
    //Défini la page de connexion
    signIn: "/login",
  },
  session: {
    //Utilise des JsonWebToken pour les sessions
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Clé secrète pour signer les tokens
});

// Exporte le handler pour les requêtes GET et POST
export { handler as GET, handler as POST };
