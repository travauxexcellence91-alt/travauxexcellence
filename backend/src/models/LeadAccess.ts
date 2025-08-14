import { Schema, Types, model } from 'mongoose';

export interface LeadAccessDocument {
  _id: any;
  project: Types.ObjectId; // Project
  artisan: Types.ObjectId; // ArtisanProfile
  grantedAt: Date;
}

const leadAccessSchema = new Schema<LeadAccessDocument>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  artisan: { type: Schema.Types.ObjectId, ref: 'ArtisanProfile', required: true, index: true },
  grantedAt: { type: Date, default: () => new Date() },
});

leadAccessSchema.index({ project: 1, artisan: 1 }, { unique: true });

export const LeadAccess = model<LeadAccessDocument>('LeadAccess', leadAccessSchema); 