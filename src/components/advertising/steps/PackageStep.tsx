import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { AdPackageSelector } from '../../ads/AdPackageSelector';
import { AdTier } from '../../../types/ad';

interface PackageFormData {
  tier: AdTier;
  duration: number;
  promoCode?: string;
}

interface PackageStepProps {
  onSubmit: (data: PackageFormData) => void;
  defaultValues?: PackageFormData;
  isSubmitting?: boolean;
}

export const PackageStep: React.FC<PackageStepProps> = ({
  onSubmit,
  defaultValues,
  isSubmitting = false,
}) => {
  const [selectedTier, setSelectedTier] = useState<AdTier | undefined>(
    defaultValues?.tier
  );
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(
    defaultValues?.duration
  );
  const [promoCode, setPromoCode] = useState<string>(
    defaultValues?.promoCode || ''
  );

  const handlePackageSelect = (tier: AdTier, duration: number) => {
    setSelectedTier(tier);
    setSelectedDuration(duration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier || !selectedDuration) return;

    onSubmit({
      tier: selectedTier,
      duration: selectedDuration,
      promoCode: promoCode || undefined,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
          <CreditCard className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Choose Your Package</h2>
        <p className="text-white/60 mt-2">Select the perfect advertising package</p>
      </div>

      <AdPackageSelector
        selectedTier={selectedTier}
        selectedDuration={selectedDuration}
        onSelect={handlePackageSelect}
      />

      <div className="glass-effect rounded-xl p-6">
        <label className="block text-sm font-medium mb-2">
          Promo Code (Optional)
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors uppercase"
          />
          <button
            type="button"
            className="button-secondary"
            onClick={() => {/* TODO: Implement promo code validation */}}
          >
            Apply
          </button>
        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!selectedTier || !selectedDuration || isSubmitting}
        className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating Advertisement...' : 'Create Advertisement'}
      </button>
    </div>
  );
};