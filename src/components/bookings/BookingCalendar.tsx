import React, { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { DaySchedule, TimeSlot } from '../../types/booking';

interface BookingCalendarProps {
  schedule: DaySchedule[];
  onSlotSelect: (date: Date, slot: TimeSlot) => void;
  selectedDate?: Date;
  selectedSlot?: TimeSlot;
  isLoading?: boolean;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  schedule,
  onSlotSelect,
  selectedDate,
  selectedSlot,
  isLoading = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewingDate, setViewingDate] = useState<Date | null>(null);

  const nextSevenDays = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  const getScheduleForDate = (date: Date): DaySchedule | undefined => {
    return schedule.find(s => isSameDay(new Date(s.date), date));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-primary-lighter animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="glass-effect rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentDate(prev => addDays(prev, -7))}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            disabled={isLoading}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-medium flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Available Dates
          </h3>
          <button
            onClick={() => setCurrentDate(prev => addDays(prev, 7))}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            disabled={isLoading}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {nextSevenDays.map((date) => {
            const daySchedule = getScheduleForDate(date);
            const hasAvailability = daySchedule?.slots.some(slot => slot.isAvailable);
            const isSelected = selectedDate && isSameDay(date, selectedDate);

            return (
              <button
                key={date.toISOString()}
                onClick={() => setViewingDate(date)}
                className={`p-3 rounded-lg text-center transition-all
                  ${hasAvailability 
                    ? 'hover:bg-primary-lighter/20 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'}
                  ${isSelected ? 'bg-primary-lighter text-white' : 'glass-effect'}`}
                disabled={!hasAvailability || isLoading}
              >
                <div className="text-sm font-medium">
                  {format(date, 'EEE')}
                </div>
                <div className="text-lg">
                  {format(date, 'd')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {viewingDate && (
        <div className="glass-effect rounded-xl p-4">
          <h4 className="text-lg font-medium flex items-center mb-4">
            <Clock className="w-5 h-5 mr-2" />
            Available Times for {format(viewingDate, 'MMMM d')}
          </h4>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {getScheduleForDate(viewingDate)?.slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onSlotSelect(viewingDate, slot)}
                disabled={!slot.isAvailable || isLoading}
                className={`px-4 py-2 rounded-lg text-sm transition-all
                  ${slot.isAvailable 
                    ? 'hover:bg-primary-lighter/20 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'}
                  ${selectedSlot?.id === slot.id ? 'bg-primary-lighter text-white' : 'glass-effect'}`}
              >
                {format(new Date(`2024-01-01T${slot.startTime}`), 'HH:mm')}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};