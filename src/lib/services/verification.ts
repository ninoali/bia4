import { doc, setDoc, collection, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AdImage } from '../../types/ad';
import { uploadFile } from './storage';

const VERIFICATIONS_COLLECTION = 'verifications';

export const uploadVerificationImage = async (
  userId: string,
  file: File,
  type: 'id' | 'selfie' | 'note'
): Promise<AdImage> => {
  try {
    // Upload image to storage
    const path = `verifications/${userId}/${type}/${Date.now()}-${file.name}`;
    const url = await uploadFile(file, path);

    // Create verification image record
    const verificationImage: AdImage = {
      id: `verification-${type}-${Date.now()}`,
      url,
      isPrimary: false,
      type: 'VERIFICATION',
      status: 'PENDING',
    };

    // Update Firestore
    const verificationRef = doc(collection(db, VERIFICATIONS_COLLECTION), userId);
    const verificationDoc = await getDoc(verificationRef);

    if (verificationDoc.exists()) {
      await updateDoc(verificationRef, {
        [`images.${type}`]: verificationImage,
        updatedAt: serverTimestamp(),
        status: 'PENDING',
      });
    } else {
      await setDoc(verificationRef, {
        userId,
        images: {
          [type]: verificationImage,
        },
        status: 'PENDING',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return verificationImage;
  } catch (error) {
    console.error('Error uploading verification image:', error);
    throw new Error('Failed to upload verification image');
  }
};

export const getVerificationStatus = async (userId: string) => {
  try {
    const verificationRef = doc(collection(db, VERIFICATIONS_COLLECTION), userId);
    const verificationDoc = await getDoc(verificationRef);
    return verificationDoc.exists() ? verificationDoc.data() : null;
  } catch (error) {
    console.error('Error getting verification status:', error);
    throw new Error('Failed to get verification status');
  }
};