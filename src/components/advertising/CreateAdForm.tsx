import React, { useState } from 'react';
import { LocationStep } from './steps/LocationStep';
import { DetailsStep } from './steps/DetailsStep';
import { MediaStep } from './steps/MediaStep';
import { BookingStep } from './steps/BookingStep';
import { PackageStep } from './steps/PackageStep';

interface CreateAdFormProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onComplete: () => void;
}

export const CreateAdForm: React.FC<CreateAdFormProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  onComplete,
}) => {
  const [formData, setFormData] = useState({
    location: {},
    details: {},
    media: {
      images: [],
      verificationImages: [],
    },
    bookings: {
      settings: {},
      location: {},
    },
    package: {},
  });

  const handleStepSubmit = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    onNextStep();
  };

  const handleFinalSubmit = async (data: any) => {
    try {
      const finalData = { ...formData, ...data };
      // TODO: Implement API call to create advertisement
      console.log('Submitting ad:', finalData);
      onComplete();
    } catch (error) {
      console.error('Error creating ad:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LocationStep onSubmit={handleStepSubmit} defaultValues={formData.location} />;
      case 2:
        return <DetailsStep onSubmit={handleStepSubmit} defaultValues={formData.details} />;
      case 3:
        return <MediaStep onSubmit={handleStepSubmit} defaultValues={formData.media} />;
      case 4:
        return <BookingStep onSubmit={handleStepSubmit} defaultValues={formData.bookings} />;
      case 5:
        return <PackageStep onSubmit={handleFinalSubmit} defaultValues={formData.package} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {renderStep()}
    </div>
  );
};