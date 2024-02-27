import { Document } from 'mongoose';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export interface User extends Document {
  fullName: string;
  email: string;
  password: string;
  isActive: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
