import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useToast } from '../../lib/toast';
import { API_URL } from '../../lib/api';
import ArtisanSidebar from '../../components/ArtisanSidebar';
import ProjectCard, { Project } from '../../components/ProjectCard';
import { Sector } from '../../components/SectorSelector';

type TabType = 'dashboard' | 'leads' | 'accepted' | 'profile';

export default function ArtisanDashboard() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalAccepted, setTotalAccepted] = useState(0);

  const token = localStorage.getItem('token');

  // Charger les secteurs de l'artisan
  useEffect(() => {
    const fetchArtisanSectors = async () => {
      if (!token) return;
      
      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const artisanSectors = data.profile?.sectors || [];
          setSelectedSectors(artisanSectors.map((s: any) => s._id || s));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des secteurs artisan:', error);
      }
    };

    fetchArtisanSectors();
  }, [token]);

  // Charger tous les secteurs disponibles
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await fetch(`${API_URL}/sectors`);
        if (res.ok) {
          const data = await res.json();
          setSectors(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des secteurs:', error);
      }
    };

    fetchSectors();
  }, []);

  // Charger les compteurs dashboard quand les secteurs changent
  useEffect(() => {
    if (selectedSectors.length > 0) {
      loadDashboardCounts();
    }
  }, [selectedSectors]);

  // Charger les projets selon l'onglet actif
  useEffect(() => {
    if (activeTab === 'leads' || activeTab === 'accepted') {
      loadProjects();
    } else if (activeTab === 'dashboard') {
      loadDashboardCounts();
    }
  }, [activeTab, selectedSectors, city, page]);

  const loadProjects = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '10'
      });

      if (city) params.set('city', city);
      
      // Filtrer par les secteurs de l'artisan
      if (selectedSectors.length > 0) {
        selectedSectors.forEach(sectorId => {
          params.append('sectorIds', sectorId);
        });
      }

      // Endpoint différent selon l'onglet
      const endpoint = activeTab === 'leads' ? 'leads' : 'me/leads';
      const res = await fetch(`${API_URL}/${endpoint}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(data.items || []);
        setTotalPages(Math.max(1, Math.ceil(data.total / 10)));
        setTotalProjects(data.total || 0);
      }
    } catch (error) {
      showToast('error', 'Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardCounts = async () => {
    if (!token) return;
    
    try {
      // Charger le nombre de leads disponibles
      const leadsParams = new URLSearchParams({
        page: '1',
        limit: '1'
      });
      
      if (selectedSectors.length > 0) {
        selectedSectors.forEach(sectorId => {
          leadsParams.append('sectorIds', sectorId);
        });
      }

      const leadsRes = await fetch(`${API_URL}/leads?${leadsParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setTotalLeads(leadsData.total || 0);
      }

      // Charger le nombre de projets acceptés
      const acceptedParams = new URLSearchParams({
        page: '1',
        limit: '1'
      });
      
      if (selectedSectors.length > 0) {
        selectedSectors.forEach(sectorId => {
          acceptedParams.append('sectorIds', sectorId);
        });
      }

      const acceptedRes = await fetch(`${API_URL}/me/leads?${acceptedParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (acceptedRes.ok) {
        const acceptedData = await acceptedRes.json();
        setTotalAccepted(acceptedData.total || 0);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des compteurs dashboard:', error);
    }
  };

  const handleReserve = async (projectId: string) => {
    if (!token) return;
    
    try {
      const res = await fetch(`${API_URL}/leads/${projectId}/reserve`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        }
      });
      
      if (res.ok) {
        showToast('success', 'Projet réservé avec succès !');
        loadProjects(); // Recharger la liste
      } else {
        const error = await res.json();
        showToast('error', error.message || 'Erreur lors de la réservation');
      }
    } catch (error) {
      showToast('error', 'Erreur lors de la réservation');
    }
  };

  const handlePurchase = async (projectId: string) => {
    if (!token) return;
    
    try {
      const res = await fetch(`${API_URL}/leads/${projectId}/purchase`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        }
      });
      
      if (res.ok) {
        showToast('success', 'Projet acheté avec succès !');
        loadProjects(); // Recharger la liste
      } else {
        const error = await res.json();
        showToast('error', error.message || 'Erreur lors de l\'achat');
      }
    } catch (error) {
      showToast('error', 'Erreur lors de l\'achat');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Demandes disponibles</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalLeads}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Projets acceptés</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalAccepted}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Secteurs actifs</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedSectors.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Vos secteurs d'activité</h2>
              <div className="flex flex-wrap gap-2">
                {sectors
                  .filter(sector => selectedSectors.includes(sector._id))
                  .map(sector => (
                    <span
                      key={sector._id}
                      className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {sector.icon && (
                        <span className="mr-2">
                          {sector.icon === 'paint' && '🎨'}
                          {sector.icon === 'pipe' && '🔧'}
                          {sector.icon === 'bolt' && '⚡'}
                          {sector.icon === 'bricks' && '🧱'}
                          {sector.icon === 'grid' && '🔲'}
                          {sector.icon === 'roof' && '🏠'}
                          {sector.icon === 'fire' && '🔥'}
                          {sector.icon === 'leaf' && '🌿'}
                        </span>
                      )}
                      {sector.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        );

      case 'leads':
      case 'accepted':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {activeTab === 'leads' ? 'Demandes de devis' : 'Projets acceptés'}
              </h1>
              
              {/* Filtres */}
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Filtrer par ville"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    setPage(1);
                    loadProjects();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Filtrer
                </button>
              </div>
            </div>

            {/* Liste des projets */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {activeTab === 'leads' 
                    ? 'Aucune demande de devis disponible dans vos secteurs'
                    : 'Aucun projet accepté pour le moment'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      onReserve={handleReserve}
                      onPurchase={handlePurchase}
                      isReserved={activeTab === 'accepted'}
                      isPurchased={project.status === 'SOLD'}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Précédent
                    </button>
                    <span className="text-gray-600">
                      Page {page} sur {totalPages}
                    </span>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Profil</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-600">
                Gestion du profil - Fonctionnalité à venir
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ArtisanSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
} 