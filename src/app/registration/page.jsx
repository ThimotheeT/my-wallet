'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          disabled={isLoading}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={isLoading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign up"}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}