import React, { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export function CurrentLocation() {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableLocation = () => {
    setIsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically reverse geocode the coordinates
          // and update the address in your application state
          toast.success('Location accessed successfully');
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not access location');
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <MapPinIcon className="h-5 w-5 text-gray-500" />
        <span className="text-gray-700">Current location</span>
      </div>
      <button
        onClick={handleEnableLocation}
        disabled={isLoading}
        className={`px-4 py-1 rounded-full text-sm ${
          isLoading
            ? 'bg-gray-100 text-gray-400'
            : 'bg-white text-red-600 border border-red-600 hover:bg-red-50'
        }`}
      >
        {isLoading ? 'Accessing...' : 'Enable'}
      </button>
    </div>
  );
}