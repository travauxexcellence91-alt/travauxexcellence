import { Request, Response } from 'express';
import { ArtisanProfile } from '../models/ArtisanProfile.js';
import { ClientProfile } from '../models/ClientProfile.js';
import { z } from 'zod';

export async function getMe(req: Request, res: Response) {
  const role = req.user!.role;
  if (role === 'artisan') {
    const profile = await ArtisanProfile.findOne({ user: req.user!.userId }).populate('sectors').lean();
    return res.json({ role, profile });
  }
  if (role === 'client') {
    const profile = await ClientProfile.findOne({ user: req.user!.userId }).lean();
    return res.json({ role, profile });
  }
  return res.json({ role: 'admin' });
}

export async function updateArtisanProfile(req: Request, res: Response) {
  const schema = z.object({
    companyName: z.string().min(1).optional(),
    addressLine1: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    logoUrl: z.string().url().optional(),
    sectorIds: z.array(z.string()).optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

  const profile = await ArtisanProfile.findOne({ user: req.user!.userId });
  if (!profile) return res.status(404).json({ message: 'Artisan profile not found' });

  const { sectorIds, ...rest } = parsed.data;
  Object.assign(profile, rest);
  if (sectorIds) profile.sectors = sectorIds as any;
  await profile.save();

  const populated = await profile.populate('sectors');
  res.json(populated);
}

export async function updateClientProfile(req: Request, res: Response) {
  const schema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    city: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

  const profile = await ClientProfile.findOne({ user: req.user!.userId });
  if (!profile) return res.status(404).json({ message: 'Client profile not found' });

  Object.assign(profile, parsed.data);
  await profile.save();
  res.json(profile);
} 