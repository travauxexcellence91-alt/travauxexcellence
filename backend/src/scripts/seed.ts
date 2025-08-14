import { config } from 'dotenv';
config();

import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../lib/database.js';
import { User } from '../models/User.js';
import { Sector } from '../models/Sector.js';

async function run() {
  await connectToDatabase();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const hash = await bcrypt.hash(adminPassword, 10);
    admin = await User.create({ email: adminEmail, passwordHash: hash, role: 'admin' });
    // eslint-disable-next-line no-console
    console.log(`Created admin: ${adminEmail}`);
  } else {
    // eslint-disable-next-line no-console
    console.log('Admin already exists');
  }
  if (admin.isSuspended) {
    admin.isSuspended = false;
    await admin.save();
    // eslint-disable-next-line no-console
    console.log('Admin unsuspended');
  }

  const defaultSectors = [
    { name: 'Peinture', icon: 'paint' },
    { name: 'Plomberie', icon: 'pipe' },
    { name: 'Électricité', icon: 'bolt' },
    { name: 'Maçonnerie', icon: 'bricks' },
    { name: 'Carrelage', icon: 'grid' },
    { name: 'Toiture', icon: 'roof' },
    { name: 'Chauffage', icon: 'fire' },
    { name: 'Jardin / Espaces verts', icon: 'leaf' },
  ];

  for (const sector of defaultSectors) {
    const exists = await Sector.findOne({ name: sector.name });
    if (!exists) {
      await Sector.create(sector);
      // eslint-disable-next-line no-console
      console.log(`Created sector: ${sector.name}`);
    }
  }

  // eslint-disable-next-line no-console
  console.log('Seed completed');
  process.exit(0);
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
}); 