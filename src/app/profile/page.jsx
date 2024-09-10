'use client'

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Vérifiez si l'utilisateur est connecté
  useEffect(() => {
    if (status === 'loading') return; // Ne rien faire pendant le chargement
    if (!session) {
      router.push('/'); // Rediriger vers la page d'accueil si non connecté
    }
  }, [session, status, router]);

  return (
    <div>
      <h1>Bienvenue sur le profil</h1>
      {session && (
        <div>
          <p>Bonjour, {session.user.name} !</p> {/* Affiche le pseudo de l'utilisateur */}
          <Link href='/home'>Home</Link>
          <button onClick={() => signOut()}>Se déconnecter</button> {/* Bouton de déconnexion */}
        </div>
      )}
    </div>
  );
}