import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { MediaUpload } from '../../ads/MediaUpload';
import { VerificationUpload } from '../../ads/VerificationUpload';
import { AdImage } from '../../../types/ad';

interface MediaFormData {
  images: AdImage[];
  verificationImages: AdImage[];
}

interface MediaStepProps {
  onSubmit: (data: { media: MediaFormData }) => void;
  defaultValues?: MediaFormData;
}

export const MediaStep: React.FC<MediaStepProps> = ({
  onSubmit,
  defaultValues = { images: [], verificationImages: [] },
}) => {
  const [images, setImages] = useState<AdImage[]>(defaultValues.images);
  const [verificationImages, setVerificationImages] = useState<AdImage[]>(
    defaultValues.verificationImages
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (newImages: AdImage[]) => {
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleImageRemove = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleVerificationImageRemove = (imageId: string) => {
    setVerificationImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const allVerificationImagesUploaded = verificationImages.length === 3;

  const handleSubmit = () => {
    if (images.length === 0) {
      setError('Please upload at least one gallery image');
      return;
    }

    if (!allVerificationImagesUploaded) {
      setError('Please upload all required verification photos');
      return;
    }

    onSubmit({
      media: {
        images,
        verificationImages,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lighter/20 mb-4">
          <Camera className="w-8 h-8 text-primary-lighter" />
        </div>
        <h2 className="text-2xl font-light">Upload Media</h2>
        <p className="text-white/60 mt-2">Add photos to your advertisement</p>
      </div>

      {error && (
        <div className="glass-effect rounded-xl p-4 bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Gallery Images</h3>
          <MediaUpload
            images={images}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
            maxFiles={10}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Verification</h3>
          <VerificationUpload
            verificationImages={verificationImages}
            onUpload={(image) => setVerificationImages(prev => [...prev, image])}
            onRemove={handleVerificationImageRemove}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={images.length === 0 || !allVerificationImagesUploaded || isUploading}
        className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? 'Uploading...' : 
          !allVerificationImagesUploaded 
            ? 'Please Upload All Verification Photos'
            : images.length === 0 
              ? 'Please Upload Gallery Images' 
              : 'Continue'}
      </button>
    </div>
  );
};