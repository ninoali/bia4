import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Advertisement, AdImage } from '../../types/ad';

const ADS_COLLECTION = 'advertisements';
const IMAGES_COLLECTION = 'images';

export const createAd = async (userId: string, ad: Omit<Advertisement, 'id'>) => {
  try {
    // Create the advertisement document
    const adData = {
      ...ad,
      userId,
      status: 'PENDING',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, ADS_COLLECTION), adData);
    
    // Update image references with the new ad ID
    if (ad.images?.length) {
      const imageUpdates = ad.images.map(image => 
        updateDoc(doc(db, IMAGES_COLLECTION, image.id), {
          adId: docRef.id,
          updatedAt: serverTimestamp(),
        })
      );
      await Promise.all(imageUpdates);
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating ad:', error);
    throw error;
  }
};

export const uploadAdImage = async (
  userId: string,
  file: File,
  type: AdImage['type'] = 'GALLERY'
): Promise<AdImage> => {
  try {
    const fileName = `${userId}/${type.toLowerCase()}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    const imageData = {
      url,
      type,
      status: 'PENDING',
      isPrimary: false,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const imageDoc = await addDoc(collection(db, IMAGES_COLLECTION), imageData);
    
    return {
      id: imageDoc.id,
      ...imageData,
      url,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getAds = async (params: {
  city?: string;
  status?: Advertisement['status'];
  tier?: Advertisement['tier'];
  limit?: number;
  lastDoc?: any;
}) => {
  try {
    const constraints: any[] = [orderBy('createdAt', 'desc')];
    
    if (params.city) {
      constraints.push(where('location.city', '==', params.city));
    }
    
    if (params.status) {
      constraints.push(where('status', '==', params.status));
    }
    
    if (params.tier) {
      constraints.push(where('tier', '==', params.tier));
    }
    
    if (params.limit) {
      constraints.push(limit(params.limit));
    }
    
    if (params.lastDoc) {
      constraints.push(startAfter(params.lastDoc));
    }
    
    const q = query(collection(db, ADS_COLLECTION), ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Advertisement[];
  } catch (error) {
    console.error('Error getting ads:', error);
    throw error;
  }
};

export const getAd = async (id: string): Promise<Advertisement> => {
  try {
    const docRef = doc(db, ADS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Ad not found');
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Advertisement;
  } catch (error) {
    console.error('Error getting ad:', error);
    throw error;
  }
};

export const updateAd = async (id: string, data: Partial<Advertisement>) => {
  try {
    const docRef = doc(db, ADS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating ad:', error);
    throw error;
  }
};

export const deleteAd = async (id: string) => {
  try {
    await deleteDoc(doc(db, ADS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting ad:', error);
    throw error;
  }
};