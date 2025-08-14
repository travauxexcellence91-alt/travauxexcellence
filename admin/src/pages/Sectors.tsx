import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

export default function Sectors() {
  const [sectors, setSectors] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');

  async function load() {
    try {
      const data = await apiFetch('/sectors');
      setSectors(data);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch('/sectors', { method: 'POST', body: JSON.stringify({ name, icon }) });
    setName('');
    setIcon('');
    await load();
  }

  async function update(id: string, patch: any) {
    await apiFetch(`/sectors/${id}`, { method: 'PATCH', body: JSON.stringify(patch) });
    await load();
  }

  async function remove(id: string) {
    await apiFetch(`/sectors/${id}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Secteurs</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <form onSubmit={create} className="flex gap-2 items-end">
        <div>
          <div className="text-sm">Nom</div>
          <input className="border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <div className="text-sm">Icône</div>
          <input className="border p-2 rounded" value={icon} onChange={(e) => setIcon(e.target.value)} />
        </div>
        <button className="px-3 py-2 bg-emerald-600 text-white rounded">Créer</button>
      </form>
      <ul className="space-y-2">
        {sectors.map(s => (
          <li key={s._id} className="p-3 border bg-white rounded flex items-center gap-2">
            <input className="border p-1 rounded" defaultValue={s.name} onBlur={(e) => update(s._id, { name: e.target.value })} />
            <input className="border p-1 rounded" defaultValue={s.icon} onBlur={(e) => update(s._id, { icon: e.target.value })} />
            <button onClick={() => remove(s._id)} className="ml-auto px-2 py-1 bg-red-600 text-white rounded text-sm">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 