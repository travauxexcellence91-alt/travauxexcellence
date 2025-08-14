import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const linkBase = 'flex items-center gap-2 px-3 py-2 rounded text-sm';
const linkInactive = 'text-gray-600 hover:bg-gray-100';
const linkActive = 'bg-gray-900 text-white';

export default function Sidebar() {
  const { role, logout } = useAuth();

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 border-r bg-white">
      <div className="px-4 py-4 border-b">
        <div className="text-lg font-semibold">TRAVAUX EXCELLENCE</div>
        <div className="text-xs text-gray-500">Espace {role === 'client' ? 'Client' : role === 'artisan' ? 'Artisan' : 'Public'}</div>
      </div>
      <nav className="p-2 space-y-1">
        {!role && (
          <>
            <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Accueil</span>
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Connexion</span>
            </NavLink>
            <NavLink to="/register-client" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Inscription Client</span>
            </NavLink>
            <NavLink to="/register-artisan" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Inscription Artisan</span>
            </NavLink>
          </>
        )}
        {role === 'client' && (
          <>
            <NavLink to="/client/dashboard" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/client/new-project" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Nouveau projet</span>
            </NavLink>
          </>
        )}
        {role === 'artisan' && (
          <>
            <NavLink to="/artisan/dashboard" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Leads</span>
            </NavLink>
            <NavLink to="/artisan/my-leads" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Mes leads</span>
            </NavLink>
            <NavLink to="/artisan/profile" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
              <span>Profil</span>
            </NavLink>
          </>
        )}
        {role && (
          <button onClick={logout} className="mt-2 w-full text-left px-3 py-2 rounded text-sm text-red-600 hover:bg-red-50">Déconnexion</button>
        )}
      </nav>
      <div className="mt-auto p-3 text-xs text-gray-500"></div>
    </aside>
  );
}


