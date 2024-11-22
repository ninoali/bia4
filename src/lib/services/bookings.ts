import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Booking } from '../../types/booking';

const BOOKINGS_COLLECTION = 'bookings';

export const createBooking = async (bookingData: Omit<Booking, 'id'>) => {
  try {
    const docRef = doc(collection(db, BOOKINGS_COLLECTION));
    await setDoc(docRef, {
      ...bookingData,
      status: 'PENDING',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const updateBooking = async (bookingId: string, data: Partial<Booking>) => {
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const getBooking = async (bookingId: string) => {
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Booking : null;
  } catch (error) {
    console.error('Error getting booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId: string, role: 'MODEL' | 'CLIENT') => {
  try {
    const field = role === 'MODEL' ? 'modelId' : 'clientId';
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where(field, '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
  } catch (error) {
    console.error('Error getting user bookings:', error);
    throw error;
  }
};