import { sql } from "@vercel/postgres";

// Ajouter une transaction
export async function POST(req) {
  // Récupération des données de la requête JSON
  const { walletId, amount, type, description } = await req.json();

  // Vérification si les paramètres requis sont fournis
  if (!walletId || amount === undefined || !type) {
    return new Response(
      JSON.stringify({ error: "walletId, amount, and type are required" }),
      { status: 400 }
    );
  }

  try {
    // Insérer la transaction dans la table transactions
    const newTransaction =
      await sql`INSERT INTO transactions (wallet_id, amount, type, description, created_at) VALUES (${walletId}, ${amount}, ${type}, ${description}, NOW()) RETURNING *`;

    // Mettre à jour le solde du wallet
    const adjustment = type === "deposit" ? amount : -amount;
    // Ajustement positif pour un dépôt, négatif pour un retrait
    await sql`UPDATE wallets SET balance = balance + ${adjustment} WHERE id = ${walletId}`;

    // Récupérer les totaux mis à jour
    // Récupere le wallet + les dépots et retraits et calcul le total, renvoi 0 si aucune transactions
    const updatedWallet = await sql`
            SELECT w.*, 
                   COALESCE(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0) as added_funds,
                   COALESCE(SUM(CASE WHEN t.type = 'withdrawal' THEN t.amount ELSE 0 END), 0) as withdrawn_funds
            FROM wallets w
            LEFT JOIN transactions t ON w.id = t.wallet_id
            WHERE w.id = ${walletId}
            GROUP BY w.id`;

    // Retourner la nouvelle transaction et le wallet mis à jour
    return new Response(
      JSON.stringify({
        transaction: newTransaction[0],
        // Détails de la nouvelle transaction
        updatedWallet: updatedWallet.rows[0],
        // Détails du wallet mis à jour
      }),
      { status: 201 }
    );
  } catch (error) {
    // Log d'erreur en cas d'échec de l'ajout de la transaction
    console.error("Error adding transaction:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add transaction" }),
      { status: 500 }
    );
  }
}
