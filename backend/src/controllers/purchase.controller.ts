import { Request, Response } from 'express';
import { z } from 'zod';
import { ArtisanProfile } from '../models/ArtisanProfile.js';
import { Project } from '../models/Project.js';
import { LeadAccess } from '../models/LeadAccess.js';
import { Transaction } from '../models/Transaction.js';

export async function purchaseLead(req: Request, res: Response) {
  const bodySchema = z.object({ amount: z.number().positive().optional() });
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const { id } = req.params;

  const artisan = await ArtisanProfile.findOne({ user: userId });
  if (!artisan) return res.status(400).json({ message: 'Artisan profile not found' });

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: 'Lead not found' });
  if (project.status === 'SOLD') return res.status(409).json({ message: 'Lead already sold' });

  const amount = parsed.data.amount ?? (project.price ?? 0);

  project.status = 'SOLD';
  project.reservedBy = artisan._id;
  await project.save();

  await LeadAccess.updateOne({ project: project._id, artisan: artisan._id }, { $setOnInsert: { project: project._id, artisan: artisan._id } }, { upsert: true });

  await Transaction.create({ user: artisan.user, project: project._id, amount, type: 'LEAD_PURCHASE', status: 'SUCCEEDED' });

  res.json({ ok: true, projectId: project._id, amount });
} 