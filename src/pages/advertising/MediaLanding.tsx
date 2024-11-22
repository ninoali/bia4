import React, { useState } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MediaUpload } from '../../components/ads/MediaUpload';
import { VerificationUpload } from '../../components/ads/VerificationUpload';
import { AdImage } from '../../types/ad';

export const MediaLanding = () => {
  const navigate = useNavigate();
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
      // For now, just simulate success and navigate
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/advertising/create');
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
            Upload Your Media
          </h1>
          <p className="text-lg text-white/60 font-light tracking-wide">
            Add photos to your advertisement
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {/* Gallery Upload */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Gallery Images</h2>
          <MediaUpload
            images={images}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
            maxFiles={10}
          />
        </div>

        {/* Verification Upload */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Verification</h2>
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
                Continue
              </>
            )}
          </button>
          <Link 
            to="/guidelines"
            className="button-secondary flex items-center justify-center"
          >
            View Guidelines
          </Link>
        </div>

        {/* Notice */}
        <div className="mt-8 text-center text-sm text-white/40">
          By uploading photos, you confirm they comply with our guidelines and you have the rights to use them.
        </div>
      </div>
    </div>
  );
};