import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useToast } from '../lib/toast';

type Status = 'NEW' | 'RESERVED' | 'SOLD' | 'CLOSED';

const statusLabel: Record<Status, string> = {
  NEW: 'Nouveau',
  RESERVED: 'Réservé',
  SOLD: 'Vendu',
  CLOSED: 'Fermé',
};

const statuses: Status[] = ['NEW', 'RESERVED', 'SOLD', 'CLOSED'];

export default function Projects() {
  const { showToast } = useToast();
  const [data, setData] = useState<{ items: any[]; page: number; limit: number; total: number }>({ items: [], page: 1, limit: 20, total: 0 });
  const [status, setStatus] = useState('');
  const [city, setCity] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [sectors, setSectors] = useState<any[]>([]);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    load(1);
    loadSectors();
  }, []);

  async function loadSectors() {
    try {
      const sectorsData = await apiFetch('/sectors');
      setSectors(sectorsData);
    } catch (error) {
      console.error('Failed to load sectors:', error);
    }
  }

  async function load(page: number) {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (status) params.set('status', status);
    if (city) params.set('city', city);
    if (sectorId) params.set('sectorId', sectorId);
    const query = params.toString();
    const url = `/admin/projects${query ? '?' + query : ''}`;
    const response = await apiFetch(url);
    setData(response);
  }

  async function save(p: any, patch: Partial<{ status: Status; price: number | null }>) {
    await apiFetch(`/admin/projects/${p._id}`, { method: 'PATCH', body: JSON.stringify(patch) });
    showToast('success', 'Projet mis à jour');
    await load(data.page);
  }

  async function remove(id: string) {
    await apiFetch(`/admin/projects/${id}`, { method: 'DELETE' });
    showToast('success', 'Projet supprimé');
    await load(data.page);
  }

  const toggleExpanded = (projectId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const { items, page, limit, total } = data;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const badgeColor = (s: string) => s === 'NEW' ? 'blue' : s === 'RESERVED' ? 'yellow' : s === 'SOLD' ? 'green' : 'gray';

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Projets</h2>
      <div className="flex gap-2 items-end">
        <div>
          <div className="text-sm">Statut</div>
          <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tous</option>
            {statuses.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
          </select>
        </div>
        <div>
          <div className="text-sm">Ville</div>
          <input className="border p-2 rounded" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <div className="text-sm">Secteur</div>
          <select className="border p-2 rounded" value={sectorId} onChange={(e) => setSectorId(e.target.value)}>
            <option value="">Tous</option>
            {sectors.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
        </div>
        <Button onClick={() => load(1)} variant="primary">Filtrer</Button>
      </div>
      <div className="grid gap-3">
        {items.map((p) => {
          const lines: string[] = (p.description || '').split('\n').filter((l: string) => l.trim() !== '');
          const pretty = lines.map((l: string) => {
            const [k, ...rest] = l.split(':');
            const v = rest.join(':').trim();
            return { k: k.trim(), v };
          });
          const isExpanded = expandedItems[p._id] || false;
          
          return (
            <div key={p._id} className="p-4 bg-white border rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{p.title}</div>
                    <button onClick={() => toggleExpanded(p._id)} className="text-sm px-2 py-1 border rounded">{isExpanded ? '-' : '+'}</button>
                  </div>
                  <div className="text-sm text-gray-600">{p.city}</div>
                </div>
                <Badge color={badgeColor(p.status)}>{statusLabel[p.status as Status] || p.status}</Badge>
              </div>
              {isExpanded && (
                <div className="mt-3 bg-gray-50 border rounded p-3">
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
              <div className="flex gap-2 items-center mt-3">
                <select value={p.status} onChange={(e) => save(p, { status: e.target.value as Status })} className="border p-1 rounded">
                  {statuses.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
                </select>
                <input type="number" placeholder="Prix" value={p.price ?? ''} onChange={(e) => save(p, { price: e.target.value === '' ? null : Number(e.target.value) })} className="border p-1 rounded w-28" />
                <div className="ml-auto">
                  <Button onClick={() => remove(p._id)} variant="danger">Supprimer</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <Button disabled={page<=1} onClick={() => load(page-1)} variant="secondary">Précédent</Button>
        <div className="text-sm">Page {page} / {totalPages}</div>
        <Button disabled={page>=totalPages} onClick={() => load(page+1)} variant="secondary">Suivant</Button>
      </div>
    </div>
  );
} 