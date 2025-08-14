import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User.js';
import { ArtisanProfile } from '../models/ArtisanProfile.js';
import { ClientProfile } from '../models/ClientProfile.js';
import { fetchCompanyBySiret } from '../services/sirene.service.js';

function sign(userId: string, role: 'artisan' | 'client' | 'admin') {
  const secret = process.env.JWT_SECRET || '';
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.sign({ userId, role }, secret, { expiresIn: '7d' });
}

export async function registerArtisan(req: Request, res: Response) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    siret: z.string().length(14),
    companyInfo: z.object({
      companyName: z.string(),
      addressLine1: z.string().optional(),
      city: z.string().optional(),
      postalCode: z.string().optional(),
    }).optional(),
    sectorIds: z.array(z.string()).min(1, 'Au moins un secteur doit être sélectionné'),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const { email, password, siret, companyInfo, sectorIds } = parsed.data;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash: hash, role: 'artisan' });

  // Utiliser les informations de l'entreprise fournies ou les récupérer via l'API
  let company = companyInfo;
  if (!company) {
    try {
      company = await fetchCompanyBySiret(siret);
    } catch (error) {
      // Si l'API échoue, on continue avec des valeurs par défaut
      company = { companyName: 'Entreprise' };
    }
  }

  await ArtisanProfile.create({
    user: user._id,
    siret,
    companyName: company.companyName,
    addressLine1: company.addressLine1,
    city: company.city,
    postalCode: company.postalCode,
    sectors: sectorIds,
  });

  const token = sign(String(user._id), 'artisan');
  return res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
}

export async function registerClient(req: Request, res: Response) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    city: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
  const { email, password, firstName, lastName, city } = parsed.data;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash: hash, role: 'client' });
  await ClientProfile.create({ user: user._id, firstName, lastName, city });

  const token = sign(String(user._id), 'client');
  return res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
}

export async function login(req: Request, res: Response) {
  const schema = z.object({ email: z.string().email(), password: z.string() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.isSuspended) return res.status(403).json({ message: 'Account suspended' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = sign(String(user._id), user.role);
  return res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
}

export async function searchCompany(req: Request, res: Response) {
  const { siret } = req.query;
  
  if (!siret || typeof siret !== 'string') {
    return res.status(400).json({ message: 'SIRET parameter is required' });
  }

  if (!/^\d{14}$/.test(siret)) {
    return res.status(400).json({ message: 'SIRET must be exactly 14 digits' });
  }

  try {
    const company = await fetchCompanyBySiret(siret);
    return res.json(company);
  } catch (error: any) {
    if (error.message === 'SIRET not found') {
      return res.status(404).json({ message: 'SIRET not found' });
    }
    console.error('SIRENE API error:', error);
    return res.status(500).json({ message: 'Error searching company' });
  }
} 