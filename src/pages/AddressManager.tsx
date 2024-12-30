import React, { useState } from 'react';
import { GoogleMap } from '../components/Map/GoogleMap';
import { LocationSearch } from '../components/LocationSearch/LocationSearch';
import { AddressForm } from '../components/AddressForm/AddressForm';
import { AddressList } from '../components/AddressList/AddressList';
import type { Address, Coordinates } from '../types/address';

export function AddressManager() {
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleLocationSelect = (coordinates: Coordinates) => {
    setSelectedLocation(coordinates);
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setSelectedLocation({
      lat: address.latitude,
      lng: address.longitude,
    });
  };

  const handleAddressSubmit = () => {
    setSelectedAddress(null);
    setSelectedLocation(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Address Manager</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Search Location</h2>
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Map</h2>
            <GoogleMap
              initialCoordinates={selectedLocation || undefined}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {selectedAddress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <AddressForm
              address={selectedAddress || undefined}
              coordinates={selectedLocation || undefined}
              onSubmit={handleAddressSubmit}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
            <AddressList
              onAddressSelect={handleAddressSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}