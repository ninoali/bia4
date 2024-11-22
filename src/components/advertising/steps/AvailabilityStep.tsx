import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import Calendar from 'react-calendar';
import { TimeSlot } from '../../../types/ad';

interface AvailabilityFormData {
  schedule: {
    date: Date;
    slots: TimeSlot[];
  }[];
  bookingSettings: {
    enableInstantBooking: boolean;
    depositAmount: {
      incall: number;
      outcall: number;
    };
  };
}

interface AvailabilityStepProps {
  onSubmit: (data: { availability: AvailabilityFormData }) => void;
  defaultValues?: AvailabilityFormData;
}

export const AvailabilityStep: React.FC<AvailabilityStepProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<AvailabilityFormData['schedule']>(
    defaultValues?.schedule || []
  );
  const [bookingSettings, setBookingSettings] = useState(
    defaultValues?.bookingSettings || {
      enableInstantBooking: false,
      depositAmount: {
        incall: 50,
        outcall: 100,
      },
    }
  );

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00', '23:00'
  ];

  const handleSubmit = () => {
    onSubmit({
      availability: {
        schedule,
        bookingSettings,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
          <CalendarIcon className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Set Your Availability</h2>
        <p className="text-white/60 mt-2">Choose when you're available for bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="glass-effect rounded-xl p-6">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full bg-transparent"
          />
        </div>

        {/* Time Slots */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Available Times
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className="px-4 py-2 rounded-lg text-sm glass-effect hover:bg-primary-lighter/20 transition-colors"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Settings */}
      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-medium">Booking Settings</h3>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={bookingSettings.enableInstantBooking}
              onChange={(e) => setBookingSettings(prev => ({
                ...prev,
                enableInstantBooking: e.target.checked,
              }))}
              className="form-checkbox text-primary-lighter"
            />
            <span>Enable Instant Booking (£40 add-on)</span>
          </label>
          <p className="text-sm text-white/60 mt-1 ml-6">
            Allow clients to book instantly without manual approval
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              In-call Deposit
            </label>
            <input
              type="number"
              min="0"
              max="150"
              value={bookingSettings.depositAmount.incall}
              onChange={(e) => setBookingSettings(prev => ({
                ...prev,
                depositAmount: {
                  ...prev.depositAmount,
                  incall: parseInt(e.target.value),
                },
              }))}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Out-call Deposit
            </label>
            <input
              type="number"
              min="50"
              max="150"
              value={bookingSettings.depositAmount.outcall}
              onChange={(e) => setBookingSettings(prev => ({
                ...prev,
                depositAmount: {
                  ...prev.depositAmount,
                  outcall: parseInt(e.target.value),
                },
              }))}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="button-primary w-full"
      >
        Continue
      </button>
    </div>
  );
};