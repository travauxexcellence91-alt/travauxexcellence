import { Schema, Types, model } from 'mongoose';

export interface ProjectFileDocument {
  _id: any;
  project: Types.ObjectId;
  url: string;
  publicId: string;
  mimeType?: string;
  createdAt: Date;
}

const projectFileSchema = new Schema<ProjectFileDocument>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  mimeType: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

export const ProjectFile = model<ProjectFileDocument>('ProjectFile', projectFileSchema); 