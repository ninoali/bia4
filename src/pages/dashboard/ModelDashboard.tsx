import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Calendar, Image, Settings, DollarSign } from 'lucide-react';

export const ModelDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white shadow rounded-lg p-4">
            <nav className="space-y-2">
              <Link
                to="/model/dashboard"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Bookings
              </Link>
              <Link
                to="/model/dashboard/portfolio"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Image className="w-5 h-5 mr-3" />
                Portfolio
              </Link>
              <Link
                to="/model/dashboard/earnings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Earnings
              </Link>
              <Link
                to="/model/dashboard/settings"
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
              <Route index element={<ModelBookings />} />
              <Route path="portfolio" element={<ModelPortfolio />} />
              <Route path="earnings" element={<ModelEarnings />} />
              <Route path="settings" element={<ModelSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModelBookings = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
    <div className="space-y-4">
      {/* Placeholder for bookings list */}
      <p className="text-gray-500">No upcoming bookings</p>
    </div>
  </div>
);

const ModelPortfolio = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Placeholder for portfolio items */}
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg"></div>
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg"></div>
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const ModelEarnings = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Earnings</h2>
    <div className="space-y-4">
      {/* Placeholder for earnings data */}
      <p className="text-gray-500">No earnings data available</p>
    </div>
  </div>
);

const ModelSettings = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Settings</h2>
    <div className="space-y-4">
      {/* Placeholder for settings form */}
      <p className="text-gray-500">Settings coming soon</p>
    </div>
  </div>
);