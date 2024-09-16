'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        //Envoi une requete POST a l'api
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
       //Si l'incription reussi, connecte le user automatiquement
      if (response.ok) {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result.error) {
          setError('Registration successful, but error during automatic login.');
        } else {
            //Renvoi sur la page home si l'inscription fonctionne
          router.push('/home');
        }
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred during registration.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
    } finally {
        //Empeche de cliqué a nouveau pendant le chargement
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-whiteBrand p-4">
      <h1 className="sm:text-6xl text-5xl font-bold mb-20 text-greenBrand">Sign up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <div className="flex items-center bg-gray-800 rounded px-3 py-2">
            <FaUser className="text-greenBrand mr-2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              disabled={isLoading}
              className="bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center bg-gray-800 rounded px-3 py-2">
            <FaEnvelope className="text-greenBrand mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading}
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
              disabled={isLoading}
              className="bg-transparent w-full focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:text-2xl text-xl mt-10 bg-greenBrand text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          {isLoading ? "Loading..." : "Sign up"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}