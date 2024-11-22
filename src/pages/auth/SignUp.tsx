import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { signupSchema } from '../../lib/validation/auth';
import { FormInput } from '../../components/ui/FormInput';
import { useAuthStore } from '../../store/authStore';

type SignUpFormData = z.infer<typeof signupSchema>;

export const SignUp = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // TODO: Replace with actual API call
      const response = await new Promise((resolve) => 
        setTimeout(() => resolve({ 
          user: { 
            id: '1', 
            email: data.email,
            username: data.username,
            role: data.userType,
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }, 
          token: 'dummy-token' 
        }), 1000)
      );
      
      setAuth(response.user, response.token);
      navigate(`/${response.user.role.toLowerCase()}/dashboard`);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              label="Email address"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />

            <FormInput
              label="Username"
              name="username"
              register={register}
              error={errors.username}
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword}
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <select
                {...register('userType')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="MODEL">Model</option>
                <option value="CLIENT">Client</option>
              </select>
              {errors.userType && (
                <p className="text-sm text-red-600">{errors.userType.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};