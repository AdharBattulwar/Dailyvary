import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { MapPinIcon } from '@heroicons/react/24/solid';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapPreviewProps {
  coordinates?: { lat: number; lng: number };
  address: string;
}

export function MapPreview({ coordinates, address }: MapPreviewProps) {
  if (!coordinates) {
    return <div>No location selected</div>;
  }

  return (
    <div className="space-y-4">
      <div className="h-[300px] rounded-lg overflow-hidden">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: coordinates.lng,
            latitude: coordinates.lat,
            zoom: 15
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          interactive={false}
        >
          <Marker
            longitude={coordinates.lng}
            latitude={coordinates.lat}
          >
            <MapPinIcon className="h-8 w-8 text-red-600" />
          </Marker>
        </Map>
      </div>
      
      <div className="text-sm text-gray-600">
        <p className="font-medium">Selected Location:</p>
        <p>{address}</p>
      </div>
    </div>
  );
}