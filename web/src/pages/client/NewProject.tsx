import React, { useEffect, useState } from 'react';
import { API_URL } from '../../lib/api';
import { useToast } from '../../lib/toast';

export default function NewProject() {
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [sectors, setSectors] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API_URL}/sectors`).then(r => r.json()).then(setSectors);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description, city, sectorIds: selected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur');

      if (files && files.length > 0) {
        const fd = new FormData();
        Array.from(files).forEach(f => fd.append('files', f));
        await fetch(`${API_URL}/uploads/projects/${data._id}/files`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          body: fd,
        });
      }

      showToast('success', 'Projet créé');
      window.location.href = '/client/dashboard';
    } catch (err: any) {
      setError(err.message);
      showToast('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggle(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-3">
      <h2 className="text-xl font-semibold">Déposer un projet</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border p-2 rounded" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} />
      <div>
        <div className="font-medium mb-1">Secteurs</div>
        <div className="grid grid-cols-2 gap-2">
          {sectors.map((s) => (
            <label key={s._id} className="flex items-center gap-2">
              <input type="checkbox" checked={selected.includes(s._id)} onChange={() => toggle(s._id)} />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="font-medium mb-1">Photos</div>
        <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} />
      </div>
      <button disabled={loading} className="px-3 py-2 bg-blue-600 text-white rounded">{loading ? '...' : 'Envoyer'}</button>
    </form>
  );
} 