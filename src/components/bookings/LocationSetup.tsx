import React, { useState } from 'react';
import { MapPin, Upload, Phone } from 'lucide-react';
import { LocationDetails } from '../../types/booking';
import { MediaUpload } from '../ads/MediaUpload';

interface LocationSetupProps {
  onSubmit: (location: LocationDetails) => void;
  defaultValues?: Partial<LocationDetails>;
}

export const LocationSetup: React.FC<LocationSetupProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [location, setLocation] = useState<Partial<LocationDetails>>(defaultValues || {});
  const [phoneVerification, setPhoneVerification] = useState({
    phone: '',
    code: '',
    verified: false,
    codeSent: false,
  });

  const handleSendVerificationCode = async () => {
    // TODO: Implement SMS verification
    setPhoneVerification(prev => ({ ...prev, codeSent: true }));
  };

  const handleVerifyCode = async () => {
    // TODO: Implement code verification
    setPhoneVerification(prev => ({ ...prev, verified: true }));
  };

  const handleDirectionImages = (files: File[]) => {
    // TODO: Implement image upload
    console.log('Uploading direction images:', files);
  };

  return (
    <div className="space-y-8">
      {/* Phone Verification */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-full bg-primary-lighter/20">
            <Phone className="w-6 h-6 text-primary-lighter" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-medium mb-2">Verify Your Phone Number</h3>
            <p className="text-sm text-white/60 mb-4">
              We'll send you a 4-digit code to verify your phone number
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="tel"
                  value={phoneVerification.phone}
                  onChange={(e) => setPhoneVerification(prev => ({
                    ...prev,
                    phone: e.target.value,
                  }))}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10"
                  disabled={phoneVerification.verified}
                />
                {!phoneVerification.codeSent && (
                  <button
                    onClick={handleSendVerificationCode}
                    className="mt-2 button-primary"
                  >
                    Send Code
                  </button>
                )}
              </div>

              {phoneVerification.codeSent && !phoneVerification.verified && (
                <div>
                  <input
                    type="text"
                    value={phoneVerification.code}
                    onChange={(e) => setPhoneVerification(prev => ({
                      ...prev,
                      code: e.target.value,
                    }))}
                    placeholder="Enter 4-digit code"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10"
                    maxLength={4}
                  />
                  <button
                    onClick={handleVerifyCode}
                    className="mt-2 button-primary"
                  >
                    Verify Code
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-full bg-primary-lighter/20">
            <MapPin className="w-6 h-6 text-primary-lighter" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-medium mb-2">Set Your Location</h3>
            <p className="text-sm text-white/60 mb-4">
              Enter your address details for client bookings
            </p>

            <div className="space-y-4">
              <input
                type="text"
                value={location.address || ''}
                onChange={(e) => setLocation(prev => ({
                  ...prev,
                  address: e.target.value,
                }))}
                placeholder="Address"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={location.postcode || ''}
                  onChange={(e) => setLocation(prev => ({
                    ...prev,
                    postcode: e.target.value,
                  }))}
                  placeholder="Postcode"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10"
                />
                <input
                  type="text"
                  value={location.city || ''}
                  onChange={(e) => setLocation(prev => ({
                    ...prev,
                    city: e.target.value,
                  }))}
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direction Images */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-full bg-primary-lighter/20">
            <Upload className="w-6 h-6 text-primary-lighter" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-medium mb-2">Upload Direction Images</h3>
            <p className="text-sm text-white/60 mb-4">
              Upload 2-3 images to help clients find your location easily
            </p>

            <MediaUpload
              images={[]}
              onUpload={handleDirectionImages}
              onRemove={() => {}}
              maxFiles={3}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => onSubmit(location as LocationDetails)}
        disabled={!phoneVerification.verified}
        className="button-primary w-full"
      >
        Save Location Details
      </button>
    </div>
  );
};