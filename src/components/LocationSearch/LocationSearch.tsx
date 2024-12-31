import React, { useState } from 'react';
import type { Coordinates } from '../../types/address';
import { LocationPermissionModal } from '../LocationPermissionModal/LocationPermissionModal';

interface LocationSearchProps {
  onLocationSelect: (location: Coordinates) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowPermissionModal(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setShowPermissionModal(true);
        }
      );
    }
  };

  const handleManualSearch = () => {
    setShowPermissionModal(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for an address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        onClick={handleCurrentLocation}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Use Current Location
      </button>

      <LocationPermissionModal
        isOpen={showPermissionModal}
        onEnableLocation={handleCurrentLocation}
        onManualSearch={handleManualSearch}
      />
    </div>
  );
}