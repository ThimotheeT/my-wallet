import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Vérification des champs requis
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Vérification si l'utilisateur existe déjà
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (rows.length > 0) {
      return new Response(JSON.stringify({ error: "This email is already in use." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // URL de l'image par défaut
    const defaultProfilePictureUrl = '/images/icone-de-profil-utilisateur.jpg';

    // Insertion du nouvel utilisateur
    await sql`
      INSERT INTO users (name, email, password_hash, profile_picture_url)
      VALUES (${name}, ${email}, ${hashedPassword}, ${defaultProfilePictureUrl})
    `;

    return new Response(JSON.stringify({ message: "User created successfully." }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  
    // Gestion des erreurs
  } catch (error) {
    console.error('Error during registration :', error);
    return new Response(JSON.stringify({ error: "An error occurred during registration." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}