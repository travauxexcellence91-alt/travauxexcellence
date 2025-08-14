import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useToast } from '../lib/toast';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      showToast('success', 'Connexion admin réussie');
      window.location.href = '/';
    } catch (e: any) {
      setError(e.message);
      showToast('error', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-3">
      <h2 className="text-xl font-semibold">Connexion Admin</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading} className="px-3 py-2 bg-blue-600 text-white rounded">{loading ? '...' : 'Se connecter'}</button>
    </form>
  );
} 