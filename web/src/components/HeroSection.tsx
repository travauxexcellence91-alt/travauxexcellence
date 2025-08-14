import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../config/categories';

export default function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const dropdownDesktopRef = useRef<HTMLDivElement>(null);
  const dropdownMobileRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Utiliser les catégories du fichier de configuration
  const categoryNames = categories.map(cat => cat.name);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (dropdownDesktopRef.current && !dropdownDesktopRef.current.contains(event.target as Node)) &&
        (dropdownMobileRef.current && !dropdownMobileRef.current.contains(event.target as Node)) &&
        (inputRef.current && !inputRef.current.contains(event.target as Node))
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtrage des catégories
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categoryNames;
    return categoryNames.filter((c) => c.toLowerCase().includes(q));
  }, [query, categoryNames]);

  const submit = (category?: string) => {
    const value = category ?? query.trim();
    if (!value) return;
    
    // Trouver la catégorie correspondante pour obtenir le slug
    const foundCategory = categories.find(cat => cat.name === value);
    const categorySlug = foundCategory ? foundCategory.slug : value.toLowerCase().replace(/\s+/g, '-');
    
    // Rediriger vers la page de publication avec la catégorie
    navigate(`/publish?category=${encodeURIComponent(categorySlug)}`);
  };

  return (
    <section className="relative min-h-[420px] md:min-h-[500px] lg:min-h-[600px] bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop"
          alt="Artisan au travail"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full">
        {/* Texte à gauche */}
        <div className="flex-1 text-center lg:text-left px-4 md:px-6 lg:px-8 py-10 md:py-15 lg:py-20">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Titre principal */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Trouvez l'artisan idéal pour vos travaux
            </h1>
            
            {/* Sous-titre */}
            <p className="text-base md:text-lg lg:text-xl text-purple-100 mb-6 md:mb-8 max-w-lg">
              Des professionnels qualifiés et recommandés près de chez vous. 
              Devis gratuit sous 24h.
            </p>
            
            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 lg:py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Commencer un projet
                <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <Link
                to="/register-artisan"
                className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 lg:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-900 transition-all duration-200 text-sm md:text-base lg:text-lg"
              >
                Devenir artisan
              </Link>
            </div>
          </div>
        </div>

        {/* Formulaire de recherche à droite (desktop) */}
        <div className="hidden lg:block flex-1 max-w-md px-8 py-20">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              Quel est votre projet ?
            </h3>
            
            <div className="space-y-4">
              {/* Champ de recherche avec catégories */}
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ex: peinture, plomberie..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setOpen(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
                
                {/* Dropdown des catégories */}
                {open && (
                  <div ref={dropdownDesktopRef} className="absolute left-0 right-0 mt-2 bg-white rounded-lg border shadow-lg max-h-72 overflow-auto z-[9999]">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 sticky top-0 bg-white border-b">
                      Catégories populaires
                    </div>
                    <ul className="divide-y text-gray-900">
                      {filtered.slice(0, 10).map((category, index) => (
                        <li key={index}>
                          <button
                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-900"
                            onClick={() => {
                              submit(category);
                              setOpen(false);
                            }}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => submit()}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Trouver des artisans
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire mobile (affiché sous le texte sur mobile/tablette) */}
      <div className="lg:hidden px-4 md:px-6 pb-10 md:pb-15">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Quel est votre projet ?
          </h3>
          
          <div className="space-y-4">
            {/* Champ de recherche avec catégories */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ex: peinture, plomberie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
              
              {/* Dropdown des catégories mobile */}
              {open && (
                <div ref={dropdownMobileRef} className="absolute left-0 right-0 mb-2 bottom-full bg-white rounded-lg border shadow-lg max-h-80 overflow-y-auto z-[9999]">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 sticky top-0 bg-white border-b">
                    Catégories populaires
                  </div>
                  <ul className="divide-y text-gray-900">
                    {filtered.slice(0, 10).map((category, index) => (
                      <li key={index}>
                        <button
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-900"
                          onClick={() => {
                            submit(category);
                            setOpen(false);
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => submit()}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Trouver des artisans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
