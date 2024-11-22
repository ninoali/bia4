import { User } from './user';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
export type BookingType = 'INCALL' | 'OUTCALL';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

export interface LocationDetails {
  address: string;
  postcode: string;
  city: string;
  latitude: number;
  longitude: number;
  directions: DirectionImage[];
  verificationStatus: VerificationStatus;
}

export interface DirectionImage {
  id: string;
  url: string;
  order: number;
}

export interface BookingSettings {
  enabled: boolean;
  instantBooking: boolean;
  deposit: {
    required: boolean;
    amount: {
      incall: number;
      outcall: number;
    };
  };
  schedule: DaySchedule[];
  location: LocationDetails;
  contactVerified: boolean;
}

export interface Booking {
  id: string;
  modelId: string;
  clientId: string;
  date: string;
  timeSlot: TimeSlot;
  type: BookingType;
  status: BookingStatus;
  deposit: {
    amount: number;
    paid: boolean;
    transactionId?: string;
  };
  location: LocationDetails;
  createdAt: string;
  updatedAt: string;
}