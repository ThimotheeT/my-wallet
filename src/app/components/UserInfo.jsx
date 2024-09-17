import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

export default function UserInfo({ session }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg flex flex-col items-center justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
        <CgProfile className="text-greenBrand text-3xl mr-3" />
        <div>
          <p className="text-whiteBrand text-lg font-semibold">
            Hello, {session.user.name} !
          </p>
          <Link 
            href='/profile' 
            className="text-greenBrand hover:text-green-400 transition duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}