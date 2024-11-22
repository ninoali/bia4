import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, Calendar, CreditCard } from 'lucide-react';
import { CreateAdForm } from '../../components/advertising/CreateAdForm';
import { AdProgressBar } from '../../components/advertising/AdProgressBar';

export const CreateAd = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Location', icon: MapPin },
    { number: 2, title: 'Details', icon: FileText },
    { number: 3, title: 'Bookings', icon: Calendar },
    { number: 4, title: 'Package', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-wider mb-4 bg-gradient-to-r from-primary-lighter via-primary-light to-primary-lighter bg-clip-text text-transparent">
            Create Your Advertisement
          </h1>
          <p className="text-lg text-white/60 font-light tracking-wide">
            Start receiving bookings in minutes
          </p>
          <div className="mt-6 inline-block glass-effect px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-300">
            <p className="text-[10px] tracking-[0.4em] text-primary-lighter font-light">
              FIRST MONTH FREE • CODE "DIXLAUNCH"
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <AdProgressBar 
          steps={steps} 
          currentStep={step} 
          className="mb-12"
        />

        {/* Form Content */}
        <div className="glass-effect rounded-xl p-8 border border-white/10">
          <CreateAdForm 
            currentStep={step} 
            onNextStep={() => setStep(prev => Math.min(prev + 1, totalSteps))}
            onPrevStep={() => setStep(prev => Math.max(prev - 1, 1))}
            onComplete={() => navigate('/advertising/manage')}
          />
        </div>
      </div>
    </div>
  );
};