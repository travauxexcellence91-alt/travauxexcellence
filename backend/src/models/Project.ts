import { Schema, Types, model } from 'mongoose';

export type ProjectStatus = 'NEW' | 'RESERVED' | 'SOLD' | 'CLOSED';

export interface ProjectDocument {
  _id: any;
  client: Types.ObjectId; // ClientProfile
  title: string;
  description: string;
  city?: string;
  sectors: Types.ObjectId[]; // Sector[]
  status: ProjectStatus;
  price?: number | null;
  reservedBy?: Types.ObjectId | null; // ArtisanProfile
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>({
  client: { type: Schema.Types.ObjectId, ref: 'ClientProfile', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String },
  sectors: [{ type: Schema.Types.ObjectId, ref: 'Sector', required: true }],
  status: { type: String, enum: ['NEW', 'RESERVED', 'SOLD', 'CLOSED'], default: 'NEW' },
  price: { type: Number, default: null },
  reservedBy: { type: Schema.Types.ObjectId, ref: 'ArtisanProfile', default: null },
}, { timestamps: true });

export const Project = model<ProjectDocument>('Project', projectSchema); 