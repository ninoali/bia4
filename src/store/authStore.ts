import { create } from 'zustand';
import { User } from '../types';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, token: null });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
}));