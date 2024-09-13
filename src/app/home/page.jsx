'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WalletDisplay from '../components/WalletDisplay';
import AddWallet from '../components/AddWallet';
import UserInfo from '../components/UserInfo';

export default function Home() {
   // Récupération des données de session et du statut d'authentification
  const { data: session, status } = useSession();
  const router = useRouter();
  
   // États pour le wallet et les messages
  const [wallet, setWallet] = useState(null);
  const [message, setMessage] = useState('');

   // Effet pour gérer la redirection et le chargement initial du wallet
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    } else {
      fetchWallet();
    }
  }, [session, status, router]);

   // Effet pour recharger le wallet si celui-ci est null
  useEffect(() => {
    if (!wallet) {
      fetchWallet();
    }
  }, [wallet]);

   // Fonction pour récupérer les données du wallet depuis l'API
  const fetchWallet = async () => {
    const response = await fetch(`/api/wallets?userId=${session.user.id}`);
    if (response.ok) {
      const data = await response.json();
      setWallet(data.wallet);
    } else {
      console.error('Error retrieving wallet');
    }
  };

  return (
    <div>
      <h1>Welcome to the homepage</h1>
      {session && (
        <>
        {/* Affichage des informations de l'utilisateur */}
          <UserInfo session={session} />
          {/* Affichage du wallet ou du formulaire d'ajout de wallet */}
          {wallet ? (
            <WalletDisplay 
              session={session}
              wallet={wallet} 
              setWallet={setWallet}
              fetchWallet={fetchWallet} 
              setMessage={setMessage} 
            />
          ) : (
            <AddWallet 
              session={session} 
              fetchWallet={fetchWallet} 
              setMessage={setMessage} 
            />
          )}

           {/* Affichage des messages */}
          <p>{message}</p>
        </>
      )}
    </div>
  );
}