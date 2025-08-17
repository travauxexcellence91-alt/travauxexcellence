import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useToast } from '../lib/toast';
import { API_URL } from '../lib/api';
import { submitDraftProject } from '../lib/projects';
import { useNavigate } from 'react-router-dom';
import { categories } from '../config/categories';
import Footer from '../components/Footer';

export default function RegisterClient() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // États pour le dropdown des catégories
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Utiliser les catégories du fichier de configuration
  const categoryNames = categories.map(cat => cat.name);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) &&
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/register-client`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, city }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur');
      localStorage.setItem('token', data.token);
      showToast('success', 'Inscription réussie');
      await submitDraftProject();
      window.location.href = '/client/dashboard';
    } catch (err: any) {
      setError(err.message);
      showToast('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trouvez rapidement l'artisan de confiance qu'il vous faut
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Déposez gratuitement votre demande et recevez jusqu'à 3 devis d'artisans qualifiés proches de chez vous.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('inscription-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-700 px-8 py-4 text-lg font-bold rounded-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Déposer ma demande gratuitement
            </button>
            <p className="text-purple-200 text-sm">
              ⚡ Inscription en 2 minutes • Aucun engagement
            </p>
          </div>
        </div>
      </section>

      {/* Section Formulaire "Quel est votre projet ?" */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quel est votre projet ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Décrivez vos travaux et recevez des devis d'artisans qualifiés
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <div className="max-w-2xl mx-auto">
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
                    <div ref={dropdownRef} className="absolute left-0 right-0 mt-2 bg-white rounded-lg border shadow-lg max-h-72 overflow-auto z-[9999]">
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
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Trouver des artisans
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" id="inscription-form">
        <div className="max-w-md w-full space-y-8">
          {/* Header élégant */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Inscription Client
            </h2>
            <p className="text-gray-600 text-base">
              Créez votre compte pour publier vos projets
            </p>
          </div>
          
          {/* Formulaire élégant */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={onSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-base"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Mot de passe */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-base"
                      placeholder="Votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Prénom et Nom sur la même ligne */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-base"
                        placeholder="Votre prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-base"
                        placeholder="Votre nom"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Ville */}
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-base"
                      placeholder="Votre ville"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Bouton d'inscription élégant */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Inscription en cours...
                    </div>
                  ) : (
                    "S'inscrire"
                  )}
                </button>
              </div>

              {/* Lien de connexion élégant */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Déjà un compte ?{' '}
                  <a href="/login" className="font-semibold text-purple-600 hover:text-purple-700 underline decoration-2 underline-offset-2 transition-colors duration-200">
                    Se connecter
                  </a>
                </p>
              </div>
    </form>
          </div>
        </div>
      </div>

      {/* Section Comment ça fonctionne */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              👤 Comment ça fonctionne (pour le client)
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple en 3 étapes pour trouver l'artisan idéal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📝",
                title: "Déposez votre demande",
                description: "En 2 minutes, décrivez vos travaux et votre budget."
              },
              {
                icon: "📋",
                title: "Recevez jusqu'à 3 devis gratuits",
                description: "Nous sélectionnons pour vous les artisans disponibles et qualifiés."
              },
              {
                icon: "🎯",
                title: "Choisissez l'artisan qui vous convient",
                description: "Comparez facilement les devis et sélectionnez celui qui correspond le mieux à vos attentes."
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mx-auto">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ✅ Les avantages pour vous
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez pourquoi des milliers de clients nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🕑",
                title: "Gain de temps",
                description: "Plus besoin de chercher des artisans au hasard"
              },
              {
                icon: "🛠️",
                title: "Des professionnels qualifiés et vérifiés",
                description: "Tous nos artisans sont pré-sélectionnés et recommandés"
              },
              {
                icon: "📍",
                title: "Des artisans proches de chez vous",
                description: "Trouvez des professionnels dans votre zone géographique"
              },
              {
                icon: "📃",
                title: "Jusqu'à 3 devis gratuits et sans engagement",
                description: "Comparez les offres avant de choisir"
              },
              {
                icon: "🔒",
                title: "Transparence et sécurité des échanges",
                description: "Vos données sont protégées et sécurisées"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {benefit.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Exemple concret */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏗️ Exemple concret
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment nos clients trouvent facilement leurs artisans
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  👩
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Témoignage client :
                </h3>
                <blockquote className="text-lg text-gray-700 italic mb-6 p-4 bg-white rounded-lg border-l-4 border-purple-500">
                  "Je voulais refaire ma salle de bain. En 24h j'ai reçu 3 devis d'artisans fiables de ma ville. J'ai pu comparer facilement et choisir le meilleur rapport qualité/prix."
                </blockquote>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">
                    ✅ Résultat : 3 devis en 24h, comparaison facile, choix optimal !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💬 Témoignages Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez ce que disent nos clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  👩
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Claire</h4>
                  <p className="text-gray-600">Lille</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic text-lg">
                "J'ai trouvé un peintre en une journée, sans stress ni recherche compliquée."
              </blockquote>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  👨
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Julien</h4>
                  <p className="text-gray-600">Lyon</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic text-lg">
                "Le site m'a mis en relation avec un artisan sérieux qui a respecté le devis et les délais."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ❓ FAQ – Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tout ce que vous devez savoir avant de déposer votre demande
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Est-ce que c'est gratuit ?",
                answer: "Oui, déposer une demande est 100% gratuit et sans engagement."
              },
              {
                question: "Combien de devis vais-je recevoir ?",
                answer: "Vous recevez jusqu'à 3 devis d'artisans disponibles et qualifiés."
              },
              {
                question: "Puis-je choisir librement mon artisan ?",
                answer: "Bien sûr ! Vous êtes libre de comparer et de choisir celui qui vous convient."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-lg">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action final */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Vos travaux commencent ici
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Déposez votre demande dès aujourd'hui et trouvez rapidement l'artisan qu'il vous faut.
          </p>
          
          <button 
            onClick={() => document.getElementById('inscription-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-purple-700 px-10 py-5 text-xl font-bold rounded-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Déposer ma demande gratuitement
          </button>
          
          <p className="mt-6 text-purple-200 text-lg">
            Rejoignez plus de 2000 clients déjà satisfaits
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 