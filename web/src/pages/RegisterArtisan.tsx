import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../lib/toast';
import { API_URL } from '../lib/api';
import Footer from '../components/Footer';

interface CompanyInfo {
  companyName: string;
  addressLine1: string;
  city: string;
  postalCode: string;
}

export default function RegisterArtisan() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [siret, setSiret] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [sectors, setSectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // États pour la validation SIRET
  const [searchingSiret, setSearchingSiret] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [siretValid, setSiretValid] = useState(false);

  const availableSectors = [
    'TCE (Tous Corps d\'État)',
    'Peinture',
    'Plomberie',
    'Électricité',
    'Maçonnerie',
    'Rénovation',
    'Jardinage'
  ];

  const toggleSector = (sector: string) => {
    if (sector === 'TCE (Tous Corps d\'État)') {
      // Si TCE est sélectionné, cocher tous les autres secteurs
      if (sectors.includes('TCE (Tous Corps d\'État)')) {
        // Décocher TCE et tous les autres
        setSectors([]);
      } else {
        // Cocher TCE et tous les autres
        setSectors(availableSectors);
      }
    } else {
      // Logique normale pour les autres secteurs
      setSectors(prev => {
        if (prev.includes(sector)) {
          // Décocher le secteur et aussi TCE s'il était coché
          const newSectors = prev.filter(s => s !== sector && s !== 'TCE (Tous Corps d\'État)');
          return newSectors;
        } else {
          // Cocher le secteur
          const newSectors = [...prev, sector];
          // Vérifier si tous les secteurs (sauf TCE) sont cochés
          const allSectorsExceptTCE = availableSectors.filter(s => s !== 'TCE (Tous Corps d\'État)');
          const allSelected = allSectorsExceptTCE.every(s => newSectors.includes(s));
          
          if (allSelected && !newSectors.includes('TCE (Tous Corps d\'État)')) {
            // Si tous les secteurs sont cochés, cocher automatiquement TCE
            return [...newSectors, 'TCE (Tous Corps d\'État)'];
          }
          return newSectors;
        }
      });
    }
  };

  // Validation et recherche SIRET en temps réel
  const searchCompany = useCallback(async (siretValue: string) => {
    if (siretValue.length !== 14 || !/^\d{14}$/.test(siretValue)) {
      setCompanyInfo(null);
      setSiretValid(false);
      return;
    }

    setSearchingSiret(true);
    try {
      const response = await fetch(`${API_URL}/auth/search-company?siret=${siretValue}`);
      if (response.ok) {
        const data = await response.json();
        setCompanyInfo(data);
        setSiretValid(true);
        showToast('success', 'Entreprise trouvée !');
      } else {
        setCompanyInfo(null);
        setSiretValid(false);
        showToast('error', 'SIRET non trouvé ou invalide');
      }
    } catch (error) {
      setCompanyInfo(null);
      setSiretValid(false);
      showToast('error', 'Erreur lors de la recherche');
    } finally {
      setSearchingSiret(false);
    }
  }, [showToast]);

  // Recherche automatique après saisie du SIRET
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (siret.length === 14) {
        searchCompany(siret);
      } else {
        setCompanyInfo(null);
        setSiretValid(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [siret, searchCompany]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sectors.length === 0) {
      setError('Veuillez sélectionner au moins un secteur d\'activité');
      return;
    }
    
    if (!siretValid) {
      setError('Veuillez saisir un SIRET valide');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/register-artisan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          firstName, 
          lastName, 
          siret,
          companyInfo,
          sectorIds: sectors 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur');
      localStorage.setItem('token', data.token);
      showToast('success', 'Inscription réussie');
      window.location.href = '/artisan/dashboard';
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
              Rejoignez notre réseau d'artisans
            </h1>
            <p className="text-2xl md:text-3xl text-purple-100 mb-4 max-w-3xl mx-auto leading-relaxed">
              Recevez des clients qualifiés chaque semaine
            </p>
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Inscrivez-vous gratuitement et développez votre activité sans perte de temps
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('inscription-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-700 px-8 py-4 text-lg font-bold rounded-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Je m'inscris gratuitement
            </button>
            <p className="text-purple-200 text-sm">
              Inscription en 2 minutes • Aucun engagement
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" id="inscription-form">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Inscription Artisan
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Créez votre compte professionnel
            </p>
          </div>
          
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-red-600 text-sm">{error}</div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Votre prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Votre nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Champ SIRET avec validation */}
              <div>
                <label htmlFor="siret" className="block text-sm font-medium text-gray-700 mb-2">
                  SIRET de l'entreprise *
                </label>
                <div className="relative">
                  <input
                    id="siret"
                    name="siret"
                    type="text"
                    required
                    maxLength={14}
                    className={`w-full border p-3 rounded-lg transition-colors ${
                      siret.length === 14 
                        ? siretValid 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                    placeholder="12345678901234"
                    value={siret}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setSiret(value);
                    }}
                  />
                  {searchingSiret && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="animate-spin h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Saisissez les 14 chiffres du SIRET
                </p>
              </div>

              {/* Affichage des informations de l'entreprise trouvée */}
              {companyInfo && siretValid && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Entreprise trouvée
                  </h3>
                  <div className="text-sm text-green-700 space-y-1">
                    <p><strong>Nom :</strong> {companyInfo.companyName}</p>
                    <p><strong>Adresse :</strong> {companyInfo.addressLine1}</p>
                    <p><strong>Ville :</strong> {companyInfo.city} {companyInfo.postalCode}</p>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Entreprise (optionnel)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Nom de votre entreprise"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Votre ville"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secteurs d'activité *
                </label>
                
                {/* TCE en premier, séparé visuellement */}
                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sectors.includes('TCE (Tous Corps d\'État)')}
                      onChange={() => toggleSector('TCE (Tous Corps d\'État)')}
                      className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                    />
                    <span className="ml-3 text-base font-semibold text-purple-800">
                      TCE (Tous Corps d'État)
                    </span>
                  </label>
                </div>

                {/* Autres secteurs en grille */}
                <div className="grid grid-cols-2 gap-2">
                  {availableSectors.filter(sector => sector !== 'TCE (Tous Corps d\'État)').map((sector) => (
                    <label key={sector} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sectors.includes(sector)}
                        onChange={() => toggleSector(sector)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !siretValid}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Inscription en cours...' : "S'inscrire"}
              </button>
            </div>

            <div className="text-center">
              <a href="/login" className="text-sm text-purple-600 hover:text-purple-500">
                Déjà un compte ? Se connecter
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Section Avatar Client */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              👤 Pourquoi s'inscrire ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque jour, des particuliers recherchent un artisan de confiance dans votre ville.
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
                  Exemple de profil client :
                </h3>
                <blockquote className="text-lg text-gray-700 italic mb-6 p-4 bg-white rounded-lg border-l-4 border-purple-500">
                  "Je cherche un peintre fiable pour rénover mon appartement à budget raisonnable, disponible dès le mois prochain."
                </blockquote>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">
                    ✅ Résultat : Vous gagnez du temps et recevez uniquement des demandes prêtes à être transformées en chantiers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment ça fonctionne */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ⚙️ Comment ça fonctionne ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple en 5 étapes pour développer votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: "📝",
                title: "Inscription rapide",
                description: "Créez votre profil en quelques minutes avec vos spécialités, zone d'intervention et photos de réalisations."
              },
              {
                icon: "📋",
                title: "Réception de leads qualifiés",
                description: "Nos équipes vérifient et valident chaque demande avant de vous la transmettre."
              },
              {
                icon: "🎯",
                title: "Choisissez vos projets",
                description: "Vous restez maître : sélectionnez uniquement les clients qui vous intéressent."
              },
              {
                icon: "💰",
                title: "Transformez vos leads en contrats",
                description: "Rencontrez vos nouveaux clients, signez vos devis, réalisez vos chantiers."
              },
              {
                icon: "🏆",
                title: "Accédez à des chantiers dédiés",
                description: "Les artisans qui acceptent plus de 20 leads bénéficient d'un accès prioritaire à des demandes de chantiers exclusives et personnalisées."
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
              Découvrez pourquoi des centaines d'artisans nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "✅",
                title: "Des leads 100% qualifiés et vérifiés",
                description: "Nous filtrons chaque demande pour ne vous transmettre que les projets sérieux"
              },
              {
                icon: "⏰",
                title: "Zéro perte de temps avec des demandes fantômes",
                description: "Plus de déplacements inutiles, tous nos clients sont pré-qualifiés"
              },
              {
                icon: "📍",
                title: "Une visibilité locale auprès de clients proches de vous",
                description: "Trouvez des chantiers dans votre zone d'intervention habituelle"
              },
              {
                icon: "🎯",
                title: "La liberté de choisir vos projets et vos tarifs",
                description: "Vous restez maître de votre activité et de vos conditions"
              },
              {
                icon: "📅",
                title: "Un carnet de commandes rempli toute l'année",
                description: "Développez votre activité de manière constante et prévisible"
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

          <div className="mt-12 text-center">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 inline-block">
              <p className="text-purple-800 font-semibold text-lg">
                💳 <strong>Achetez vos leads</strong> avec notre paiement sécurisé 3D Secure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💬 Témoignages Artisans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez ce que disent nos artisans inscrits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  👨
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Karim</h4>
                  <p className="text-gray-600">Plombier à Marseille</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic text-lg">
                "Grâce à cette plateforme, j'ai décroché 8 chantiers en 2 mois. Les clients étaient vraiment sérieux, je recommande !"
              </blockquote>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  👩
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sophie</h4>
                  <p className="text-gray-600">Architecte d'intérieur à Paris</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic text-lg">
                "Je n'avais pas le temps de chercher de nouveaux clients. Maintenant je reçois des demandes ciblées, ça me change la vie !"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ❓ FAQ – Réponses aux questions fréquentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tout ce que vous devez savoir avant de vous inscrire
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Combien ça coûte ?",
                answer: "L'inscription est 100% gratuite. Vous ne payez que pour les leads que vous choisissez."
              },
              {
                question: "Puis-je choisir mes clients ?",
                answer: "Oui. Vous êtes totalement libre d'accepter ou refuser une demande."
              },
              {
                question: "Suis-je engagé ?",
                answer: "Non, aucun abonnement obligatoire. Vous êtes libre de votre activité."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
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
            Prêt à trouver vos prochains clients ?
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Inscrivez-vous dès aujourd'hui et recevez vos premiers leads qualifiés directement dans votre boîte mail.
          </p>
          
          <button 
            onClick={() => document.getElementById('inscription-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-purple-700 px-10 py-5 text-xl font-bold rounded-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Je m'inscris gratuitement
          </button>
          
          <p className="mt-6 text-purple-200 text-lg">
            Rejoignez plus de 500 artisans déjà inscrits
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 