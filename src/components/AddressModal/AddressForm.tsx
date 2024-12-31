import React from 'react';
import { useForm } from 'react-hook-form';
import { HomeIcon, BuildingOfficeIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface AddressFormData {
  houseNumber: string;
  apartment: string;
  saveAs: 'home' | 'office' | 'friends' | 'other';
}

interface AddressFormProps {
  selectedLocation: string;
  onSubmit: (data: AddressFormData) => void;
}

export function AddressFormModal({ selectedLocation, onSubmit }: AddressFormProps) {
  const { register, handleSubmit, watch } = useForm<AddressFormData>();
  const selectedSaveAs = watch('saveAs');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-4">
        <MapPinIcon className="h-6 w-6 text-red-600 inline-block mr-2" />
        <span className="font-medium">{selectedLocation}</span>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
            HOUSE/FLAT/BLOCK NO.
          </label>
          <input
            type="text"
            id="houseNumber"
            {...register('houseNumber', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
            APARTMENT/ROAD/AREA
          </label>
          <input
            type="text"
            id="apartment"
            {...register('apartment', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SAVE AS
          </label>
          <div className="grid grid-cols-4 gap-4">
            <label className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${
              selectedSaveAs === 'home' ? 'border-red-600 bg-red-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                value="home"
                {...register('saveAs')}
                className="sr-only"
              />
              <HomeIcon className="h-6 w-6" />
              <span className="mt-1 text-sm">Home</span>
            </label>

            <label className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${
              selectedSaveAs === 'office' ? 'border-red-600 bg-red-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                value="office"
                {...register('saveAs')}
                className="sr-only"
              />
              <BuildingOfficeIcon className="h-6 w-6" />
              <span className="mt-1 text-sm">Office</span>
            </label>

            <label className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${
              selectedSaveAs === 'friends' ? 'border-red-600 bg-red-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                value="friends"
                {...register('saveAs')}
                className="sr-only"
              />
              <UserGroupIcon className="h-6 w-6" />
              <span className="mt-1 text-sm">Friends</span>
            </label>

            <label className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${
              selectedSaveAs === 'other' ? 'border-red-600 bg-red-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                value="other"
                {...register('saveAs')}
                className="sr-only"
              />
              <MapPinIcon className="h-6 w-6" />
              <span className="mt-1 text-sm">Other</span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
      >
        Save Address
      </button>
    </form>
  );
}