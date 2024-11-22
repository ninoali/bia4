import React, { useState } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MediaUpload } from '../../components/ads/MediaUpload';
import { VerificationUpload } from '../../components/ads/VerificationUpload';
import { AdImage } from '../../types/ad';
import { useAuthStore } from '../../store/authStore';

export const ModelMediaUpload = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [images, setImages] = useState<AdImage[]>([]);
  const [verificationImages, setVerificationImages] = useState<AdImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (newImages: AdImage[]) => {
    setImages(prev => [...prev, ...newImages]);
  };

  const handleImageRemove = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleVerificationUpload = (image: AdImage) => {
    setVerificationImages(prev => [...prev, image]);
  };

  const handleVerificationRemove = (imageId: string) => {
    setVerificationImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Please log in to continue');
      navigate('/login');
      return;
    }

    if (images.length === 0) {
      setError('Please upload at least one gallery image');
      return;
    }

    if (verificationImages.length < 3) {
      setError('Please complete all verification uploads');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // TODO: Implement actual upload logic here
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/model/dashboard');
    } catch (err) {
      setError('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
            <Camera className="w-8 h-8 text-primary-lighter" />
          </div>
          <h1 className="text-3xl font-light tracking-wider mb-4 bg-gradient-to-r from-primary-lighter via-primary-light to-primary-lighter bg-clip-text text-transparent">
            Model Portfolio
          </h1>
          <p className="text-lg text-white/60 font-light tracking-wide">
            Upload your photos and verification documents
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {/* Gallery Upload */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Portfolio Images</h2>
          <p className="text-sm text-white/60 mb-6">
            Upload high-quality photos for your portfolio. These will be visible to potential clients.
          </p>
          <MediaUpload
            images={images}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
            maxFiles={10}
          />
        </div>

        {/* Verification Upload */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Identity Verification</h2>
          <p className="text-sm text-white/60 mb-6">
            To ensure platform safety, we require identity verification. These documents are securely stored and never shared.
          </p>
          <VerificationUpload
            verificationImages={verificationImages}
            onUpload={handleVerificationUpload}
            onRemove={handleVerificationRemove}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSubmit}
            disabled={isUploading || images.length === 0 || verificationImages.length < 3}
            className="button-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Save Portfolio
              </>
            )}
          </button>
          <Link 
            to="/model/dashboard"
            className="button-secondary flex items-center justify-center"
          >
            Cancel
          </Link>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 text-center text-sm text-white/40">
          <p>Your verification documents are securely stored and only accessible to our verification team.</p>
          <p className="mt-2">By uploading, you confirm all photos are yours and comply with our guidelines.</p>
        </div>
      </div>
    </div>
  );
};