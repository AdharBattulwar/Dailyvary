import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapboxMap } from "../components/Map/MapboxMap";
import { LocationSearch } from "../components/LocationSearch/LocationSearch";
import { AddressModal } from "../components/AddressModal/AddressModal";
import type { Address, Coordinates } from "../types/address";

export function AddressManager() {
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleLocationSelect = (coordinates: Coordinates) => {
    setSelectedLocation(coordinates);
    // Here you would typically reverse geocode the coordinates to get the address
    setSelectedAddress("Selected location address will appear here");
  };

  useEffect(() => {
    if (selectedLocation) {
      // Here you would typically reverse geocode the coordinates to get the address
      setSelectedAddress("Selected location address will appear here");
    }
  }, [selectedLocation]);

  const handleLocateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleLocationSelect({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleAddressSubmit = (data: any) => {
    console.log("Address submitted:", data);
    setIsAddressModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Address Manager</h1>
        <div className="space-x-4">
          <Link
            to="/saved-addresses"
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Manage Addresses
          </Link>
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Add New Address
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Location</h2>
          <LocationSearch onLocationSelect={handleLocationSelect} />

          <div className="mt-6">
            <MapboxMap
              initialCoordinates={selectedLocation || undefined}
              selectedAddress={selectedAddress}
              onLocationSelect={handleLocationSelect}
              onLocateMe={handleLocateMe}
              onChangeLocation={() => setIsAddressModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        selectedLocation={selectedAddress}
        onSubmit={handleAddressSubmit}
      />
    </div>
  );
}
