import React, { useEffect, useState } from 'react';
import { apiFetch, API_URL } from '../../lib/api';
import { useToast } from '../../lib/toast';

export default function ArtisanProfile() {
  const { showToast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [sectorIds, setSectorIds] = useState<string[]>([]);
  const [allSectors, setAllSectors] = useState<any[]>([]);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [me, sectors] = await Promise.all([
          apiFetch('/me'),
          apiFetch('/sectors'),
        ]);
        setAllSectors(sectors);
        if (me.profile) {
          setCompanyName(me.profile.companyName || '');
          setAddressLine1(me.profile.addressLine1 || '');
          setCity(me.profile.city || '');
          setPostalCode(me.profile.postalCode || '');
          setSectorIds((me.profile.sectors || []).map((s: any) => s._id || s));
          setLogoUrl(me.profile.logoUrl || '');
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function toggle(id: string) {
    setSectorIds((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }

  function selectAll() {
    setSectorIds(allSectors.map((s) => s._id));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await apiFetch('/me/artisan', {
        method: 'PATCH',
        body: JSON.stringify({ companyName, addressLine1, city, postalCode, sectorIds }),
      });
      showToast('success', 'Profil mis à jour');
    } catch (e: any) {
      setError(e.message);
      showToast('error', e.message);
    } finally {
      setSaving(false);
    }
  }

  async function uploadLogo() {
    if (!logoFile) return;
    const token = localStorage.getItem('token');
    const fd = new FormData();
    fd.append('file', logoFile);
    const res = await fetch(`${API_URL}/uploads/artisan/logo`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: fd,
    });
    const data = await res.json();
    if (!res.ok) {
      showToast('error', data?.message || 'Upload failed');
      return;
    }
    setLogoUrl(data.url);
    showToast('success', 'Logo uploadé');
  }

  if (loading) return null;

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-3">
      <h2 className="text-xl font-semibold">Profil artisan</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex items-center gap-3">
        {logoUrl && <img src={logoUrl} alt="logo" className="w-14 h-14 rounded object-cover border" />}
        <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
        <button type="button" onClick={uploadLogo} className="px-3 py-2 bg-gray-800 text-white rounded">Uploader logo</button>
      </div>
      <input className="w-full border p-2 rounded" placeholder="Nom de l’entreprise" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Adresse" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <input className="w-full border p-2 rounded" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Code postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="font-medium">Secteurs</div>
          <button type="button" onClick={selectAll} className="text-sm text-blue-600">Sélectionner tous</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {allSectors.map((s) => (
            <label key={s._id} className="flex items-center gap-2">
              <input type="checkbox" checked={sectorIds.includes(s._id)} onChange={() => toggle(s._id)} />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
      </div>
      <button disabled={saving} className="px-3 py-2 bg-emerald-600 text-white rounded">{saving ? '...' : 'Sauvegarder'}</button>
    </form>
  );
} 