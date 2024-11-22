import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin } from 'lucide-react';

const locationSchema = z.object({
  city: z.string().min(1, 'City is required'),
  area: z.string().optional(),
  postcode: z.string().optional(),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface LocationStepProps {
  onSubmit: (data: LocationFormData) => void;
  defaultValues?: Partial<LocationFormData>;
}

const cities = [
  'London',
  'Manchester',
  'Birmingham',
  'Liverpool',
  'Leeds',
  'Glasgow',
  'Edinburgh',
  'Bristol',
  'Cardiff',
  'Belfast',
];

export const LocationStep: React.FC<LocationStepProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues,
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
          <MapPin className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Select Your Location</h2>
        <p className="text-white/60 mt-2">Choose where you want to advertise</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="glass-effect rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <select
              {...register('city')}
              className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white [&>option]:bg-dark-900 [&>option]:text-white"
            >
              <option value="" className="text-white">Select a city</option>
              {cities.map(city => (
                <option key={city} value={city} className="text-white">
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Area (Optional)</label>
            <input
              type="text"
              {...register('area')}
              placeholder="e.g., Central, North, South"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Postcode (Optional)</label>
            <input
              type="text"
              {...register('postcode')}
              placeholder="e.g., SW1A 1AA"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-lighter/50 transition-colors"
            />
          </div>
        </div>

        <button type="submit" className="button-primary w-full">
          Continue
        </button>
      </form>
    </div>
  );
};