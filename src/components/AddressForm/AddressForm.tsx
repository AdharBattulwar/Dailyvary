import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HomeIcon, BuildingOfficeIcon, UserGroupIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

// Address validation schema
const addressSchema = z.object({
  houseNumber: z.string()
    .min(1, 'House/Flat/Block number is required')
    .max(50, 'House number is too long'),
  apartment: z.string()
    .min(1, 'Apartment/Road/Area is required')
    .max(100, 'Address is too long'),
  saveAs: z.enum(['home', 'office', 'friends', 'other']),
  isFavorite: z.boolean().default(false),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  selectedLocation: string;
  onSubmit: (data: AddressFormData) => void;
  onPreviewMap: () => void;
}

export function AddressFormModal({ selectedLocation, onSubmit, onPreviewMap }: AddressFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const selectedSaveAs = watch('saveAs');
  const isFavorite = watch('isFavorite');

  const onFormSubmit = (data: AddressFormData) => {
    try {
      onSubmit(data);
      toast.success('Address saved successfully!');
    } catch (error) {
      toast.error('Failed to save address');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <MapPinIcon className="h-6 w-6 text-red-600 inline-block mr-2" />
          <span className="font-medium">{selectedLocation}</span>
        </div>
        <button
          type="button"
          onClick={onPreviewMap}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Preview on Map
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
            HOUSE/FLAT/BLOCK NO.
          </label>
          <input
            type="text"
            id="houseNumber"
            {...register('houseNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
          {errors.houseNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.houseNumber.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
            APARTMENT/ROAD/AREA
          </label>
          <input
            type="text"
            id="apartment"
            {...register('apartment')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
          {errors.apartment && (
            <p className="mt-1 text-sm text-red-600">{errors.apartment.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SAVE AS
          </label>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: 'home', icon: HomeIcon, label: 'Home' },
              { value: 'office', icon: BuildingOfficeIcon, label: 'Office' },
              { value: 'friends', icon: UserGroupIcon, label: 'Friends' },
              { value: 'other', icon: MapPinIcon, label: 'Other' }
            ].map(({ value, icon: Icon, label }) => (
              <label
                key={value}
                className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${
                  selectedSaveAs === value ? 'border-red-600 bg-red-50' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  value={value}
                  {...register('saveAs')}
                  className="sr-only"
                />
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFavorite"
            {...register('isFavorite')}
            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <label htmlFor="isFavorite" className="ml-2 block text-sm text-gray-900">
            Save as Favorite
          </label>
          <StarIcon className={`h-5 w-5 ml-2 ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`} />
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