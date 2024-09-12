import { sql } from '@vercel/postgres';

// Ajouter une transaction
export async function POST(req) {
   //La requete attend ses proprietes
    const { walletId, amount, type, description } = await req.json();

    if (!walletId || amount === undefined || !type) {
       //Vérifie que les proprietes sont fournis
        return new Response(JSON.stringify({ error: 'walletId, amount, and type are required' }), { status: 400 });
    }

    try {
        // Insérer la transaction dans la table transactions
        const newTransaction = await sql`INSERT INTO transactions (wallet_id, amount, type, description, created_at) VALUES (${walletId}, ${amount}, ${type}, ${description}, NOW()) RETURNING *`;
        
        // Mettre à jour le solde du portefeuille
        const adjustment = type === 'deposit' ? amount : -amount;
        await sql`UPDATE wallets SET balance = balance + ${adjustment} WHERE id = ${walletId}`;

        return new Response(JSON.stringify({ transaction: newTransaction[0] }), { status: 201 });
    } catch (error) {
        console.error('Error adding transaction:', error);
        return new Response(JSON.stringify({ error: 'Failed to add transaction' }), { status: 500 });
    }
}