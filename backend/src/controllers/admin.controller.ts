import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { ArtisanProfile } from '../models/ArtisanProfile.js';
import { ClientProfile } from '../models/ClientProfile.js';
import { Project } from '../models/Project.js';
import { z } from 'zod';
import { Transaction } from '../models/Transaction.js';

function parsePageLimit(req: Request) {
  const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '20'), 10) || 20, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export async function listUsers(req: Request, res: Response) {
  const { page, limit, skip } = parsePageLimit(req);
  const q = typeof req.query.q === 'string' && req.query.q.trim() ? req.query.q.trim() : undefined;
  const role = typeof req.query.role === 'string' && req.query.role.trim() ? req.query.role.trim() : undefined;
  const suspended = typeof req.query.suspended === 'string' ? req.query.suspended : undefined;

  const filter: any = {};
  if (q) filter.email = { $regex: q, $options: 'i' };
  if (role) filter.role = role;
  if (suspended === 'true') filter.isSuspended = true;
  if (suspended === 'false') filter.isSuspended = { $ne: true };

  const [total, items] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).select('email role isSuspended createdAt').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  ]);
  res.json({ items, page, limit, total });
}

export async function toggleUserSuspension(req: Request, res: Response) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  user.isSuspended = !user.isSuspended;
  await user.save();
  res.json({ id: user._id, isSuspended: user.isSuspended });
}

export async function getUserDetails(req: Request, res: Response) {
  const user = await User.findById(req.params.id).lean();
  if (!user) return res.status(404).json({ message: 'Not found' });
  const artisan = await ArtisanProfile.findOne({ user: user._id }).lean();
  const client = await ClientProfile.findOne({ user: user._id }).lean();
  res.json({ user, artisan, client });
}

export async function listProjects(req: Request, res: Response) {
  const { page, limit, skip } = parsePageLimit(req);
  const status = typeof req.query.status === 'string' && req.query.status.trim() ? req.query.status.trim() : undefined;
  const city = typeof req.query.city === 'string' && req.query.city.trim() ? req.query.city.trim() : undefined;
  const sectorId = typeof req.query.sectorId === 'string' && req.query.sectorId.trim() ? req.query.sectorId.trim() : undefined;

  const filter: any = {};
  if (status) filter.status = status;
  if (city) filter.city = { $regex: city, $options: 'i' };
  if (sectorId) filter.sectors = sectorId;

  const [total, items] = await Promise.all([
    Project.countDocuments(filter),
    Project.find(filter).populate('sectors').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  ]);
  res.json({ items, page, limit, total });
}

export async function updateProject(req: Request, res: Response) {
  const schema = z.object({
    status: z.enum(['NEW', 'RESERVED', 'SOLD', 'CLOSED']).optional(),
    price: z.number().nonnegative().nullable().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const project = await Project.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json(project);
}

export async function deleteProject(req: Request, res: Response) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
}

export async function getStats(_req: Request, res: Response) {
  const [totalLeads, soldLeads, activeArtisans, revenueAgg] = await Promise.all([
    Project.countDocuments({}),
    Project.countDocuments({ status: 'SOLD' }),
    ArtisanProfile.countDocuments({}),
    Project.aggregate([
      { $match: { status: 'SOLD', price: { $ne: null } } },
      { $group: { _id: null, total: { $sum: '$price' } } },
      { $project: { _id: 0, total: 1 } },
    ]),
  ]);

  const revenue = revenueAgg[0]?.total || 0;
  res.json({ totalLeads, soldLeads, activeArtisans, revenue });
}

export async function listTransactions(req: Request, res: Response) {
  const { page, limit, skip } = parsePageLimit(req);
  const status = typeof req.query.status === 'string' && req.query.status.trim() ? req.query.status.trim() : undefined;
  const email = typeof req.query.email === 'string' && req.query.email.trim() ? req.query.email.trim() : undefined;

  const filter: any = {};
  if (status) filter.status = status;

  // Build query with populate match on user email if provided
  const query = Transaction.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
    .populate({ path: 'user', select: 'email', match: email ? { email: { $regex: email, $options: 'i' } } : {} })
    .populate({ path: 'project', select: 'title' });

  const [total, items] = await Promise.all([
    Transaction.countDocuments(filter),
    query.lean(),
  ]);

  // Filter out entries where user didn't match email (populate match yields null)
  const filteredItems = email ? items.filter((i: any) => i.user) : items;
  res.json({ items: filteredItems, page, limit, total: email ? filteredItems.length : total });
}

export async function refundTransaction(req: Request, res: Response) {
  const tx = await Transaction.findById(req.params.id);
  if (!tx) return res.status(404).json({ message: 'Not found' });
  tx.status = 'REFUNDED';
  await tx.save();
  res.json({ ok: true });
} 