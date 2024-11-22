import React from 'react';
import { Check, Info } from 'lucide-react';
import { AdTier } from '../../types/ad';

interface Package {
  tier: AdTier;
  title: string;
  subtitle: string;
  durations: {
    days: number;
    price: number;
  }[];
  features: {
    text: string;
    included: boolean;
    new?: boolean;
  }[];
}

const packages: Package[] = [
  {
    tier: 'TOP',
    title: 'TOP Ad',
    subtitle: 'Maximum visibility',
    durations: [
      { days: 7, price: 54.99 },
      { days: 15, price: 64.99 },
      { days: 30, price: 99.99 },
    ],
    features: [
      { text: '20X more calls', included: true },
      { text: 'Always in the top positions', included: true },
      { text: 'Unlimited manual boosts', included: true, new: true },
      { text: 'Highlighted background', included: true },
      { text: 'Top badge', included: true },
      { text: 'Unlimited change of city', included: true },
    ],
  },
  {
    tier: 'PRIME',
    title: 'Prime Ad',
    subtitle: '🔥 Popular',
    durations: [
      { days: 7, price: 19.99 },
      { days: 15, price: 35.99 },
      { days: 30, price: 54.99 },
    ],
    features: [
      { text: '5X more calls', included: true },
      { text: 'Always in the top positions', included: true },
      { text: '6 Manual Boost included per day', included: true },
      { text: 'Highlighted background', included: true },
      { text: 'Top badge', included: false },
      { text: 'Unlimited change of city', included: false },
    ],
  },
  {
    tier: 'BASIC',
    title: 'Basic Ad',
    subtitle: 'Published in 24 hours',
    durations: [
      { days: 7, price: 14.99 },
      { days: 15, price: 22.99 },
      { days: 30, price: 34.99 },
    ],
    features: [
      { text: 'Contacts in your area', included: true },
      { text: 'Always in the top positions', included: false },
      { text: '6 Manual Boost included per day', included: false },
      { text: 'Highlighted background', included: false },
      { text: 'Top badge', included: false },
      { text: 'Unlimited change of city', included: false },
    ],
  },
];

interface AdPackageSelectorProps {
  selectedTier?: AdTier;
  selectedDuration?: number;
  onSelect: (tier: AdTier, duration: number) => void;
}

export const AdPackageSelector: React.FC<AdPackageSelectorProps> = ({
  selectedTier,
  selectedDuration,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg.tier}
          className={`relative rounded-xl overflow-hidden transition-all duration-300
            ${selectedTier === pkg.tier
              ? 'border-2 border-primary-lighter shadow-lg shadow-primary-lighter/20'
              : 'border border-white/10'}`}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-b from-primary-dark to-dark-900">
            <h3 className="text-xl font-medium text-primary-lighter mb-1">
              {pkg.title}
            </h3>
            <p className="text-sm text-white/60">{pkg.subtitle}</p>
          </div>

          {/* Pricing Options */}
          <div className="p-6 space-y-4">
            {pkg.durations.map((duration) => (
              <label
                key={duration.days}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`duration-${pkg.tier}`}
                  checked={selectedTier === pkg.tier && selectedDuration === duration.days}
                  onChange={() => onSelect(pkg.tier, duration.days)}
                  className="form-radio text-primary-lighter focus:ring-primary-lighter"
                />
                <span className="flex-grow">
                  {duration.days} days
                </span>
                <span className="font-medium">
                  {duration.price} GBP
                </span>
              </label>
            ))}
          </div>

          {/* Features */}
          <div className="p-6 bg-white/5">
            <ul className="space-y-3">
              {pkg.features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center space-x-2 text-sm
                    ${feature.included ? 'text-white' : 'text-white/40'}`}
                >
                  <Check
                    className={`w-4 h-4 flex-shrink-0
                      ${feature.included ? 'text-primary-lighter' : 'text-white/20'}`}
                  />
                  <span className="flex-grow">{feature.text}</span>
                  {feature.new && (
                    <span className="px-2 py-0.5 text-xs bg-primary-lighter text-white rounded-full">
                      NEW
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};