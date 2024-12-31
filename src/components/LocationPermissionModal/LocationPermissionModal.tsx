import React from "react";
import { Dialog } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface LocationPermissionModalProps {
  isOpen: boolean;
  onEnableLocation: () => void;
  onManualSearch: () => void;
}

export function LocationPermissionModal({
  isOpen,
  onEnableLocation,
  onManualSearch,
}: LocationPermissionModalProps) {
  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-full bg-red-100 p-3">
              <MapPinIcon className="h-8 w-8 text-red-600" />
            </div>

            <Dialog.Title className="text-lg font-semibold text-center">
              Location permission is off
            </Dialog.Title>

            <Dialog.Description className="mt-2 text-sm text-gray-500 text-center">
              We need your location to provide you a seamless delivery
              experience.
            </Dialog.Description>

            <div className="mt-6 w-full space-y-3">
              <button
                onClick={onEnableLocation}
                className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Enable Location
              </button>

              <button
                onClick={onManualSearch}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Search your Location Manually
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
