import React from 'react';
import { BarChart, Users, Eye, MousePointer, Calendar } from 'lucide-react';
import { AdStats } from '../../types/advertising';

interface AdStatsProps {
  stats: AdStats;
}

export const AdStatsDisplay: React.FC<AdStatsProps> = ({ stats }) => {
  const metrics = [
    {
      label: 'Total Views',
      value: stats.views,
      icon: Eye,
      change: '+12%',
      positive: true,
    },
    {
      label: 'Unique Visitors',
      value: stats.uniqueViews,
      icon: Users,
      change: '+8%',
      positive: true,
    },
    {
      label: 'Click Rate',
      value: `${((stats.clicks / stats.views) * 100).toFixed(1)}%`,
      icon: MousePointer,
      change: '-2%',
      positive: false,
    },
    {
      label: 'Bookings',
      value: stats.bookings,
      icon: Calendar,
      change: '+15%',
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Advertisement Performance</h2>
        <select className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">{metric.label}</p>
                <p className="text-2xl font-light mt-1">{metric.value}</p>
              </div>
              <metric.icon className="w-5 h-5 text-primary-lighter" />
            </div>
            <div className={`mt-2 text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
              {metric.change} from last period
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Views Over Time</h3>
          <BarChart className="w-5 h-5 text-primary-lighter" />
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {/* Placeholder for actual chart */}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="w-full bg-primary-light/20 rounded-t"
              style={{
                height: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};