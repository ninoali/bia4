import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronDown } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { LocationSelector } from '../components/home/LocationSelector';
import { ModelGrid } from '../components/home/ModelGrid';
import { CategoryTabs } from '../components/home/CategoryTabs';
import { ActionButtons } from '../components/home/ActionButtons';

export const Home = () => {
  return (
    <div className="bg-[#1a1625] min-h-screen">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LocationSelector />
        <CategoryTabs />
        <ModelGrid />
        <ActionButtons />
      </div>
    </div>
  );
};