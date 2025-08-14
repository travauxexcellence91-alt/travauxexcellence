import { Request, Response } from 'express';
import { z } from 'zod';
import { Project } from '../models/Project.js';
import { ClientProfile } from '../models/ClientProfile.js';
import { ArtisanProfile } from '../models/ArtisanProfile.js';
import { LeadAccess } from '../models/LeadAccess.js';
import { emitLeadNew, emitLeadReserved } from '../lib/realtime.js';
import { sendEmail } from '../lib/notify.js';
import { User } from '../models/User.js';

export async function createProject(req: Request, res: Response) {
  const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    city: z.string().optional(),
    sectorIds: z.array(z.string()).min(1),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const client = await ClientProfile.findOne({ user: userId });
  if (!client) return res.status(400).json({ message: 'Client profile not found' });

  const project = await Project.create({
    client: client._id,
    title: parsed.data.title,
    description: parsed.data.description,
    city: parsed.data.city,
    sectors: parsed.data.sectorIds,
    status: 'NEW',
  });

  emitLeadNew(parsed.data.sectorIds, { id: project._id, title: project.title, city: project.city });

  // Notify artisans by email (simple broadcast per sector)
  const artisans = await ArtisanProfile.find({ sectors: { $in: parsed.data.sectorIds } }).lean();
  const artisanUsers = await User.find({ _id: { $in: artisans.map(a => a.user) } }).lean();
  const recipients = artisanUsers.map(u => u.email).filter(Boolean);
  if (recipients.length && process.env.SMTP_HOST) {
    await Promise.allSettled(recipients.map(email => sendEmail(email, 'Nouveau lead disponible', `${project.title} - ${project.city || ''}`)));
  }

  res.status(201).json(project);
}

export async function listLeadsForArtisan(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const artisan = await ArtisanProfile.findOne({ user: userId });
  if (!artisan) return res.status(400).json({ message: 'Artisan profile not found' });

  const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '20'), 10) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const city = typeof req.query.city === 'string' && req.query.city.trim() ? req.query.city.trim() : undefined;
  
  // Gestion des sectorIds (peut être un seul ou un tableau)
  let sectorIds: string[] = [];
  if (req.query.sectorIds) {
    if (Array.isArray(req.query.sectorIds)) {
      sectorIds = req.query.sectorIds as string[];
    } else {
      sectorIds = [req.query.sectorIds as string];
    }
  }

  const match: any = { status: 'NEW' };
  
  // Si des secteurs spécifiques sont demandés, les utiliser, sinon utiliser tous les secteurs de l'artisan
  if (sectorIds.length > 0) {
    // Vérifier que les secteurs demandés font partie des secteurs de l'artisan
    const validSectorIds = sectorIds.filter(id => artisan.sectors.includes(id));
    if (validSectorIds.length === 0) {
      return res.json({ items: [], page, limit, total: 0 });
    }
    match.sectors = { $in: validSectorIds };
  } else {
    match.sectors = { $in: artisan.sectors };
  }
  
  if (city) match.city = { $regex: city, $options: 'i' };

  const [total, items] = await Promise.all([
    Project.countDocuments(match),
    Project.aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $lookup: { from: 'projectfiles', localField: '_id', foreignField: 'project', as: 'files' } },
      { $addFields: { thumbnailUrl: { $arrayElemAt: ['$files.url', 0] } } },
      { $lookup: { from: 'clientprofiles', localField: 'client', foreignField: '_id', as: 'clientProfile' } },
      { $addFields: { 
        client: { $arrayElemAt: ['$clientProfile', 0] },
        thumbnailUrl: { $arrayElemAt: ['$files.url', 0] } 
      }},
      { $project: { files: 0, clientProfile: 0 } },
    ]),
  ]);

  res.json({ items, page, limit, total });
}

export async function reserveLead(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.params;
  const artisan = await ArtisanProfile.findOne({ user: userId });
  if (!artisan) return res.status(400).json({ message: 'Artisan profile not found' });

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: 'Lead not found' });
  if (project.status !== 'NEW') return res.status(409).json({ message: 'Lead not available' });

  project.status = 'RESERVED';
  project.reservedBy = artisan._id;
  await project.save();

  await LeadAccess.create({ project: project._id, artisan: artisan._id });
  emitLeadReserved(project.sectors.map(String), { id: project._id });

  // Notify artisan who reserved (confirmation)
  const user = await User.findById(artisan.user).lean();
  if (user?.email && process.env.SMTP_HOST) {
    await sendEmail(user.email, 'Lead réservé', `${project.title} réservé avec succès`);
  }

  res.json({ ok: true, projectId: project._id });
}

export async function listMyLeads(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const artisan = await ArtisanProfile.findOne({ user: userId });
  if (!artisan) return res.status(400).json({ message: 'Artisan profile not found' });

  const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '20'), 10) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const city = typeof req.query.city === 'string' && req.query.city.trim() ? req.query.city.trim() : undefined;

  // Récupérer les accès de l'artisan
  const accesses = await LeadAccess.find({ artisan: artisan._id }).lean();
  const projectIds = accesses.map(a => a.project);

  if (projectIds.length === 0) {
    return res.json({ items: [], page, limit, total: 0 });
  }

  const match: any = { _id: { $in: projectIds } };
  if (city) match.city = { $regex: city, $options: 'i' };

  const [total, items] = await Promise.all([
    Project.countDocuments(match),
    Project.aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $lookup: { from: 'projectfiles', localField: '_id', foreignField: 'project', as: 'files' } },
      { $addFields: { thumbnailUrl: { $arrayElemAt: ['$files.url', 0] } } },
      { $lookup: { from: 'clientprofiles', localField: 'client', foreignField: '_id', as: 'clientProfile' } },
      { $addFields: { 
        client: { $arrayElemAt: ['$clientProfile', 0] },
        thumbnailUrl: { $arrayElemAt: ['$files.url', 0] } 
      }},
      { $project: { files: 0, clientProfile: 0 } },
    ]),
  ]);

  res.json({ items, page, limit, total });
}

export async function listMyProjects(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const client = await ClientProfile.findOne({ user: userId });
  if (!client) return res.status(404).json({ message: 'Client profile not found' });

  const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '20'), 10) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const status = typeof req.query.status === 'string' && req.query.status.trim() ? req.query.status.trim() : undefined;

  const match: any = { client: client._id };
  if (status) match.status = status;

  const [total, items] = await Promise.all([
    Project.countDocuments(match),
    Project.aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $lookup: { from: 'projectfiles', localField: '_id', foreignField: 'project', as: 'files' } },
      { $addFields: { thumbnailUrl: { $arrayElemAt: ['$files.url', 0] } } },
      { $project: { files: 0 } },
    ]),
  ]);

  res.json({ items, page, limit, total });
}

export async function getProjectDetails(req: Request, res: Response) {
  const { id } = req.params;
  const project = await Project.findById(id).populate('sectors').lean();
  if (!project) return res.status(404).json({ message: 'Not found' });

  const role = req.user!.role;
  if (role === 'client') {
    const client = await ClientProfile.findOne({ user: req.user!.userId });
    if (!client || String(client._id) !== String(project.client)) return res.status(403).json({ message: 'Forbidden' });
    return res.json(project);
  }
  if (role === 'artisan') {
    const artisan = await ArtisanProfile.findOne({ user: req.user!.userId });
    const access = await LeadAccess.findOne({ project: project._id, artisan: artisan?._id });
    if (!access) return res.status(403).json({ message: 'Forbidden' });
    return res.json(project);
  }
  return res.json(project);
} 