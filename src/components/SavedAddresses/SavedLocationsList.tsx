import React from 'react';
import { HomeIcon, BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export function SavedLocationsList() {
  const savedLocations = [
    {
      type: 'home',
      icon: HomeIcon,
      label: 'Home',
      address: 'Near Shila Devi Mandir, Chembur Colony, Chembur, Mumbai, Maharashtra, India'
    },
    {
      type: 'office',
      icon: BuildingOfficeIcon,
      label: 'Office',
      address: 'Near Shila Devi Mandir, Chembur Colony, Chembur, Mumbai, Maharashtra, India'
    },
    {
      type: 'friends',
      icon: UserGroupIcon,
      label: 'Friends & Family',
      address: 'Near Shila Devi Mandir, Chembur Colony, Chembur, Mumbai, Maharashtra, India'
    }
  ];

  return (
    <div className="space-y-2">
      <h2 className="font-medium text-gray-900">Saved Location</h2>
      <div className="space-y-4">
        {savedLocations.map((location) => (
          <div key={location.type} className="flex items-start space-x-3">
            <location.icon className="h-6 w-6 text-gray-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">{location.label}</h3>
              <p className="text-sm text-gray-500">{location.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}