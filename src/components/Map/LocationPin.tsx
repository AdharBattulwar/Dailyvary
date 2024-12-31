import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import { MapPinIcon } from '@heroicons/react/24/solid';

interface LocationPinProps {
  latitude: number;
  longitude: number;
  isDraggable?: boolean;
  onDragEnd?: (lat: number, lng: number) => void;
}

export function LocationPin({ latitude, longitude, isDraggable = true, onDragEnd }: LocationPinProps) {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      draggable={isDraggable}
      onDragEnd={event => onDragEnd?.(event.lngLat.lat, event.lngLat.lng)}
    >
      <div className="relative">
        <MapPinIcon className="h-8 w-8 text-red-600" />
        <Popup
          latitude={latitude}
          longitude={longitude}
          anchor="bottom"
          closeButton={false}
          className="bg-white px-4 py-2 rounded-lg shadow-lg"
        >
          <div className="text-center">
            <p className="text-red-600 font-medium">Your order will be delivered here</p>
            <p className="text-sm text-gray-500">Move pin to your exact location</p>
          </div>
        </Popup>
      </div>
    </Marker>
  );
}