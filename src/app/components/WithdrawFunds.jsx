import { useState } from 'react';

 // Composant pour retirer des fonds au wallet
export default function WithdrawFunds({ wallet, fetchWallet, setMessage }) {
   // Variable pour stocké le montant
  const [amountToWithdraw, setAmountToWithdraw] = useState('');

   // Fonction pour gerer le retrait
  const handleWithdrawFunds = async () => {
     // Vérifie si le wallet existe
    if (!wallet) {
        setMessage('No wallet found to withdraw funds.');
        return;
      }
       
       // Convertir le montant en nombre positif
      const withdrawAmount = Math.abs(Number(amountToWithdraw));
       // Créez une description pour la transaction
      const description = `Withdrawn ${withdrawAmount} € from wallet`;
    
       // Envoyer une requête POST à l'API pour effectuer le retrait
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'withdraw',
          walletId: wallet.id,
          amount: withdrawAmount, 
          type: 'withdrawal',
          description,
        }),
      });
    
       // Gérer la réponse de l'API
      if (response.ok) {
        await fetchWallet(); // Maj data wallet
        setMessage('Funds withdrawn successfully!');
        setAmountToWithdraw(''); // Reset le champ de montant
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Amount to withdraw"
        value={amountToWithdraw}
        onChange={(e) => {
          const value = e.target.value;
           // Vérifie que la valeur est vide ou négative
          if (value === '' || Number(value) < 0) {
            setAmountToWithdraw(value);
          }
        }}
        max="0"
      />
      <button onClick={handleWithdrawFunds}>Withdraw Funds</button>
    </div>
  );
}