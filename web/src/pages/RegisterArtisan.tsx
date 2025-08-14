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
    'Peinture',
    'Plomberie',
    'Électricité',
    'Maçonnerie',
    'Rénovation',
    'Jardinage'
  ];

  const toggleSector = (sector: string) => {
    setSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
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
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                <div className="grid grid-cols-2 gap-2">
                  {availableSectors.map((sector) => (
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
      
      <Footer />
    </div>
  );
} 