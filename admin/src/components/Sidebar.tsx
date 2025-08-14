import React from 'react';
import { NavLink } from 'react-router-dom';

const linkBase = 'flex items-center gap-2 px-3 py-2 rounded text-sm';
const linkInactive = 'text-gray-600 hover:bg-gray-100';
const linkActive = 'bg-gray-900 text-white';

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 border-r bg-white">
      <div className="px-4 py-4 border-b">
        <div className="text-lg font-semibold">Travaux Admin</div>
        <div className="text-xs text-gray-500">Panel de gestion</div>
      </div>
      <nav className="p-2 space-y-1">
        <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <span>Utilisateurs</span>
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <span>Projets</span>
        </NavLink>
        <NavLink to="/sectors" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <span>Secteurs</span>
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
          <span>Transactions</span>
        </NavLink>
        <button onClick={onLogout} className="mt-2 w-full text-left px-3 py-2 rounded text-sm text-red-600 hover:bg-red-50">Déconnexion</button>
      </nav>
      <div className="mt-auto p-3 text-xs text-gray-500"></div>
    </aside>
  );
} 