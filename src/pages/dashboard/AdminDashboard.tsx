import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, AlertCircle, DollarSign, Settings, Shield } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white shadow rounded-lg p-4">
            <nav className="space-y-2">
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Users className="w-5 h-5 mr-3" />
                Users
              </Link>
              <Link
                to="/admin/verifications"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Shield className="w-5 h-5 mr-3" />
                Verifications
              </Link>
              <Link
                to="/admin/reports"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <AlertCircle className="w-5 h-5 mr-3" />
                Reports
              </Link>
              <Link
                to="/admin/payments"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Payments
              </Link>
              <Link
                to="/admin/settings"
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
              <Route index element={<UserManagement />} />
              <Route path="verifications" element={<Verifications />} />
              <Route path="reports" element={<Reports />} />
              <Route path="payments" element={<Payments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">User Management</h2>
    <div className="space-y-4">
      {/* Placeholder for user management */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Example User</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Model</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button className="text-blue-600 hover:text-blue-900">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Verifications = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Verification Requests</h2>
    <div className="space-y-4">
      {/* Placeholder for verification requests */}
      <p className="text-gray-500">No pending verification requests</p>
    </div>
  </div>
);

const Reports = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Reports</h2>
    <div className="space-y-4">
      {/* Placeholder for reports */}
      <p className="text-gray-500">No reports to review</p>
    </div>
  </div>
);

const Payments = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Payment Management</h2>
    <div className="space-y-4">
      {/* Placeholder for payment management */}
      <p className="text-gray-500">No payment data available</p>
    </div>
  </div>
);

const AdminSettings = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
    <div className="space-y-4">
      {/* Placeholder for admin settings */}
      <p className="text-gray-500">Settings coming soon</p>
    </div>
  </div>
);