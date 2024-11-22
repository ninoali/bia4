import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Settings, Eye, BarChart } from 'lucide-react';
import { Advertisement } from '../../types/advertising';
import { AdStatsDisplay } from '../../components/advertising/AdStats';

const mockAd: Advertisement = {
  id: '1',
  userId: '1',
  title: 'Premium Model Available',
  description: 'Professional model available for photoshoots and events.',
  images: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      isPrimary: true,
      order: 1,
      status: 'APPROVED',
    }
  ],
  status: 'ACTIVE',
  tier: 'PREMIUM',
  price: 199.99,
  location: 'New York, NY',
  services: ['Photoshoots', 'Events'],
  availability: {
    start: '2024-03-01T00:00:00Z',
    end: '2024-04-01T00:00:00Z',
  },
  contact: {
    email: 'model@example.com',
  },
  stats: {
    views: 1250,
    clicks: 350,
    favorites: 45,
  },
  featured: true,
  verificationStatus: 'VERIFIED',
  createdAt: '2024-03-01T00:00:00Z',
  updatedAt: '2024-03-01T00:00:00Z',
  expiresAt: '2024-04-01T00:00:00Z',
};

const mockStats = {
  views: 1250,
  uniqueViews: 850,
  clicks: 350,
  inquiries: 75,
  bookings: 25,
  periodStart: '2024-03-01T00:00:00Z',
  periodEnd: '2024-03-07T00:00:00Z',
};

export const ManageAds = () => {
  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light">My Advertisements</h1>
          <Link
            to="/advertising/create"
            className="button-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Ad
          </Link>
        </div>

        {/* Active Ads */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-6">Active Advertisements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{mockAd.title}</h3>
                  <p className="text-sm text-white/60 mt-1">
                    Expires in {new Date(mockAd.expiresAt).getDate() - new Date().getDate()} days
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-white/60">Views</p>
                  <p className="text-lg font-light">{mockAd.stats.views}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Clicks</p>
                  <p className="text-lg font-light">{mockAd.stats.clicks}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Favorites</p>
                  <p className="text-lg font-light">{mockAd.stats.favorites}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="button-primary text-sm py-2">
                  Boost Ad
                </button>
                <button className="button-secondary text-sm py-2">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <AdStatsDisplay stats={mockStats} />
      </div>
    </div>
  );
};