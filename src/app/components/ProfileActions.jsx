import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function ProfileActions() {
  return (
    <div>
      <Link href='/home'>Home</Link>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
}