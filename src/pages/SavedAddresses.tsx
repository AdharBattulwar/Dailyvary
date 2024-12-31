import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '../components/SavedAddresses/SearchBar';
import { SavedLocationsList } from '../components/SavedAddresses/SavedLocationsList';
import { RecentSearches } from '../components/SavedAddresses/RecentSearches';
import { CurrentLocation } from '../components/SavedAddresses/CurrentLocation';

export function SavedAddresses() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md">
        <div className="bg-red-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="p-1 hover:bg-red-700 rounded-full transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-semibold ml-2">Your Location</h1>
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
          
          <CurrentLocation />
          
          <SavedLocationsList />
          
          <RecentSearches />
        </div>
      </div>
    </div>
  );
}