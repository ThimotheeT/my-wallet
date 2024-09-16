import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { GoHome } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";

export default function ProfileActions() {
  return (
    <div className="flex flex-col space-y-4 mt-6">
      <Link 
        href='/home' 
        className="flex items-center justify-center bg-greenBrand text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
      >
        <GoHome className="mr-2" />
        Home
      </Link>
      <button 
        onClick={() => signOut()} 
        className="flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
      >
        <FiLogOut className="mr-2" />
        Log out
      </button>
    </div>
  );
}