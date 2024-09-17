'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WalletDisplay from '../components/WalletDisplay';
import AddWallet from '../components/AddWallet';
import UserInfo from '../components/UserInfo';
import { IoWallet } from "react-icons/io5";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-whiteBrand p-4">
      <h1 className="sm:text-5xl text-3xl font-bold mb-8 flex items-center justify-center text-greenBrand">
        MY WALLET <IoWallet className="ml-2" />
      </h1>
      {session && (
        <div className="w-full max-w-4xl">
          <UserInfo session={session} />
          <div className="bg-gray-900 rounded-lg p-6 mt-8">
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
          </div>
          {message && (
            <p className="mt-4 text-center text-greenBrand">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}