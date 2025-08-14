import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function MyLeads() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/me/leads');
        setItems(res);
      } catch {}
    })();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Mes leads</h2>
      <ul className="space-y-2">
        {items.map((p) => (
          <li key={p._id} className="p-3 border rounded bg-white">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-600">{p.city}</div>
                <div className="text-xs text-gray-500">Statut: {p.status}</div>
              </div>
              {p.status === 'RESERVED' && (
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Réservé</span>
              )}
              {p.status === 'SOLD' && (
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Acheté</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}