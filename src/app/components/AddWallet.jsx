import { useState } from 'react';

 // Composant pour ajouter un nouveau wallet
export default function AddWallet({ session, fetchWallet, setMessage }) {
   // Variable pour stocker le solde du new wallet
  const [balance, setBalance] = useState(0);

   // Fonction pour gérer l'ajout d'un new wallet
  const handleAddWallet = async () => {
     // Envoyer une requête POST à l'API pour créer un new wallet
    const response = await fetch('/api/wallets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id, // ID de l'utilisateur actuel
          balance: balance, // Solde initial du portefeuille
        }),
      });
  
       // Gérer la réponse de l'API
      if (response.ok) {
        await fetchWallet(); // Maj du wallet
        setMessage('Wallet added successfully!');
        setBalance(0); // Reset le solde du wallet
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
  };

  return (
    <div>
      <h2>Add a new wallet</h2>
      <input
        type="number"
        placeholder="Initial balance"
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
      />
      <button onClick={handleAddWallet}>Add the wallet</button>
    </div>
  );
}