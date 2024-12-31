import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface LocationControlsProps {
  selectedAddress?: string;
  onLocateMe: () => void;
  onChangeLocation: () => void;
}

export function LocationControls({ 
  selectedAddress, 
  onLocateMe, 
  onChangeLocation 
}: LocationControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-start space-x-3">
        <MapPinIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
        <div className="flex-grow">
          <h3 className="font-medium">Select Your Delivery Location</h3>
          <p className="text-sm text-gray-600">{selectedAddress || 'No location selected'}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onLocateMe}
            className="px-4 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50"
          >
            Enable
          </button>
          <button
            onClick={onChangeLocation}
            className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
}