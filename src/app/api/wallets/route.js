import { sql } from '@vercel/postgres';

export async function GET(req) {
    const userId = req.nextUrl.searchParams.get('userId');
  
    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId est requis' }), { status: 400 });
    }
  
    try {
      // Ajoutez un log pour voir quel userId est utilisé
      console.log("Fetching wallet for userId:", userId);
      
      const wallet = await sql`SELECT * FROM wallets WHERE user_id = ${userId}`;
      
      // Log de la réponse de la requête SQL
      console.log("Wallet Query Result:", wallet);
  
      if (wallet.length === 0) {
        return new Response(JSON.stringify({ error: 'Aucun portefeuille trouvé' }), { status: 404 });
      }
      return new Response(JSON.stringify({ wallet: wallet.rows[0] }), { status: 200 });
    } catch (error) {
      console.error('Erreur lors de la récupération du portefeuille:', error); // Ajoutez un log d'erreur
      return new Response(JSON.stringify({ error: 'Échec de la récupération du portefeuille' }), { status: 500 });
    }
  }

export async function POST(req) {
  const { userId, balance } = await req.json();

  if (!userId || balance === undefined) {
    return new Response(JSON.stringify({ error: 'userId et balance sont requis' }), { status: 400 });
  }

  try {
    // Supprimer le portefeuille existant
    await sql`DELETE FROM wallets WHERE user_id = ${userId}`;

    // Ajouter un nouveau portefeuille
    const newWallet = await sql`INSERT INTO wallets (user_id, balance) VALUES (${userId}, ${balance}) RETURNING *`;
    return new Response(JSON.stringify({ wallet: newWallet[0] }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Échec de l\'ajout du portefeuille' }), { status: 500 });
  }
}

export async function DELETE(req) {
    const { userId } = await req.json();
  
    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId est requis' }), { status: 400 });
    }
  
    try {
      // Supprimer le portefeuille existant
      const result = await sql`DELETE FROM wallets WHERE user_id = ${userId}`;
      
      if (result.rowCount === 0) {
        return new Response(JSON.stringify({ error: 'Aucun portefeuille trouvé à supprimer' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Portefeuille supprimé avec succès' }), { status: 200 });
    } catch (error) {
      console.error('Erreur lors de la suppression du portefeuille:', error);
      return new Response(JSON.stringify({ error: 'Échec de la suppression du portefeuille' }), { status: 500 });
    }
  }