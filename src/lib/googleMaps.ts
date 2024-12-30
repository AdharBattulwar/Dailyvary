import { Loader } from '@googlemaps/js-api-loader';

// Create a single loader instance with all required libraries
export const mapsLoader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places'],
});

// Initialize the loader once
export const initializeMapsApi = () => mapsLoader.load();