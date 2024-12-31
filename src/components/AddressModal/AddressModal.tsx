import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AddressFormModal } from './AddressForm';
import { MapPreview } from '../Map/MapPreview';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  coordinates?: { lat: number; lng: number };
  onSubmit: (data: any) => void;
}

export function AddressModal({
  isOpen,
  onClose,
  selectedLocation,
  coordinates,
  onSubmit
}: AddressModalProps) {
  const [showMapPreview, setShowMapPreview] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {showMapPreview ? 'Location Preview' : 'Add Delivery Address'}
          </Dialog.Title>
          
          {showMapPreview ? (
            <div>
              <MapPreview
                coordinates={coordinates}
                address={selectedLocation}
              />
              <button
                onClick={() => setShowMapPreview(false)}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Back to Form
              </button>
            </div>
          ) : (
            <AddressFormModal
              selectedLocation={selectedLocation}
              onSubmit={(data) => {
                onSubmit(data);
                onClose();
              }}
              onPreviewMap={() => setShowMapPreview(true)}
            />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}