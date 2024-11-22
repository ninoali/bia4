import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthStore } from '../../store/authStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, setAuth, logout } = useAuthStore();

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
        try {
          if (firebaseUser) {
            const token = await firebaseUser.getIdToken();
            
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              username: firebaseUser.displayName || '',
              role: 'CLIENT' as const,
              verified: firebaseUser.emailVerified,
              createdAt: new Date(firebaseUser.metadata.creationTime || ''),
              updatedAt: new Date(firebaseUser.metadata.lastSignInTime || ''),
            };
            
            setAuth(userData, token);
          } else {
            logout();
          }
        } catch (err) {
          console.error('Auth state change error:', err);
          setError(err instanceof Error ? err : new Error('Authentication error'));
        } finally {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Auth initialization error:', err);
      setError(err instanceof Error ? err : new Error('Authentication initialization error'));
      setLoading(false);
    }
  }, [setAuth, logout]);

  return { user, loading, error };
};