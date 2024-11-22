import React, { useState } from 'react';
import { ChevronDown, MapPin, Filter, Clock } from 'lucide-react';

const filters = [
  {
    id: 'location',
    label: 'Location',
    icon: MapPin,
    options: [
      { label: 'Central London', value: 'central-london' },
      { label: 'North London', value: 'north-london' },
      { label: 'South London', value: 'south-london' },
      { label: 'East London', value: 'east-london' },
      { label: 'West London', value: 'west-london' },
    ],
  },
  {
    id: 'nationality',
    label: 'Nationality',
    icon: Filter,
    options: [
      { label: 'British', value: 'british' },
      { label: 'European', value: 'european' },
      { label: 'Asian', value: 'asian' },
      { label: 'Latin', value: 'latin' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'availability',
    label: 'Availability',
    icon: Clock,
    options: [
      { label: 'Available Now', value: 'now' },
      { label: 'Next Hour', value: 'next-hour' },
      { label: 'Today', value: 'today' },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'This Week', value: 'this-week' },
    ],
  },
];

const getIcon = (id: string) => {
  const filter = filters.find(f => f.id === id);
  const Icon = filter?.icon || Filter;
  return <Icon className="w-4 h-4" />;
};

export const CategoryTabs = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div className="relative mb-8">
      <div className="flex gap-4">
        {filters.map((filter) => (
          <div key={filter.id} className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                ${activeFilter === filter.id 
                  ? 'bg-primary-light text-white' 
                  : 'glass-effect hover:bg-white/10'}`}
            >
              {getIcon(filter.id)}
              <span className="text-sm font-light">{filter.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300
                ${activeFilter === filter.id ? 'rotate-180' : ''}`} />
            </button>

            {activeFilter === filter.id && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-dark-900 rounded-xl p-2 z-50 border border-white/10 backdrop-blur-md">
                <div className="space-y-1">
                  {filter.options.map((option) => (
                    <button
                      key={option.value}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};