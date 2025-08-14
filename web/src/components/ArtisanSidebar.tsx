import React from 'react';

interface ArtisanSidebarProps {
  activeTab: 'dashboard' | 'leads' | 'accepted' | 'profile';
  onTabChange: (tab: 'dashboard' | 'leads' | 'accepted' | 'profile') => void;
}

export default function ArtisanSidebar({ activeTab, onTabChange }: ArtisanSidebarProps) {
  const tabs = [
    {
      id: 'dashboard' as const,
      label: 'Tableau de bord',
      icon: '📊',
      description: 'Vue d\'ensemble de votre activité'
    },
    {
      id: 'leads' as const,
      label: 'Demandes de devis',
      icon: '📋',
      description: 'Nouvelles demandes dans vos secteurs'
    },
    {
      id: 'accepted' as const,
      label: 'Projets acceptés',
      icon: '✅',
      description: 'Vos projets en cours'
    },
    {
      id: 'profile' as const,
      label: 'Profil',
      icon: '👤',
      description: 'Gérer vos informations'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Espace Artisan</h2>
        <p className="text-sm text-gray-600 mt-1">Gérez vos projets et devis</p>
      </div>
      
      <nav className="p-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{tab.icon}</span>
              <div>
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs text-gray-500 mt-1">{tab.description}</div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Besoin d'aide ?
          </p>
          <a 
            href="/support" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Contacter le support
          </a>
        </div>
      </div>
    </div>
  );
}
