'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaPen, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // État de chargement
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Démarrer le chargement

    try {
        //Tente la connexion du user
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Incorrect email or password');
      } else {
        router.push('/home'); // Redirection vers la page d'accueil après connexion réussie
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false); // Arrêter le chargement
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-whiteBrand p-4">
      <h1 className="sm:text-6xl text-5xl font-bold mb-20 text-greenBrand">Log in</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <div className="flex items-center bg-gray-800 rounded px-3 py-2">
            <FaEnvelope className="text-greenBrand mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center bg-gray-800 rounded px-3 py-2">
            <FaLock className="text-greenBrand mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:text-2xl text-xl mt-10 bg-greenBrand text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 mb-4"
        >
          {isLoading ? 'Loading...' : 'Log in'}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Link href="/registration" className="flex items-center text-greenBrand hover:text-green-400 transition duration-300">
        Don't have an account yet? Sign up <FaPen className="ml-2" />
      </Link>
    </div>
  );
}