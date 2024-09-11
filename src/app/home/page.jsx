'use client'

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0); // État pour le solde du portefeuille
  const [message, setMessage] = useState(''); // État pour les messages d'erreur ou de succès

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    } else {
      fetchWallet();
    }
  }, [session, status, router]);

  const fetchWallet = async () => {
    const response = await fetch(`/api/wallets?userId=${session.user.id}`);
    console.log("Response Status:", response.status); // Log du statut de la réponse
    if (response.ok) {
      const data = await response.json();
      console.log("Wallet Data:", data); // Vérifiez ce que contient data
      setWallet(data.wallet); // Assurez-vous que vous accédez à data.wallet
    } else {
      console.error('Erreur lors de la récupération du portefeuille');
    }
  };

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
      setMessage('Portefeuille ajouté avec succès !');
      setBalance(0); // Réinitialiser le champ de solde
    } else {
      const errorData = await response.json();
      setMessage(`Erreur : ${errorData.error}`);
    }
  };

  const handleResetWallet = async () => {
    if (!wallet) {
      setMessage('Aucun portefeuille à réinitialiser.');
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
      setMessage('Portefeuille supprimé avec succès. Vous pouvez en créer un nouveau.');
      setWallet(null); // Réinitialiser l'état du portefeuille
    } else {
      const errorData = await response.json();
      setMessage(`Erreur lors de la suppression du portefeuille : ${errorData.error}`);
    }
  };

  useEffect(() => {
    console.log("Wallet State:", wallet); // Ajoutez cette ligne pour déboguer
  }, [wallet]);

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      {session && (
        <div>
          <p>Bonjour, {session.user.name} !</p>
          {wallet ? (
            <div>
              <h2>Solde du portefeuille : {wallet.balance} €</h2>
              <button onClick={handleResetWallet}>Réinitialiser le portefeuille</button>
            </div>
          ) : (
            <div>
              <h2>Ajouter un nouveau portefeuille</h2>
              <input
                type="number"
                placeholder="Solde initial"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
              />
              <button onClick={handleAddWallet}>Ajouter le portefeuille</button>
            </div>
          )}
          <p>{message}</p> {/* Affiche le message de succès ou d'erreur */}
          <Link href='/profile'>{session.user.name}'s profile</Link>
          <button onClick={() => signOut()}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}