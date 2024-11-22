import React from 'react';
import { Check, Info } from 'lucide-react';
import { AdTier } from '../../types/ad';

interface PackageFeature {
  text: string;
  included: boolean;
  new?: boolean;
  info?: string;
}

interface AdPackageCardProps {
  tier: AdTier;
  title: string;
  subtitle?: string;
  price: number;
  duration: number;
  features: PackageFeature[];
  isSelected: boolean;
  onSelect: () => void;
}

export const AdPackageCard: React.FC<AdPackageCardProps> = ({
  tier,
  title,
  subtitle,
  price,
  duration,
  features,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300
        ${isSelected 
          ? 'border-2 border-primary-lighter shadow-lg shadow-primary-lighter/20 scale-105'
          : 'border border-white/10 hover:border-primary-lighter/50'}`}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-primary-dark to-dark-900">
        <h3 className="text-xl font-medium text-primary-lighter mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-white/60">{subtitle}</p>
        )}
      </div>

      {/* Price */}
      <div className="p-6 text-center border-b border-white/10">
        <div className="text-3xl font-light">
          £{price}
          <span className="text-lg text-white/60">/{duration} days</span>
        </div>
      </div>

      {/* Features */}
      <div className="p-6 space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3
              ${feature.included ? 'text-white' : 'text-white/40'}`}
          >
            <Check
              className={`w-5 h-5 flex-shrink-0 mt-0.5
                ${feature.included ? 'text-primary-lighter' : 'text-white/20'}`}
            />
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span>{feature.text}</span>
                {feature.new && (
                  <span className="px-2 py-0.5 text-xs bg-primary-lighter text-white rounded-full">
                    NEW
                  </span>
                )}
                {feature.info && (
                  <button
                    className="text-white/40 hover:text-white/60 transition-colors"
                    title={feature.info}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Select Button */}
      <div className="p-6 bg-white/5">
        <button
          onClick={onSelect}
          className={`w-full py-3 px-6 rounded-lg transition-all duration-300
            ${isSelected
              ? 'bg-primary-lighter text-white'
              : 'glass-effect hover:bg-primary-lighter/20'}`}
        >
          {isSelected ? 'Selected' : 'Select Package'}
        </button>
      </div>
    </div>
  );
};