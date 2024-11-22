import { uploadFile } from './storage';
import { AdImage } from '../../types/ad';

export const uploadImages = async (files: File[]): Promise<AdImage[]> => {
  try {
    const tempId = Date.now().toString();
    const uploadPromises = files.map(async (file, index) => {
      const path = `gallery/temp_${tempId}/${Date.now()}-${file.name}`;
      const url = await uploadFile(file, path);
      
      return {
        id: `gallery-${Date.now()}-${index}`,
        url,
        isPrimary: index === 0,
        type: 'GALLERY' as const,
        status: 'PENDING' as const
      };
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error('Failed to upload images');
  }
};

export const uploadVerificationImage = async (file: File, type: string): Promise<AdImage> => {
  try {
    const tempId = Date.now().toString();
    const path = `verifications/temp_${tempId}/${type}/${file.name}`;
    const url = await uploadFile(file, path);

    return {
      id: `verification-${type}-${Date.now()}`,
      url,
      isPrimary: false,
      type: 'VERIFICATION',
      status: 'PENDING'
    };
  } catch (error) {
    console.error('Error uploading verification image:', error);
    throw new Error('Failed to upload verification image');
  }
};