import React, { useCallback, useState } from 'react';
import Map from 'react-map-gl';
import type { Coordinates } from '../../types/address';
import { LocationPin } from './LocationPin';
import { LocationControls } from './LocationControls';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  initialCoordinates?: Coordinates;
  selectedAddress?: string;
  onLocationSelect: (coordinates: Coordinates) => void;
  onLocateMe: () => void;
  onChangeLocation: () => void;
}

export function MapboxMap({ 
  initialCoordinates, 
  selectedAddress,
  onLocationSelect,
  onLocateMe,
  onChangeLocation
}: MapboxMapProps) {
  const [markerPosition, setMarkerPosition] = useState<Coordinates>(
    initialCoordinates || { lat: 21.15, lng: 79.09 }
  );

  const handleMarkerDragEnd = useCallback((lat: number, lng: number) => {
    const coordinates = { lat, lng };
    setMarkerPosition(coordinates);
    onLocationSelect(coordinates);
  }, [onLocationSelect]);

  const handleMapClick = useCallback((event: any) => {
    const coordinates = {
      lat: event.lngLat.lat,
      lng: event.lngLat.lng,
    };
    setMarkerPosition(coordinates);
    onLocationSelect(coordinates);
  }, [onLocationSelect]);

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden">
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: markerPosition.lng,
          latitude: markerPosition.lat,
          zoom: 14
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={handleMapClick}
      >
        <LocationPin
          latitude={markerPosition.lat}
          longitude={markerPosition.lng}
          onDragEnd={handleMarkerDragEnd}
        />
      </Map>
      
      <LocationControls
        selectedAddress={selectedAddress}
        onLocateMe={onLocateMe}
        onChangeLocation={onChangeLocation}
      />
    </div>
  );
}