import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Search, Calendar, Heart, Settings } from 'lucide-react';

export const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white shadow rounded-lg p-4">
            <nav className="space-y-2">
              <Link
                to="/client/dashboard"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Search className="w-5 h-5 mr-3" />
                Browse Models
              </Link>
              <Link
                to="/client/dashboard/bookings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Calendar className="w-5 h-5 mr-3" />
                My Bookings
              </Link>
              <Link
                to="/client/dashboard/favorites"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Heart className="w-5 h-5 mr-3" />
                Favorites
              </Link>
              <Link
                to="/client/dashboard/settings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Routes>
              <Route index element={<BrowseModels />} />
              <Route path="bookings" element={<ClientBookings />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<ClientSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrowseModels = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Browse Models</h2>
    <div className="space-y-4">
      {/* Placeholder for model search */}
      <input
        type="search"
        placeholder="Search models..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder for model cards */}
        <div className="bg-gray-50 p-4 rounded-lg">Model Card</div>
        <div className="bg-gray-50 p-4 rounded-lg">Model Card</div>
        <div className="bg-gray-50 p-4 rounded-lg">Model Card</div>
      </div>
    </div>
  </div>
);

const ClientBookings = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
    <div className="space-y-4">
      {/* Placeholder for bookings list */}
      <p className="text-gray-500">No bookings found</p>
    </div>
  </div>
);

const Favorites = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Favorite Models</h2>
    <div className="space-y-4">
      {/* Placeholder for favorites list */}
      <p className="text-gray-500">No favorites yet</p>
    </div>
  </div>
);

const ClientSettings = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Settings</h2>
    <div className="space-y-4">
      {/* Placeholder for settings form */}
      <p className="text-gray-500">Settings coming soon</p>
    </div>
  </div>
);