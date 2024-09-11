'use client'

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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

  const profilePictureUrl = session?.user?.profile_picture_url

  return (
    <div>
      <h1>Your profile</h1>
      {session && (
        <div>
          <p>Hello, {session.user.name} !</p> {/* Affiche le pseudo de l'utilisateur */}
          <Image 
            src={profilePictureUrl}
            alt="Profile Picture" 
            width={100} 
            height={100}
            unoptimized
          />
          <Link href='/home'>Home</Link>
          <button onClick={() => signOut()}>Log out</button>
        </div>
      )}
    </div>
  );
}