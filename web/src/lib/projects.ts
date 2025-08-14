import { apiFetch } from './api';

const idToFrenchLabel: Record<string, string> = {
  zipcode: 'Code postal',
  surfaces: 'Surfaces à peindre',
  rooms: 'Pièces concernées',
  condition: 'État des surfaces',
  timeline: 'Délai souhaité',
  photos: 'Photos/plans',
  notes: 'Informations supplémentaires',
  category: 'Catégorie',
  service: 'Services demandés',
  'garden-size': 'Surface du jardin',
  'green-waste': 'Évacuation déchets',
  frequency: 'Fréquence',
  scope: 'Type de travaux',
  system: 'Système',
  area: 'Surface',
  'electric-ready': 'Alimentation électrique',
  works: 'Types de travaux',
  budget: 'Budget estimatif',
  type: 'Type de travaux',
  material: 'Matériau',
  dimensions: 'Dimensions',
  location: 'Localisation',
  'tile-size': 'Format carreaux',
  'remove-old': 'Dépose existant',
  urgency: 'Urgence',
  cover: 'Type de couverture',
  'roof-area': 'Surface toiture',
  access: 'Accès',
  length: 'Longueur',
  extras: 'Éléments complémentaires',
  ground: 'Nature du terrain',
};

const slugToSectorName: Record<string, string> = {
  'peinture-interieure': 'Peinture',
  'entretien-jardin-espaces-verts': 'Menuiserie', // fallback proche (à ajuster si un secteur Jardin existe)
  // après seed, on mappe bien sur Jardin / Espaces verts
  // Garder Menuiserie en fallback si le secteur n'existe pas en base
  'climatisation': 'Chauffage',
  'renovation-appartement-maison': 'Maçonnerie',
  'petits-travaux-maconnerie': 'Maçonnerie',
  'carrelage': 'Maçonnerie',
  'petits-travaux-electricite': 'Électricité',
  'petits-travaux-plomberie': 'Plomberie',
  'toiture': 'Toiture',
  'cloture': 'Maçonnerie',
};

export async function submitDraftProject() {
  const raw = sessionStorage.getItem('draftProject');
  if (!raw) return;
  let draft: { category: string; values: Record<string, any> } | null = null;
  try { draft = JSON.parse(raw); } catch { /* ignore */ }
  if (!draft) return;

  // Build minimal title/description from the wizard values
  const title = draft.category.replace(/-/g, ' ');
  const lines: string[] = [];
  for (const [k, v] of Object.entries(draft.values)) {
    if (v == null || v === '' || (Array.isArray(v) && v.length === 0)) continue;
    const label = idToFrenchLabel[k] || k;
    lines.push(`${label}: ${Array.isArray(v) ? v.join(', ') : String(v)}`);
  }
  const description = lines.join('\n');

  // Map category slug to backend Sector ID by name (using /sectors)
  let sectorIds: string[] = [];
  try {
    const sectors = await apiFetch('/sectors');
    const sectorName = slugToSectorName[draft.category] || 'Maçonnerie';
    const found = sectors.find((s: any) => String(s.name).toLowerCase() === sectorName.toLowerCase());
    if (found) sectorIds = [found._id];
  } catch {
    // ignore; will fallback
  }
  if (sectorIds.length === 0) {
    // Fallback to a dummy sector ID is not possible; ensure we have at least a sector via Maçonnerie if present
    try {
      const sectors = await apiFetch('/sectors');
      const found = sectors.find((s: any) => String(s.name).toLowerCase() === 'maçonnerie');
      if (found) sectorIds = [found._id];
    } catch {}
  }

  const body = { title, description: `${description}\n\ncategory:${draft.category}`, city: undefined as string | undefined, sectorIds };
  try {
    await apiFetch('/projects', { method: 'POST', body: JSON.stringify(body) });
    sessionStorage.removeItem('draftProject');
  } catch {
    // keep draft if failed
  }
}


