import { Schema, Types, model } from 'mongoose';

export interface ArtisanProfileDocument {
  _id: any;
  user: Types.ObjectId;
  siret: string;
  companyName: string;
  addressLine1?: string;
  city?: string;
  postalCode?: string;
  logoUrl?: string;
  sectors: Types.ObjectId[]; // refs Sector
  createdAt: Date;
  updatedAt: Date;
}

const artisanProfileSchema = new Schema<ArtisanProfileDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  siret: { type: String, required: true, index: true },
  companyName: { type: String, required: true },
  addressLine1: { type: String },
  city: { type: String },
  postalCode: { type: String },
  logoUrl: { type: String },
  sectors: [{ type: Schema.Types.ObjectId, ref: 'Sector' }],
}, { timestamps: true });

export const ArtisanProfile = model<ArtisanProfileDocument>('ArtisanProfile', artisanProfileSchema); 