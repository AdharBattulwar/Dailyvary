import React, { useEffect, useRef, useState } from 'react';
import type { Coordinates } from '../../types/address';
import { initializeMapsApi } from '../../lib/googleMaps';

interface LocationSearchProps {
  onLocationSelect: (location: Coordinates) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [searchInput, setSearchInput] = useState('');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initializeMapsApi().then(() => {
      if (!inputRef.current) return;

      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        
        if (place?.geometry?.location) {
          onLocationSelect({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });
    });
  }, [onLocationSelect]);

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          ref={inputRef}
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
    </div>
  );
}