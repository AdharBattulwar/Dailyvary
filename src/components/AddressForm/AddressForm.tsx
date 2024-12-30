import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import type { Address } from '../../types/address';
import { supabase } from '../../lib/supabase';

interface AddressFormProps {
  address?: Partial<Address>;
  coordinates?: { lat: number; lng: number };
  onSubmit?: (address: Partial<Address>) => void;
}

export function AddressForm({ address, coordinates, onSubmit }: AddressFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Address>>({
    defaultValues: {
      ...address,
      latitude: coordinates?.lat,
      longitude: coordinates?.lng,
    },
  });

  const submitHandler = async (data: Partial<Address>) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .upsert({
          ...data,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Address saved successfully!');
      onSubmit?.(data);
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address');
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700">
          Label (e.g., Home, Work)
        </label>
        <input
          type="text"
          id="label"
          {...register('label')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Street Address *
        </label>
        <input
          type="text"
          id="street"
          {...register('street', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.street && (
          <p className="mt-1 text-sm text-red-600">Street address is required</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City *
          </label>
          <input
            type="text"
            id="city"
            {...register('city', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">City is required</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State *
          </label>
          <input
            type="text"
            id="state"
            {...register('state', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">State is required</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
            Postal Code *
          </label>
          <input
            type="text"
            id="postal_code"
            {...register('postal_code', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.postal_code && (
            <p className="mt-1 text-sm text-red-600">Postal code is required</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country *
          </label>
          <input
            type="text"
            id="country"
            {...register('country', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">Country is required</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_default"
          {...register('is_default')}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="is_default" className="ml-2 block text-sm text-gray-900">
          Set as default address
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Address
        </button>
      </div>
    </form>
  );
}