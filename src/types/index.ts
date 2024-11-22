export type UserRole = 'MODEL' | 'CLIENT' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  services?: string[];
  rates?: {
    hourly?: number;
    daily?: number;
  };
  profileImage?: string;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Ad {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  status: 'PENDING' | 'ACTIVE' | 'REJECTED';
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  modelId: string;
  clientId: string;
  startDate: Date;
  endDate: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentMethod: string;
  createdAt: Date;
}