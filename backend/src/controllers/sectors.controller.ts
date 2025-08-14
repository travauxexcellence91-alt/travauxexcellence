import { Request, Response } from 'express';
import { z } from 'zod';
import { Sector } from '../models/Sector.js';

export async function listSectors(_req: Request, res: Response) {
  const sectors = await Sector.find().sort({ name: 1 }).lean();
  res.json(sectors);
}

export async function createSector(req: Request, res: Response) {
  const schema = z.object({ name: z.string().min(1), icon: z.string().optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const sector = await Sector.create(parsed.data);
  res.status(201).json(sector);
}

export async function updateSector(req: Request, res: Response) {
  const schema = z.object({ name: z.string().min(1).optional(), icon: z.string().optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const sector = await Sector.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!sector) return res.status(404).json({ message: 'Not found' });
  res.json(sector);
}

export async function deleteSector(req: Request, res: Response) {
  const sector = await Sector.findByIdAndDelete(req.params.id);
  if (!sector) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
} 