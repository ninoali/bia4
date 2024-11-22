import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { AdPackage, AdTier } from '../../types/ad';

const PACKAGES_COLLECTION = 'packages';
const PURCHASES_COLLECTION = 'package_purchases';

export const getPackages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PACKAGES_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AdPackage[];
  } catch (error) {
    console.error('Error getting packages:', error);
    throw error;
  }
};

export const getPackageByTier = async (tier: AdTier) => {
  try {
    const q = query(collection(db, PACKAGES_COLLECTION), where('tier', '==', tier));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error(`No package found for tier: ${tier}`);
    }
    return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as AdPackage;
  } catch (error) {
    console.error('Error getting package:', error);
    throw error;
  }
};

export const purchasePackage = async (userId: string, packageId: string, duration: number) => {
  try {
    const packageDoc = await getDoc(doc(db, PACKAGES_COLLECTION, packageId));
    if (!packageDoc.exists()) {
      throw new Error('Package not found');
    }

    const purchaseRef = doc(collection(db, PURCHASES_COLLECTION));
    await setDoc(purchaseRef, {
      userId,
      packageId,
      duration,
      status: 'PENDING',
      package: packageDoc.data(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
    });

    return purchaseRef.id;
  } catch (error) {
    console.error('Error purchasing package:', error);
    throw error;
  }
};