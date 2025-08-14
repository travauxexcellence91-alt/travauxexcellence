import { Schema, Types, model } from 'mongoose';

export type TransactionType = 'LEAD_PURCHASE';
export type TransactionStatus = 'SUCCEEDED' | 'REFUNDED';

export interface TransactionDocument {
  _id: any;
  user: Types.ObjectId; // User (artisan)
  project: Types.ObjectId; // Project
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<TransactionDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['LEAD_PURCHASE'], required: true },
  status: { type: String, enum: ['SUCCEEDED', 'REFUNDED'], default: 'SUCCEEDED' },
}, { timestamps: true });

transactionSchema.index({ user: 1, project: 1, type: 1 });

export const Transaction = model<TransactionDocument>('Transaction', transactionSchema); 