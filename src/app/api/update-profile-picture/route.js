import { sql } from "@vercel/postgres";

 // Définition d'une fonction asynchrone pour gérer les requêtes POST
export async function POST(req) {
  try {
     // Extraction des données JSON de la requête
    const { userId, newImageUrl } = await req.json();

     // Vérification que les champs requis sont présents
    if (!userId || !newImageUrl) {
         // Si des champs sont manquants, renvoie une réponse d'erreur 400
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

     // Exécution de la requête SQL pour mettre à jour l'URL de l'image de profil de l'utilisateur
    await sql`
      UPDATE users
      SET profile_picture_url = ${newImageUrl}
      WHERE id = ${userId}
    `;

     // Si la mise à jour réussit, renvoie une réponse de succès
    return new Response(JSON.stringify({ message: "Profile picture updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
     // En cas d'erreur lors de l'exécution
    console.error("Error updating profile picture:", error);
     // Renvoie une réponse d'erreur
    return new Response(JSON.stringify({ error: "An error occurred while updating the profile picture" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}