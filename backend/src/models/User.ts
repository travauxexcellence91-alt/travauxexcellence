import { Schema, model } from 'mongoose';

export type UserRole = 'artisan' | 'client' | 'admin';

export interface UserDocument {
  _id: any;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  isSuspended?: boolean;
  emailVerifiedAt?: Date | null;
  phoneVerifiedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['artisan', 'client', 'admin'], required: true },
  isSuspended: { type: Boolean, default: false },
  emailVerifiedAt: { type: Date },
  phoneVerifiedAt: { type: Date },
}, { timestamps: true });

export const User = model<UserDocument>('User', userSchema); 