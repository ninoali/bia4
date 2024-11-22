import { User } from './user';

export type AdStatus = 'PENDING' | 'ACTIVE' | 'REJECTED' | 'EXPIRED';
export type AdTier = 'BASIC' | 'PRIME' | 'TOP' | 'PREMIUM';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type BookingType = 'INSTANT' | 'MANUAL';

export interface AdImage {
  id: string;
  url: string;
  isPrimary: boolean;
  type: 'PROFILE' | 'VERIFICATION' | 'GALLERY';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface Location {
  city: string;
  area?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
}

export interface Availability {
  id: string;
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
}

export interface AdPackage {
  tier: AdTier;
  duration: 7 | 15 | 30;
  price: number;
  features: string[];
  callMultiplier: number;
  position: 'top' | 'premium' | 'standard';
  boosts: {
    manual: number;
    unlimited: boolean;
  };
  cityChanges: {
    unlimited: boolean;
    count?: number;
  };
}

export interface Advertisement {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: AdImage[];
  services: Service[];
  location: Location;
  availability: Availability[];
  package: AdPackage;
  status: AdStatus;
  verificationStatus: VerificationStatus;
  bookingType: BookingType;
  pricing: {
    incall?: number;
    outcall?: number;
  };
  contact: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  stats: {
    views: number;
    calls: number;
    bookings: number;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}