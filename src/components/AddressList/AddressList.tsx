import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Address } from '../../types/address';

interface AddressListProps {
  onAddressSelect?: (address: Address) => void;
  onAddressDelete?: (address: Address) => void;
}

export function AddressList({ onAddressSelect, onAddressDelete }: AddressListProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (address: Address) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', address.id);

      if (error) throw error;

      setAddresses(addresses.filter(a => a.id !== address.id));
      onAddressDelete?.(address);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading addresses...</div>;
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No saved addresses found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              {address.label && (
                <h3 className="font-medium text-gray-900">{address.label}</h3>
              )}
              <p className="text-gray-600">
                {address.street}
                <br />
                {address.city}, {address.state} {address.postal_code}
                <br />
                {address.country}
              </p>
              {address.is_default && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  Default
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onAddressSelect?.(address)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Select
              </button>
              <button
                onClick={() => handleDelete(address)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}