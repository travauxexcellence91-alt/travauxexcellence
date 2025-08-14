import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useToast } from '../lib/toast';
import Button from '../components/Button';

export default function Users() {
  const { showToast } = useToast();
  const [data, setData] = useState<{ items: any[]; page: number; limit: number; total: number }>({ items: [], page: 1, limit: 20, total: 0 });
  const [q, setQ] = useState('');
  const [role, setRole] = useState('');
  const [suspended, setSuspended] = useState('');
  const [error, setError] = useState('');

  async function load(page = 1) {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(data.limit) });
      if (q) params.set('q', q);
      if (role) params.set('role', role);
      if (suspended) params.set('suspended', suspended);
      const resp = await apiFetch(`/admin/users?${params.toString()}`);
      setData(resp);
    } catch (e: any) {
      setError(e.message);
    }
  }
  useEffect(() => { load(1); }, []);

  async function toggle(id: string) {
    await apiFetch(`/admin/users/${id}/toggle-suspension`, { method: 'POST' });
    showToast('success', 'Statut mis à jour');
    await load(data.page);
  }

  const { items, page, limit, total } = data;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Utilisateurs</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 items-end">
        <div>
          <div className="text-sm">Recherche email</div>
          <input className="border p-2 rounded" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <div className="text-sm">Rôle</div>
          <select className="border p-2 rounded" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Tous</option>
            <option value="client">client</option>
            <option value="artisan">artisan</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div>
          <div className="text-sm">Suspendu</div>
          <select className="border p-2 rounded" value={suspended} onChange={(e) => setSuspended(e.target.value)}>
            <option value="">Tous</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <Button onClick={() => load(1)} variant="primary">Filtrer</Button>
      </div>
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">Email</th>
              <th className="p-3">Rôle</th>
              <th className="p-3">Suspendu</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(u => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-3 align-middle">{u.email}</td>
                <td className="p-3 align-middle">{u.role}</td>
                <td className="p-3 align-middle">{u.isSuspended ? 'Oui' : 'Non'}</td>
                <td className="p-3 align-middle text-right space-x-2">
                  {u.isSuspended ? (
                    <Button onClick={() => toggle(u._id)} variant="primary">Lever la suspension</Button>
                  ) : (
                    <Button onClick={() => toggle(u._id)} variant="danger">Suspendre</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2">
        <Button disabled={page<=1} onClick={() => load(page-1)} variant="secondary">Précédent</Button>
        <div className="text-sm">Page {page} / {Math.max(1, Math.ceil(total / limit))}</div>
        <Button disabled={page>=totalPages} onClick={() => load(page+1)} variant="secondary">Suivant</Button>
      </div>
    </div>
  );
} 