import React from 'react';

export default function Topbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-semibold">Admin</div>
      <div className="flex items-center gap-3">
        <input className="border rounded px-3 py-2 text-sm w-64" placeholder="Rechercher..." />
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      </div>
    </div>
  );
} 