import { User } from './index';

export type AdStatus = 'DRAFT' | 'PENDING' | 'ACTIVE' | 'REJECTED' | 'EXPIRED';
export type AdTier = 'BASIC' | 'FEATURED' | 'PREMIUM';

export interface Advertisement {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: AdImage[];
  status: AdStatus;
  tier: AdTier;
  price: number;
  location: string;
  services: string[];
  availability: {
    start: string;
    end: string;
  };
  contact: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  stats: {
    views: number;
    clicks: number;
    favorites: number;
  };
  featured: boolean;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface AdImage {
  id: string;
  url: string;
  isPrimary: boolean;
  order: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface AdPricing {
  tier: AdTier;
  price: number;
  features: string[];
  duration: number; // in days
}

export interface AdStats {
  views: number;
  uniqueViews: number;
  clicks: number;
  inquiries: number;
  bookings: number;
  periodStart: string;
  periodEnd: string;
}