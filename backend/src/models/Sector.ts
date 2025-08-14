import { Schema, model } from 'mongoose';

export interface SectorDocument {
  _id: any;
  name: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sectorSchema = new Schema<SectorDocument>({
  name: { type: String, required: true, unique: true },
  icon: { type: String },
}, { timestamps: true });

export const Sector = model<SectorDocument>('Sector', sectorSchema); 