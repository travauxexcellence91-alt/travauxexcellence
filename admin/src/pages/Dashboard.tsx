import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState<{ totalLeads: number; soldLeads: number; activeArtisans: number; revenue: number } | null>(null);

  useEffect(() => {
    apiFetch('/admin/stats').then(setStats).catch(() => setStats({ totalLeads: 0, soldLeads: 0, activeArtisans: 0, revenue: 0 }));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card title="Leads créés" value={stats?.totalLeads ?? '—'} />
      <Card title="Leads vendus" value={stats?.soldLeads ?? '—'} />
      <Card title="Artisans actifs" value={stats?.activeArtisans ?? '—'} />
      <Card title="CA généré" value={stats ? `${stats.revenue.toFixed(0)} €` : '—'} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="p-5 bg-white border rounded-xl shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-3xl font-bold tracking-tight">{String(value)}</div>
    </div>
  );
} 