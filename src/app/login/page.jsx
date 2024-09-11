'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Log in'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link href="/registration">Don't have an account yet? Sign up</Link>
    </div>
  );
}