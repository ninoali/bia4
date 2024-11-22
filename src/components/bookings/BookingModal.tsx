import React, { useState } from 'react';
import { X, Calendar, MapPin, CreditCard, Loader2 } from 'lucide-react';
import { BookingType, TimeSlot } from '../../types/booking';
import { BookingCalendar } from './BookingCalendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: {
    type: BookingType;
    date: Date;
    timeSlot: TimeSlot;
  }) => Promise<void>;
  modelName: string;
  depositAmount: {
    incall: number;
    outcall: number;
  };
  isLoading?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  modelName,
  depositAmount,
  isLoading = false,
}) => {
  const [bookingType, setBookingType] = useState<BookingType>('INCALL');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot) return;

    try {
      setError(null);
      await onSubmit({
        type: bookingType,
        date: selectedDate,
        timeSlot: selectedSlot,
      });
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-dark-900 rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          disabled={isLoading}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-light mb-6">
          Book {modelName}
        </h2>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Booking Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Booking Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setBookingType('INCALL')}
                className={`px-4 py-2 rounded-lg text-sm transition-all
                  ${bookingType === 'INCALL' 
                    ? 'bg-primary-lighter text-white' 
                    : 'glass-effect'}`}
                disabled={isLoading}
              >
                In-call (£{depositAmount.incall} deposit)
              </button>
              <button
                onClick={() => setBookingType('OUTCALL')}
                className={`px-4 py-2 rounded-lg text-sm transition-all
                  ${bookingType === 'OUTCALL' 
                    ? 'bg-primary-lighter text-white' 
                    : 'glass-effect'}`}
                disabled={isLoading}
              >
                Out-call (£{depositAmount.outcall} deposit)
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-primary-lighter" />
              <span>Select Date & Time</span>
            </div>
            <BookingCalendar
              schedule={[]} // TODO: Add actual schedule
              onSlotSelect={(date, slot) => {
                setSelectedDate(date);
                setSelectedSlot(slot);
              }}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              isLoading={isLoading}
            />
          </div>

          {/* Payment Info */}
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary-lighter" />
              <span>Payment Details</span>
            </div>
            <p className="text-sm text-white/60">
              A deposit of £{bookingType === 'INCALL' ? depositAmount.incall : depositAmount.outcall} is required to confirm your booking.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedSlot || isLoading}
            className="button-primary w-full flex items-center justify-center space-x-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isLoading ? 'Processing...' : 'Proceed to Payment'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};