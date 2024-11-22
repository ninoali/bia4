import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'glass' | 'primary' | 'gold';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'glass' }) => {
  const variants = {
    glass: 'backdrop-blur-md bg-white/5 border border-white/10 text-white',
    primary: 'bg-primary-light/10 text-primary-lighter border border-primary-light/30',
    gold: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
};