import React from 'react';
import { Clock } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
];

interface ScheduleSettingsProps {
  schedule: Record<string, string[]>;
  onChange: (schedule: Record<string, string[]>) => void;
}

export const ScheduleSettings: React.FC<ScheduleSettingsProps> = ({
  schedule,
  onChange
}) => {
  const toggleTimeSlot = (day: string, time: string) => {
    const updatedSchedule = { ...schedule };
    if (!updatedSchedule[day]) {
      updatedSchedule[day] = [];
    }
    
    if (updatedSchedule[day].includes(time)) {
      updatedSchedule[day] = updatedSchedule[day].filter(t => t !== time);
    } else {
      updatedSchedule[day] = [...updatedSchedule[day], time].sort();
    }
    
    onChange(updatedSchedule);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {DAYS.map(day => (
          <div key={day} className="space-y-3 p-4 rounded-lg bg-white/5">
            <div className="flex items-center justify-between">
              <span className="font-medium">{day}</span>
              <button
                onClick={() => {
                  const updatedSchedule = { ...schedule };
                  if (schedule[day]?.length === TIME_SLOTS.length) {
                    updatedSchedule[day] = [];
                  } else {
                    updatedSchedule[day] = [...TIME_SLOTS];
                  }
                  onChange(updatedSchedule);
                }}
                className="text-sm text-primary-lighter hover:text-primary-light transition-colors"
              >
                {schedule[day]?.length === TIME_SLOTS.length ? 'Clear All' : 'Select All'}
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {TIME_SLOTS.map(time => (
                <button
                  key={`${day}-${time}`}
                  onClick={() => toggleTimeSlot(day, time)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-300
                    ${schedule[day]?.includes(time)
                      ? 'bg-primary-lighter text-white transform scale-105'
                      : 'glass-effect hover:bg-primary-lighter/20'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};