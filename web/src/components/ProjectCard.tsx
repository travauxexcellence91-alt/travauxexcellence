import React from 'react';

export interface Project {
  _id: string;
  title: string;
  description: string;
  city?: string;
  sectors: Array<{
    _id: string;
    name: string;
    icon?: string;
  }>;
  status: 'NEW' | 'RESERVED' | 'SOLD' | 'CLOSED';
  price?: number | null;
  createdAt: string;
  client: {
    firstName: string;
    lastName: string;
    city?: string;
  };
}

interface ProjectCardProps {
  project: Project;
  onReserve: (projectId: string) => void;
  onPurchase: (projectId: string) => void;
  isReserved?: boolean;
  isPurchased?: boolean;
}

export default function ProjectCard({ 
  project, 
  onReserve, 
  onPurchase, 
  isReserved = false,
  isPurchased = false 
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-green-100 text-green-800';
      case 'RESERVED': return 'bg-yellow-100 text-yellow-800';
      case 'SOLD': return 'bg-blue-100 text-blue-800';
      case 'CLOSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'NEW': return 'Nouveau';
      case 'RESERVED': return 'Réservé';
      case 'SOLD': return 'Vendu';
      case 'CLOSED': return 'Fermé';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {getStatusLabel(project.status)}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

      {/* Secteurs */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.sectors.map((sector) => (
            <span
              key={sector._id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {sector.icon && (
                <span className="mr-1">
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

      {/* Informations client et localisation */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>👤 {project.client.firstName} {project.client.lastName}</span>
          {project.city && <span>📍 {project.city}</span>}
        </div>
        <span>📅 {formatDate(project.createdAt)}</span>
      </div>

      {/* Prix si disponible */}
      {project.price && (
        <div className="mb-4">
          <span className="text-lg font-bold text-green-600">
            {project.price.toLocaleString('fr-FR')} €
          </span>
        </div>
      )}

      {/* Actions */}
      {project.status === 'NEW' && !isReserved && (
        <div className="flex space-x-3">
          <button
            onClick={() => onReserve(project._id)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Réserver ce projet
          </button>
        </div>
      )}

      {isReserved && project.status === 'RESERVED' && (
        <div className="flex space-x-3">
          <button
            onClick={() => onPurchase(project._id)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Acheter le projet
          </button>
        </div>
      )}

      {isPurchased && (
        <div className="text-center py-2">
          <span className="text-green-600 font-medium">✅ Projet acheté</span>
        </div>
      )}
    </div>
  );
}
