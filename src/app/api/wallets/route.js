import { sql } from '@vercel/postgres';

 //Récupere le portefeuille de l'utilisateur
export async function GET(req) {
    const userId = req.nextUrl.searchParams.get('userId');
  
    if (!userId) {
       //Vérifie si l'id est fourni
      return new Response(JSON.stringify({ error: 'userId is required' }), { status: 400 });
    }
  
    try {
       //Récupere le portefeuille
      const wallet = await sql`SELECT * FROM wallets WHERE user_id = ${userId}`;
  
      if (wallet.length === 0) {
        return new Response(JSON.stringify({ error: 'No wallet found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ wallet: wallet.rows[0] }), { status: 200 });
    } catch (error) {
      console.error('Error retrieving wallet :', error); // Ajoutez un log d'erreur
      return new Response(JSON.stringify({ error: 'Failed to retrieve wallet' }), { status: 500 });
    }
  }
 
  //Crée et met a jour le portefeuille
export async function POST(req) {
  const { userId, balance } = await req.json();

  if (!userId || balance === undefined) {
    return new Response(JSON.stringify({ error: 'userId and balance are required' }), { status: 400 });
  }

  try {
    // Supprimer le portefeuille existant
    await sql`DELETE FROM wallets WHERE user_id = ${userId}`;

    // Ajouter un nouveau portefeuille
    const newWallet = await sql`INSERT INTO wallets (user_id, balance) VALUES (${userId}, ${balance}) RETURNING *`;
    return new Response(JSON.stringify({ wallet: newWallet[0] }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add wallet' }), { status: 500 });
  }
}

 //Supprime le portefeuille
export async function DELETE(req) {
    const { userId } = await req.json();
  
    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId is required' }), { status: 400 });
    }
  
    try {
      // Supprimer le portefeuille existant
      const result = await sql`DELETE FROM wallets WHERE user_id = ${userId}`;
      
      if (result.rowCount === 0) {
        return new Response(JSON.stringify({ error: 'No wallet found to delete' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Wallet deleted successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error deleting wallet :', error);
      return new Response(JSON.stringify({ error: 'Failed to delete wallet' }), { status: 500 });
    }
  }