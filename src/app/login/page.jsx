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
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Email ou mot de passe incorrect');
      } else {
        router.push('/home'); // Redirection vers la page d'accueil après connexion réussie
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false); // Arrêter le chargement
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
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
          placeholder="Mot de passe"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'Se connecter'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link href="/registration">Pas encore de compte ? S'inscrire</Link>
    </div>
  );
}