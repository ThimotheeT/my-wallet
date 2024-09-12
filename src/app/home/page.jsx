'use client'

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WalletChart from '../components/WalletChart';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0); // État pour le solde du portefeuille
  const [amountToAdd, setAmountToAdd] = useState(0); // État pour le montant à ajouter
  const [message, setMessage] = useState(''); // État pour les messages d'erreur ou de succès

   //Vérifie le chargement, vérifie l'auth et renvoi sur l'accueil si pas auth, sinon fetch les infos wallet
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    } else {
      fetchWallet();
    }
  }, [session, status, router]);

   //Récupere le portefeuille du user et met a jour
  const fetchWallet = async () => {
    const response = await fetch(`/api/wallets?userId=${session.user.id}`);
    if (response.ok) {
      const data = await response.json();
      setWallet(data.wallet);
    } else {
      console.error('Error retrieving wallet');
    }
  };

   //Creer un nouveau portefeuille avec solde
  const handleAddWallet = async () => {
    const response = await fetch('/api/wallets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
        balance: balance,
      }),
    });

    if (response.ok) {
      await fetchWallet(); // Récupérez le portefeuille mis à jour
      setMessage('Wallet added successfully!');
      setBalance(0); // Réinitialiser le champ de solde
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.error}`);
    }
  };

  //Ajouter des fonds au wallet
  const handleAddFunds = async () => {
    if (!wallet) {
      setMessage('No wallet found to add funds.');
      return;
    }

    const description = `Added ${amountToAdd} € to wallet`; // Créez une description pour la transaction

    // Mettez à jour la table des transactions
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletId: wallet.id, // Assurez-vous que vous avez l'ID du portefeuille
        amount: amountToAdd,
        type: 'deposit', // Type de transaction
        description,
      }),
    });

    if (response.ok) {
      await fetchWallet(); // Récupérez le portefeuille mis à jour
      setMessage('Funds added successfully!');
      setAmountToAdd(0); // Réinitialiser le champ de montant
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.error}`);
    }
  };

   //Permet de delete le wallet
  const handleResetWallet = async () => {
    if (!wallet) {
      setMessage('No wallet to reset.');
      return;
    }

    // Supprimez le portefeuille existant
    const response = await fetch('/api/wallets', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    });

    if (response.ok) {
      setMessage('Wallet deleted successfully. You can create a new one.');
      setWallet(null); // Réinitialiser l'état du portefeuille
    } else {
      const errorData = await response.json();
      setMessage(`Error deleting wallet: ${errorData.error}`);
    }
  };

  return (
    <div>
      <h1>Welcome to the homepage</h1>
      {session && (
        <div>
          <p>Hello, {session.user.name}!</p>
          {wallet ? (
            <div>
              <h2>Wallet balance: {wallet.balance} €</h2>
              <WalletChart balance={wallet.balance} />
              <input
                type="number"
                placeholder="Amount to add"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(Number(e.target.value))}
              />
              <button onClick={handleAddFunds}>Add Funds</button>
              <button onClick={handleResetWallet}>Reset wallet</button>
            </div>
          ) : (
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
          )}
          <p>{message}</p> {/* Affiche le message de succès ou d'erreur */}
          <Link href='/profile'>{session.user.name}'s profile</Link>
          <button onClick={() => signOut()}>Log out</button>
        </div>
      )}
    </div>
  );
}