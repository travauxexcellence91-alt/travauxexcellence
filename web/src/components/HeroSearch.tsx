import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, findCategoryByName } from '../config/categories';

const fallbackCategories: string[] = [
  'Peinture intérieure',
  "Entretien de jardin et d'espaces verts",
  'Climatisation',
  'Rénovation appartement, maison (et autres bâtiments)',
  'Petits travaux de maçonnerie',
  "Pose ou rénovation d'un carrelage",
  'Plomberie (réparation ou installation)',
  'Electricité (réparation ou installation)',
  'Parquet (pose, rénovation)',
  'Isolation',
  'Toiture (réparation ou rénovation)',
  'Menuiserie',
];

export default function HeroSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  // Mode 100% local: plus d'appel API

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const names = categories.map((c) => c.name);
    if (!q) return names;
    return names.filter((c) => c.toLowerCase().includes(q));
  }, [query]);

  const submit = (category?: string) => {
    const value = category ?? query.trim();
    if (!value) return;
    const def = findCategoryByName(value);
    if (def) {
      navigate(`/publish?categorySlug=${encodeURIComponent(def.slug)}`);
    } else {
      navigate(`/publish?category=${encodeURIComponent(value)}`);
    }
  };

  return (
    <section className="rounded-lg border overflow-hidden bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-purple-900 text-white p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6">Quel est votre projet ?</h2>
          <div className="relative w-full max-w-xl">
            <div className="flex items-stretch rounded-md ring-1 ring-purple-500 focus-within:ring-2 focus-within:ring-purple-400 overflow-hidden bg-white">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                placeholder="Par exemple : peinture"
                className="flex-1 px-4 py-3 text-sm text-gray-900 outline-none"
              />
              <button
                onClick={() => submit()}
                className="px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium"
                aria-label="Rechercher"
              >
                →
              </button>
            </div>
            {open && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-md border shadow-lg max-h-72 overflow-auto z-10">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 sticky top-0 bg-white border-b">Services les plus demandés</div>
                <ul className="divide-y text-gray-900">
                  {filtered.slice(0, 20).map((c) => (
                    <li key={c}>
                      <button
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-900"
                        onClick={() => submit(c)}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="relative h-56 md:h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent z-10"></div>
          <div className="absolute inset-0 flex items-center z-20">
            <div className="px-6 md:px-10 text-white">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Trouvez l'artisan idéal pour vos travaux
              </h1>
              <p className="text-sm md:text-base text-purple-100 opacity-90">
                Des professionnels qualifiés et recommandés près de chez vous
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop"
            alt="Artisan au travail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}


