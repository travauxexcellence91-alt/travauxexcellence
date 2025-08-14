import React from 'react';

export default function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: 'gray' | 'blue' | 'green' | 'yellow' | 'red' }) {
  const map: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-emerald-100 text-emerald-700',
    yellow: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
  };
  return <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[color]}`}>{children}</span>;
} 