import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useToast } from '../lib/toast';
import Button from '../components/Button';
import Badge from '../components/Badge';

export default function Transactions() {
  const { showToast } = useToast();
  const [data, setData] = useState<{ items: any[]; page: number; limit: number; total: number }>({ items: [], page: 1, limit: 20, total: 0 });
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function load(page = 1) {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(data.limit) });
      if (status) params.set('status', status);
      if (email) params.set('email', email);
      const resp = await apiFetch(`/admin/transactions?${params.toString()}`);
      setData(resp);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => { load(1); }, []);

  async function refund(id: string) {
    await apiFetch(`/admin/transactions/${id}/refund`, { method: 'POST' });
    showToast('success', 'Transaction remboursée');
    await load(data.page);
  }

  const { items, page, limit, total } = data;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const badgeColor = (s: string) => s === 'SUCCEEDED' ? 'green' : s === 'REFUNDED' ? 'yellow' : 'gray';

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transactions</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 items-end">
        <div>
          <div className="text-sm">Statut</div>
          <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tous</option>
            <option value="SUCCEEDED">SUCCEEDED</option>
            <option value="REFUNDED">REFUNDED</option>
          </select>
        </div>
        <div>
          <div className="text-sm">Email artisan</div>
          <input className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button onClick={() => load(1)} variant="primary">Filtrer</Button>
      </div>
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">Date</th>
              <th className="p-3">Artisan</th>
              <th className="p-3">Projet</th>
              <th className="p-3">Montant</th>
              <th className="p-3">Statut</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(r => (
              <tr key={r._id} className="border-t hover:bg-gray-50">
                <td className="p-3 align-middle">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-3 align-middle">{r.user?.email}</td>
                <td className="p-3 align-middle">{r.project?.title}</td>
                <td className="p-3 align-middle">{r.amount} €</td>
                <td className="p-3 align-middle"><Badge color={badgeColor(r.status)}>{r.status}</Badge></td>
                <td className="p-3 align-middle text-right">
                  {r.status === 'SUCCEEDED' && (
                    <Button onClick={() => refund(r._id)} variant="secondary">Rembourser</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2">
        <Button disabled={page<=1} onClick={() => load(page-1)} variant="secondary">Précédent</Button>
        <div className="text-sm">Page {page} / {totalPages}</div>
        <Button disabled={page>=totalPages} onClick={() => load(page+1)} variant="secondary">Suivant</Button>
      </div>
    </div>
  );
} 