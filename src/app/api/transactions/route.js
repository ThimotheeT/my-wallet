import { sql } from '@vercel/postgres';

export async function POST(req) {
  const { walletId, amount, description } = await req.json(); // Utilisez await req.json() pour récupérer le corps

  try {
    // Ajouter la transaction
    await sql`INSERT INTO transactions (wallet_id, amount, description) VALUES (${walletId}, ${amount}, ${description})`;

    // Mettre à jour le solde du portefeuille
    await sql`UPDATE wallets SET balance = balance + ${amount} WHERE id = ${walletId}`;

    return new Response(JSON.stringify({ message: 'Transaction ajoutée avec succès' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Échec de l\'ajout de la transaction' }), { status: 500 });
  }
}