import React from 'react';

export interface Sector {
  _id: string;
  name: string;
  icon?: string;
}

interface SectorSelectorProps {
  sectors: Sector[];
  selectedSectors: string[];
  onSectorChange: (sectorId: string, checked: boolean) => void;
  disabled?: boolean;
}

export default function SectorSelector({ 
  sectors, 
  selectedSectors, 
  onSectorChange, 
  disabled = false 
}: SectorSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Secteurs d'activité *
      </label>
      <div className="grid grid-cols-2 gap-3">
        {sectors.map((sector) => (
          <label
            key={sector._id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedSectors.includes(sector._id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type="checkbox"
              className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={selectedSectors.includes(sector._id)}
              onChange={(e) => onSectorChange(sector._id, e.target.checked)}
              disabled={disabled}
            />
            <div className="flex items-center">
              {sector.icon && (
                <span className="mr-2 text-lg">
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
              <span className="text-sm font-medium text-gray-700">
                {sector.name}
              </span>
            </div>
          </label>
        ))}
      </div>
      {selectedSectors.length === 0 && (
        <p className="text-sm text-red-600">
          Veuillez sélectionner au moins un secteur d'activité
        </p>
      )}
      <p className="text-xs text-gray-500">
        Sélectionnez tous les secteurs dans lesquels vous intervenez
      </p>
    </div>
  );
}
