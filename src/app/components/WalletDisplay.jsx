import WalletChart from './WalletChart';
import AddFunds from './AddFunds.jsx';
import WithdrawFunds from './WithdrawFunds';

 // Composant pour afficher et gérer le wallet
export default function WalletDisplay({ session, wallet, setWallet, fetchWallet, setMessage }) {
   // Fonction pour réinitialiser le wallet
  const handleResetWallet = async () => {
    if (!wallet) {
        setMessage('No wallet to reset.');
        return;
      }
  
       // Envoyer une requête DELETE à l'API pour supprimer le wallet existant
      const response = await fetch('/api/wallets', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      });
  
       // Gérer la réponse de l'API
      if (response.ok) {
        setMessage('Wallet deleted successfully. You can create a new one.');
        setWallet(null); // Réinitialiser l'état du wallet
      } else {
        const errorData = await response.json();
        setMessage(`Error deleting wallet: ${errorData.error}`);
      }
  };

  return (
    <div>
      {/* Affichage du solde du wallet */}
      <h2>Wallet balance: {wallet.balance} €</h2>
      {/* Affichage du graphique du wallet */}
      <WalletChart balance={wallet.balance} />
      {/* Composant pour ajouter des fonds */}
      <AddFunds wallet={wallet} fetchWallet={fetchWallet} setMessage={setMessage} />
      {/* Composant pour retirer des fonds */}
      <WithdrawFunds wallet={wallet} fetchWallet={fetchWallet} setMessage={setMessage} />
      {/* Bouton pour réinitialiser le portefeuille */}
      <button onClick={handleResetWallet}>Reset wallet</button>
    </div>
  );
}