import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Vérification des champs requis
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Tous les champs sont requis" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Vérification si l'utilisateur existe déjà
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (rows.length > 0) {
      return new Response(JSON.stringify({ error: "Cet email est déjà utilisé" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion du nouvel utilisateur
    await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return new Response(JSON.stringify({ message: "Utilisateur créé avec succès" }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return new Response(JSON.stringify({ error: "Une erreur est survenue lors de l'inscription" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}