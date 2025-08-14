import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import RegisterClient from './RegisterClient';
import RegisterArtisan from './RegisterArtisan';
import ClientDashboard from './client/Dashboard';
import NewProject from './client/NewProject';
import ArtisanDashboard from './artisan/Dashboard';
import MyLeads from './artisan/MyLeads';
import { RequireRole, useAuth } from '../lib/auth';
import ArtisanProfile from './artisan/Profile';
import Topbar from '../components/Topbar';
import PublishProject from './PublishProject';

export default function App() {
  const { role, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <Topbar />
      </header>
      <div className="max-w-6xl mx-auto p-4">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-client" element={<RegisterClient />} />
            <Route path="/register-artisan" element={<RegisterArtisan />} />
            <Route path="/publish" element={<PublishProject />} />

            <Route path="/client" element={<Navigate to="/client/dashboard" />} />
            <Route path="/client/dashboard" element={<RequireRole roles={['client']}><ClientDashboard /></RequireRole>} />
            <Route path="/client/new-project" element={<RequireRole roles={['client']}><NewProject /></RequireRole>} />

            <Route path="/artisan" element={<Navigate to="/artisan/dashboard" />} />
            <Route path="/artisan/dashboard" element={<RequireRole roles={['artisan']}><ArtisanDashboard /></RequireRole>} />
            <Route path="/artisan/my-leads" element={<RequireRole roles={['artisan']}><MyLeads /></RequireRole>} />
            <Route path="/artisan/profile" element={<RequireRole roles={['artisan']}><ArtisanProfile /></RequireRole>} />
          </Routes>
        </main>
      </div>
    </div>
  );
} 