import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { BookingSettings } from '../../bookings/BookingSettings';
import { LocationSetup } from '../../bookings/LocationSetup';
import { BookingSettings as IBookingSettings, LocationDetails } from '../../../types/booking';

interface BookingStepProps {
  onSubmit: (data: { bookings: { settings: IBookingSettings; location: LocationDetails } }) => void;
  defaultValues?: {
    settings?: Partial<IBookingSettings>;
    location?: Partial<LocationDetails>;
  };
}

export const BookingStep: React.FC<BookingStepProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    settings: defaultValues?.settings || {
      enabled: false,
      instantBooking: false,
      deposit: {
        required: false,
        amount: {
          incall: 50,
          outcall: 100,
        },
      },
      schedule: [],
      location: {
        address: '',
        postcode: '',
        city: '',
        latitude: 0,
        longitude: 0,
        directions: [],
        verificationStatus: 'PENDING',
      },
      contactVerified: false,
    },
    location: defaultValues?.location || {
      address: '',
      postcode: '',
      city: '',
      latitude: 0,
      longitude: 0,
      directions: [],
      verificationStatus: 'PENDING',
    },
  });

  const handleSettingsSubmit = (settings: IBookingSettings) => {
    const updatedData = { ...bookingData, settings };
    setBookingData(updatedData);

    if (settings.enabled) {
      setStep(2);
    } else {
      // If bookings are not enabled, skip location setup and submit
      onSubmit({ bookings: updatedData });
    }
  };

  const handleLocationSubmit = (location: LocationDetails) => {
    const finalData = {
      settings: bookingData.settings,
      location,
    };
    onSubmit({ bookings: finalData });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
          <Calendar className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Booking Settings</h2>
        <p className="text-white/60 mt-2">Configure how clients can book your services</p>
      </div>

      {step === 1 && (
        <BookingSettings
          onSubmit={handleSettingsSubmit}
          defaultValues={bookingData.settings}
        />
      )}

      {step === 2 && (
        <LocationSetup
          onSubmit={handleLocationSubmit}
          defaultValues={bookingData.location}
        />
      )}

      {/* Progress Indicators */}
      {bookingData.settings.enabled && (
        <div className="flex justify-center space-x-2">
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-300 
              ${step === 1 ? 'bg-primary-lighter' : 'bg-white/20'}`}
          />
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-300 
              ${step === 2 ? 'bg-primary-lighter' : 'bg-white/20'}`}
          />
        </div>
      )}
    </div>
  );
};