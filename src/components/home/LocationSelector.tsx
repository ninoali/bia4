import React from 'react';
import { MapPin } from 'lucide-react';

export const LocationSelector = () => {
  return (
    <div className="flex items-center justify-between mb-8 glass-effect rounded-full px-6 py-4">
      <div className="flex items-center text-accent-purple">
        <MapPin className="w-5 h-5 mr-2" />
        <span className="font-medium">Escorts in Albany</span>
      </div>
      
      <button className="px-4 py-2 text-sm text-white rounded-full glass-effect hover:bg-white/20 transition-all duration-300">
        CHANGE LOCATION
      </button>
    </div>
  );
};