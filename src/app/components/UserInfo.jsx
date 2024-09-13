import Link from 'next/link';
import { signOut } from 'next-auth/react';

 // Composant pour afficher les informations de l'utilisateur et les options de navigation
export default function UserInfo({ session }) {
  return (
    <div>
      <p>Hello, {session.user.name}!</p>

      {/* Lien vers la page de profil de l'utilisateur */}
      <Link href='/profile'>{session.user.name}'s profile</Link>
      
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
}