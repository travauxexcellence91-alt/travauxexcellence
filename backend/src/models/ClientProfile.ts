import { Schema, Types, model } from 'mongoose';

export interface ClientProfileDocument {
  _id: any;
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
}

const clientProfileSchema = new Schema<ClientProfileDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String },
}, { timestamps: true });

export const ClientProfile = model<ClientProfileDocument>('ClientProfile', clientProfileSchema); 