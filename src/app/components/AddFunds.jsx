import { useState } from 'react';

 // Composant pour ajouter des fonds au wallet
export default function AddFunds({ wallet, fetchWallet, setMessage }) {
   // Variable pour stocké le montant
  const [amountToAdd, setAmountToAdd] = useState('');

   // Fonction pour gerer l'ajout
  const handleAddFunds = async () => {
     // Vérifie si le wallet existe
    if (!wallet) {
        setMessage('No wallet found to add funds.');
        return;
      }
       
      // Créez une description pour la transaction
      const description = `Added ${amountToAdd} € to wallet`;
  
      // Envoyer une requête POST à l'API pour ajouter la transaction
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          walletId: wallet.id,
          amount: amountToAdd,
          type: 'deposit', 
          description,
        }),
      });
       
      // Gérer la réponse de l'API
      if (response.ok) {
        await fetchWallet(); // Maj data wallet
        setMessage('Funds added successfully!');
        setAmountToAdd(0); // Reset le champ de montant
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Amount to add"
        value={amountToAdd}
        onChange={(e) => {
          const value = e.target.value;
           // Vérifie que la valeur est vide ou positive
          if (value === '' || Number(value) > 0) {
            setAmountToAdd(value);
          }
        }}
        min="0"
      />
      <button onClick={handleAddFunds}>Add Funds</button>
    </div>
  );
}