import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const detailsSchema = z.object({
  workingName: z.string().min(2, 'Working name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old').max(99, 'Invalid age'),
  nationality: z.string().min(1, 'Nationality is required'),
  eyes: z.string().min(1, 'Eye color is required'),
  hair: z.string().min(1, 'Hair color is required'),
});

type DetailsFormData = z.infer<typeof detailsSchema>;

interface DetailsStepProps {
  onSubmit: (data: { details: DetailsFormData }) => void;
  defaultValues?: DetailsFormData;
}

const nationalities = [
  'British', 'European', 'Asian', 'Latin', 'African', 'Middle Eastern',
  'North American', 'South American', 'Australian', 'Other'
];

const eyeColors = [
  'Blue', 'Brown', 'Green', 'Hazel', 'Grey', 'Black', 'Other'
];

const hairColors = [
  'Black', 'Brown', 'Blonde', 'Red', 'Grey', 'White', 'Other'
];

const baseSelectStyles = "w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white [&>option]:bg-dark-900 [&>option]:text-white";

export const DetailsStep: React.FC<DetailsStepProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: DetailsFormData) => {
    onSubmit({ details: data });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="glass-effect rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-light">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Working Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Working Name</label>
            <input
              {...register('workingName')}
              className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white"
              placeholder="Your working name"
            />
            {errors.workingName && (
              <p className="mt-1 text-sm text-red-400">{errors.workingName.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-primary-lighter/50 transition-colors text-white"
              placeholder="Your age"
              min={18}
              max={99}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-400">{errors.age.message}</p>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm font-medium mb-2">Nationality</label>
            <select
              {...register('nationality')}
              className={baseSelectStyles}
            >
              <option value="" className="text-white">Select nationality</option>
              {nationalities.map(nationality => (
                <option key={nationality} value={nationality} className="text-white">
                  {nationality}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <p className="mt-1 text-sm text-red-400">{errors.nationality.message}</p>
            )}
          </div>

          {/* Eye Color */}
          <div>
            <label className="block text-sm font-medium mb-2">Eye Color</label>
            <select
              {...register('eyes')}
              className={baseSelectStyles}
            >
              <option value="" className="text-white">Select eye color</option>
              {eyeColors.map(color => (
                <option key={color} value={color} className="text-white">
                  {color}
                </option>
              ))}
            </select>
            {errors.eyes && (
              <p className="mt-1 text-sm text-red-400">{errors.eyes.message}</p>
            )}
          </div>

          {/* Hair Color */}
          <div>
            <label className="block text-sm font-medium mb-2">Hair Color</label>
            <select
              {...register('hair')}
              className={baseSelectStyles}
            >
              <option value="" className="text-white">Select hair color</option>
              {hairColors.map(color => (
                <option key={color} value={color} className="text-white">
                  {color}
                </option>
              ))}
            </select>
            {errors.hair && (
              <p className="mt-1 text-sm text-red-400">{errors.hair.message}</p>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="button-primary w-full">
        Continue
      </button>
    </form>
  );
};