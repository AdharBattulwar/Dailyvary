import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AddressManager } from './pages/AddressManager';
import { SavedAddresses } from './pages/SavedAddresses';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<AddressManager />} />
          <Route path="/saved-addresses" element={<SavedAddresses />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}