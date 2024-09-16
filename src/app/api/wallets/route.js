import { sql } from "@vercel/postgres";

// Récupère le wallet de l'utilisateur
export async function GET(req) {
  // Récupération de l'ID de l'utilisateur à partir des paramètres de requête
  const userId = req.nextUrl.searchParams.get("userId");

  // Vérification si l'ID de l'utilisateur est fourni
  if (!userId) {
    return new Response(JSON.stringify({ error: "userId is required" }), {
      status: 400,
    });
  }

  try {
     // Récupere le wallet + les dépots et retraits et calcul le total, renvoi 0 si aucune transactions
    const wallet = await sql`
        SELECT w.*, 
               COALESCE(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0) as added_funds,
               COALESCE(SUM(CASE WHEN t.type = 'withdrawal' THEN t.amount ELSE 0 END), 0) as withdrawn_funds
        FROM wallets w
        LEFT JOIN transactions t ON w.id = t.wallet_id
        WHERE w.user_id = ${userId}
        GROUP BY w.id`;

    // Vérification si le wallet existe
    if (wallet.length === 0) {
      return new Response(JSON.stringify({ error: "No wallet found" }), {
        status: 404,
      });
    }
    // Retourne le wallet trouvé avec un statut 200
    return new Response(JSON.stringify({ wallet: wallet.rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving wallet :", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve wallet" }),
      { status: 500 }
    );
  }
}

// Crée et met à jour le wallet
export async function POST(req) {
  // Récupération des données de la requête
  const { userId, balance } = await req.json();

  // Vérification si l'ID de l'utilisateur et le solde sont fournis
  if (!userId || balance === undefined) {
    return new Response(
      JSON.stringify({ error: "userId and balance are required" }),
      { status: 400 }
    );
  }

  try {
    // Supprimer le wallet existant
    await sql`DELETE FROM wallets WHERE user_id = ${userId}`;

    // Ajouter un nouveau wallet avec le solde initial
    const newWallet =
      await sql`INSERT INTO wallets (user_id, balance) VALUES (${userId}, ${balance}) RETURNING *`;
    // Retourne le nouveau wallet créé avec un statut 201
    return new Response(JSON.stringify({ wallet: newWallet[0] }), {
      status: 201,
    });
  } catch (error) {
    // Log d'erreur en cas d'échec de l'ajout du wallet
    return new Response(JSON.stringify({ error: "Failed to add wallet" }), {
      status: 500,
    });
  }
}

// Supprime le wallet
export async function DELETE(req) {
  // Récupération de l'ID de l'utilisateur à partir du corps de la requête
  const { userId } = await req.json();

  // Vérification si l'ID de l'utilisateur est fourni
  if (!userId) {
    return new Response(JSON.stringify({ error: "userId is required" }), {
      status: 400,
    });
  }

  try {
    // Supprimer le wallet existant
    const result = await sql`DELETE FROM wallets WHERE user_id = ${userId}`;

    // Vérification si un wallet a été supprimé
    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ error: "No wallet found to delete" }),
        { status: 404 }
      );
    }

    // Retourne un message de succès avec un statut 200
    return new Response(
      JSON.stringify({ message: "Wallet deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    // Log d'erreur en cas d'échec de la suppression du wallet
    console.error("Error deleting wallet :", error);
    return new Response(JSON.stringify({ error: "Failed to delete wallet" }), {
      status: 500,
    });
  }
}
