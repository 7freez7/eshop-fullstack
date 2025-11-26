'use client'; // Důležité pro interaktivní komponenty

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Volání NestJS API pro autentizaci na portu 3000 (Změněno na 127.0.0.1 pro stabilitu)
    const response = await fetch('http://127.0.0.1:3000/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Uložení JWT tokenu do prohlížeče
        localStorage.setItem('adminToken', data.access_token); 
        // Přesměrování na chráněnou správu produktů
        router.push('/admin/products'); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Chyba přihlášení. Zkontrolujte údaje.');
      }
    } catch (err) {
      setError('Nepodařilo se připojit k serveru. Zkontrolujte, zda běží backend na 3000.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin Přihlášení</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email (admin@eshop.cz)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Heslo (heslo123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Přihlašuji...' : 'Přihlásit'}
        </button>
      </form>
    </div>
  );
}