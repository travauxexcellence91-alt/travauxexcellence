import { Router } from 'express';
import multer from 'multer';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { configureCloudinary } from '../lib/cloudinary.js';
import { ArtisanProfile } from '../models/ArtisanProfile.js';
import { Project } from '../models/Project.js';
import { ProjectFile } from '../models/ProjectFile.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/artisan/logo', requireAuth, requireRole('artisan'), upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Missing file' });
  const cloudinary = configureCloudinary();
  const profile = await ArtisanProfile.findOne({ user: req.user!.userId });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });

  const uploaded = await cloudinary.uploader.upload_stream({ folder: 'travaux/logos' }, async (error, result) => {
    if (error || !result) return res.status(500).json({ message: 'Upload failed' });
    profile.logoUrl = result.secure_url;
    await profile.save();
    res.json({ url: result.secure_url, publicId: result.public_id });
  });
  // @ts-ignore
  uploaded.end(req.file.buffer);
});

router.post('/projects/:id/files', requireAuth, requireRole('client'), upload.array('files', 5), async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const cloudinary = configureCloudinary();
  const results: any[] = [];

  const tasks = (req.files as Express.Multer.File[]).map(file => new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'travaux/projects' }, async (error, result) => {
      if (!error && result) {
        await ProjectFile.create({ project: project._id, url: result.secure_url, publicId: result.public_id, mimeType: file.mimetype });
        results.push({ url: result.secure_url, publicId: result.public_id });
      }
      resolve(null);
    });
    // @ts-ignore
    stream.end(file.buffer);
  }));

  await Promise.all(tasks);
  res.json({ files: results });
});

export default router; 