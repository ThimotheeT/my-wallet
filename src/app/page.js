import React from "react";
import Link from 'next/link'
import { IoWallet } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-whiteBrand p-4">
      <div className="text-center mb-8">
        <h1 className="sm:text-6xl text-4xl font-bold sm:mb-20 mb-20 flex items-center justify-center text-greenBrand">
          MY WALLET <IoWallet className="ml-2" />
        </h1>
        <p className="sm:text-2xl text-xl font-semibold">Take control of your finances :</p>
        <p className="sm:text-2xl text-xl sm:mb-20 mb-12 font-semibold">Manage and visualize your expenses with ease !</p>
      </div>
      <div className="flex flex-col sm:text-2xl text-xl sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12">
        <Link href="/registration" className="flex items-center justify-center bg-greenBrand text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
          Sign up <FaPen className="ml-2" />
        </Link>
        <Link href="/login" className="flex items-center justify-center bg-greenBrand text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
          Log in <TbLogin2 className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Welcome;