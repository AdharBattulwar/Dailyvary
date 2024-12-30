import React, { useEffect, useRef, useState } from 'react';
import type { Coordinates } from '../../types/address';
import { initializeMapsApi } from '../../lib/googleMaps';

interface GoogleMapProps {
  initialCoordinates?: Coordinates;
  onLocationSelect: (coordinates: Coordinates) => void;
}

export function GoogleMap({ initialCoordinates, onLocationSelect }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    initializeMapsApi().then(() => {
      if (!mapRef.current) return;

      const defaultCoordinates = initialCoordinates || { lat: 40.7128, lng: -74.0060 };
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultCoordinates,
        zoom: 15,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      const markerInstance = new google.maps.Marker({
        position: defaultCoordinates,
        map: mapInstance,
        draggable: true,
      });

      google.maps.event.addListener(markerInstance, 'dragend', () => {
        const position = markerInstance.getPosition();
        if (position) {
          onLocationSelect({ lat: position.lat(), lng: position.lng() });
        }
      });

      google.maps.event.addListener(mapInstance, 'click', (event) => {
        const position = event.latLng;
        markerInstance.setPosition(position);
        onLocationSelect({ lat: position.lat(), lng: position.lng() });
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    });
  }, [initialCoordinates, onLocationSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-md"
    />
  );
}