import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
import Projects from './Projects';
import Sectors from './Sectors';
import Login from './Login';
import { RequireAdmin, useAuth } from '../lib/auth';
import Transactions from './Transactions';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function App() {
  const { role, logout } = useAuth();

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-sm mx-auto p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar onLogout={logout} />
      <main className="flex-1">
        <div className="border-b bg-white px-6 py-4">
          <Topbar />
        </div>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<RequireAdmin><Dashboard /></RequireAdmin>} />
            <Route path="/users" element={<RequireAdmin><Users /></RequireAdmin>} />
            <Route path="/projects" element={<RequireAdmin><Projects /></RequireAdmin>} />
            <Route path="/sectors" element={<RequireAdmin><Sectors /></RequireAdmin>} />
            <Route path="/transactions" element={<RequireAdmin><Transactions /></RequireAdmin>} />
            <Route path="*" element={<RequireAdmin><Dashboard /></RequireAdmin>} />
          </Routes>
        </div>
      </main>
    </div>
  );
} 