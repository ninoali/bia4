import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User } from '../../types';

const googleProvider = new GoogleAuthProvider();

// Add scopes for additional user info
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Set custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    // Check if we're in development
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';

    // Try popup first
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return handleGoogleSignIn(result);
    } catch (error: any) {
      console.error('Popup error:', error);
      
      // If unauthorized domain in development, show helpful message
      if (error.code === 'auth/unauthorized-domain' && isDevelopment) {
        throw new Error(
          'Please add localhost to authorized domains in Firebase Console:\n' +
          '1. Go to Firebase Console\n' +
          '2. Select your project\n' +
          '3. Go to Authentication > Sign-in method\n' +
          '4. Edit Google provider\n' +
          '5. Add localhost to authorized domains'
        );
      }
      
      // If popup blocked, fallback to redirect
      if (error.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, googleProvider);
        return null; // Will be handled by getRedirectResult
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const handleGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      return handleGoogleSignIn(result);
    }
    return null;
  } catch (error) {
    console.error('Error handling Google redirect:', error);
    throw error;
  }
};

const handleGoogleSignIn = async (result: any) => {
  const { user: firebaseUser } = result;
  
  // Check if user exists in our database
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  
  if (!userDoc.exists()) {
    // Create new user document if first time
    const userData = {
      email: firebaseUser.email,
      username: firebaseUser.displayName,
      role: 'CLIENT',
      verified: firebaseUser.emailVerified,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    return { ...userData, id: firebaseUser.uid };
  }

  return {
    ...userDoc.data(),
    id: firebaseUser.uid,
  } as User;
};

export const signUp = async (
  email: string,
  password: string,
  username: string,
  role: User['role']
) => {
  try {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(firebaseUser, { displayName: username });
    
    const userData = {
      email,
      username,
      role,
      verified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    await sendEmailVerification(firebaseUser);
    
    return { ...userData, id: firebaseUser.uid };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    
    return {
      ...userDoc.data(),
      id: firebaseUser.uid,
    } as User;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};