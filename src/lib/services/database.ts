import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { User, Advertisement, Booking, AdImage } from '../../types';

// Collection References
const USERS = 'users';
const ADS = 'advertisements';
const BOOKINGS = 'bookings';
const VERIFICATIONS = 'verifications';

// User Operations
export const createUser = async (userId: string, userData: Partial<User>) => {
  try {
    await setDoc(doc(db, USERS, userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const docRef = doc(db, USERS, userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// Advertisement Operations
export const createAd = async (userId: string, adData: Omit<Advertisement, 'id'>) => {
  try {
    const docRef = doc(collection(db, ADS));
    await setDoc(docRef, {
      ...adData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'PENDING',
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating ad:', error);
    throw error;
  }
};

export const updateAd = async (adId: string, data: Partial<Advertisement>) => {
  try {
    const docRef = doc(db, ADS, adId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating ad:', error);
    throw error;
  }
};

export const getAd = async (adId: string) => {
  try {
    const docRef = doc(db, ADS, adId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Advertisement : null;
  } catch (error) {
    console.error('Error getting ad:', error);
    throw error;
  }
};

// Verification Operations
export const submitVerification = async (userId: string, verificationData: {
  idImage: AdImage;
  selfieImage: AdImage;
  noteImage: AdImage;
}) => {
  try {
    const docRef = doc(collection(db, VERIFICATIONS));
    await setDoc(docRef, {
      userId,
      ...verificationData,
      status: 'PENDING',
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting verification:', error);
    throw error;
  }
};

export const getVerificationStatus = async (userId: string) => {
  try {
    const q = query(
      collection(db, VERIFICATIONS),
      where('userId', '==', userId),
      orderBy('submittedAt', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  } catch (error) {
    console.error('Error getting verification status:', error);
    throw error;
  }
};