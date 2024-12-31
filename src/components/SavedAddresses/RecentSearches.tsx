import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

export function RecentSearches() {
  const recentSearches = [
    {
      name: 'Wadala West',
      address: 'Near Shila Devi Mandir, Chembur Colony, Chembur, Mumbai, Maharashtra, India'
    },
    {
      name: 'Chembur East',
      address: 'Near Shila Devi Mandir, Chembur Colony, Chembur, Mumbai, Maharashtra, India'
    },
    {
      name: 'Wadala East',
      address: 'Near Shila Devi Mandir, Chembur Colony, Chembur, Mumbai, Maharashtra, India'
    }
  ];

  return (
    <div className="space-y-2">
      <h2 className="font-medium text-gray-900">Recent Searches</h2>
      <div className="space-y-4">
        {recentSearches.map((location) => (
          <div key={location.name} className="flex items-start space-x-3">
            <MapPinIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">{location.name}</h3>
              <p className="text-sm text-gray-500">{location.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}