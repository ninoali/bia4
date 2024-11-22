import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  icon: LucideIcon;
}

interface AdProgressBarProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const AdProgressBar: React.FC<AdProgressBarProps> = ({
  steps,
  currentStep,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 h-px bg-white/10 top-6 -z-10" />
        <div 
          className="absolute left-0 h-px bg-primary-lighter top-6 -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                transition-all duration-500 transform
                ${currentStep >= step.number 
                  ? 'bg-primary-lighter text-white scale-110' 
                  : 'glass-effect text-white/40'}`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs tracking-wider font-light
              ${currentStep >= step.number ? 'text-primary-lighter' : 'text-white/40'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};