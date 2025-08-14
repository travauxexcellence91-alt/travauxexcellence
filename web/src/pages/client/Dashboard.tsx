import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api';

const statuses = ['NEW', 'RESERVED', 'SOLD', 'CLOSED'];

export default function ClientDashboard() {
  const [data, setData] = useState<{ items: any[]; page: number; limit: number; total: number }>({ items: [], page: 1, limit: 20, total: 0 });
  const [status, setStatus] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const token = localStorage.getItem('token');

  async function load(page = 1) {
    if (!token) return;
    const params = new URLSearchParams({ page: String(page), limit: String(data.limit) });
    if (status) params.set('status', status);
    const res = await fetch(`${API_URL}/projects/mine?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setData(await res.json());
  }

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const { items, page, limit, total } = data;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mes projets</h2>
        <Link to="/client/new-project" className="px-3 py-2 bg-blue-600 text-white rounded">Déposer un projet</Link>
      </div>
      <div className="flex gap-2 items-end">
        <div>
          <div className="text-sm">Statut</div>
          <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tous</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button onClick={() => load(1)} className="px-3 py-2 bg-gray-800 text-white rounded">Filtrer</button>
      </div>
      <ul className="space-y-2">
        {items.map((p) => {
          const isOpen = !!expanded[p._id];
          const lines: string[] = (p.description || '').split('\n').filter((l: string) => l.trim() !== '');
          const pretty = lines.map((l: string) => {
            const [k, ...rest] = l.split(':');
            const v = rest.join(':').trim();
            return { k: k.trim(), v };
          });
          return (
            <li key={p._id} className="p-3 border rounded bg-white">
              <div className="flex gap-3 items-start">
                {p.thumbnailUrl && <img src={p.thumbnailUrl} alt="thumb" className="w-14 h-14 object-cover rounded" />}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{p.title}</div>
                    <button onClick={() => setExpanded({ ...expanded, [p._id]: !isOpen })} className="text-sm px-2 py-1 border rounded">{isOpen ? '-' : '+'}</button>
                  </div>
                  <div className="text-sm text-gray-600">{p.status}</div>
                  {isOpen && (
                    <div className="mt-2 bg-gray-50 border rounded p-3">
                      <div className="text-sm text-gray-700">Récapitulatif</div>
                      <table className="text-sm mt-1">
                        <tbody>
                          {pretty.map((row, idx) => (
                            <tr key={idx}>
                              <td className="pr-3 text-gray-500 align-top">{row.k}</td>
                              <td className="align-top">{row.v || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2">
        <button disabled={page<=1} onClick={() => load(page-1)} className="px-2 py-1 border rounded">Précédent</button>
        <div className="text-sm">Page {page} / {totalPages}</div>
        <button disabled={page>=totalPages} onClick={() => load(page+1)} className="px-2 py-1 border rounded">Suivant</button>
      </div>
    </div>
  );
} 