import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import { AdImage } from '../../types/ad';
import { uploadImages } from '../../lib/services/images';

interface MediaUploadProps {
  images: AdImage[];
  onUpload: (newImages: AdImage[]) => void;
  onRemove: (imageId: string) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  images,
  onUpload,
  onRemove,
  maxFiles = 10,
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  maxFileSize = 5242880, // 5MB
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxFiles) {
      console.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const validFiles = acceptedFiles.filter(file => {
      if (file.size > maxFileSize) {
        console.error(`File ${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      try {
        const newImages = await uploadImages(validFiles);
        onUpload(newImages);
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
  }, [images.length, maxFiles, maxFileSize, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes,
    },
    maxSize: maxFileSize,
    multiple: true,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive
            ? 'border-primary-lighter bg-primary-lighter/10'
            : 'border-white/20 hover:border-primary-lighter/50'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
        <p className="text-white/60">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop images here, or click to select'}
        </p>
        <p className="text-sm text-white/40 mt-2">
          Maximum {maxFiles} images, up to 5MB each
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={image.url}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onRemove(image.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {image.status === 'PENDING' && (
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-white text-xs py-1 px-2 text-center">
                  Pending Review
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};