import React from 'react';
import { Star, HeadphonesIcon } from 'lucide-react';

export const ActionButtons = () => {
  return (
    <div className="mt-16 space-y-4">
      <button className="w-full button-primary neon-glow text-[10px] tracking-[0.4em] font-display font-thin flex items-center justify-center gap-3">
        <Star className="w-4 h-4" />
        REVIEWED MODELS
      </button>

      <button className="w-full button-secondary text-[10px] tracking-[0.4em] font-display font-thin flex items-center justify-center gap-3">
        <HeadphonesIcon className="w-4 h-4" />
        CUSTOMER SUPPORT
      </button>
    </div>
  );
};