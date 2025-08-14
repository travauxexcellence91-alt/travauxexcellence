import React, { useState } from 'react';
import HeroSearch from '../components/HeroSearch';
import Footer from '../components/Footer';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Le service est-il vraiment gratuit ?",
      answer: "Oui, demander un devis ne vous engage à rien et reste 100% gratuit."
    },
    {
      question: "Comment sélectionnez-vous les artisans ?",
      answer: "Chaque professionnel est vérifié, assuré et noté par nos clients."
    },
    {
      question: "En combien de temps vais-je recevoir des devis ?",
      answer: "La plupart des demandes reçoivent une réponse sous 24 heures."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenu principal */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <HeroSearch />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Déposez votre projet</h3>
              <p className="text-sm text-gray-600">Décrivez vos besoins et recevez rapidement des propositions d'artisans qualifiés.</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Comparez facilement</h3>
              <p className="text-sm text-gray-600">Consultez les profils, avis et devis pour choisir l'artisan idéal.</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Développez votre activité</h3>
              <p className="text-sm text-gray-600">Des leads ciblés et une gestion simplifiée pour les professionnels du bâtiment.</p>
            </div>
          </section>

          {/* Section "Pourquoi nous choisir" */}
          <section className="text-center py-12 bg-gradient-to-br from-gray-50 to-purple-50 rounded-lg">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
                Pourquoi passer par <span className="text-purple-600">TRAVAUX EXCELLENCE</span> ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Icône 1 : Devis sécurisés */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Devis sécurisés</h3>
                    <p className="text-gray-600">Vos données sont protégées</p>
                  </div>
                </div>

                {/* Icône 2 : Artisans vérifiés */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Artisans vérifiés</h3>
                    <p className="text-gray-600">Professionnels qualifiés et assurés</p>
                  </div>
                </div>

                {/* Icône 3 : Réponse rapide */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Réponse rapide</h3>
                    <p className="text-gray-600">Recevez vos devis en moins de 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section "Comment ça marche" */}
          <section className="py-16 bg-gray-100 rounded-lg">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
                Comment ça marche ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Étape 1 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-purple-200">
                    <span className="text-2xl font-bold text-purple-600">1️⃣</span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Décrivez votre projet en 1 minute
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Remplissez notre formulaire simple et décrivez vos besoins
                    </p>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-purple-200">
                    <span className="text-2xl font-bold text-purple-600">2️⃣</span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Nous sélectionnons les meilleurs artisans
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Notre équipe analyse votre projet et contacte les professionnels qualifiés
                    </p>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-purple-200">
                    <span className="text-2xl font-bold text-purple-600">3️⃣</span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Recevez et comparez vos devis
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Obtenez plusieurs devis détaillés pour faire le meilleur choix
                    </p>
                  </div>
                </div>

                {/* Étape 4 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-purple-200">
                    <span className="text-2xl font-bold text-purple-600">4️⃣</span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Choisissez et lancez vos travaux
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Avec des artisans vérifiés et qualifiés pour un résultat optimal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section "Témoignages Clients" */}
          <section className="py-16 bg-white rounded-lg border">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
                Ils nous ont fait confiance
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Témoignage 1 : Sophie, Lyon */}
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-2xl font-bold text-white">S</span>
                  </div>
                  <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                    "Rapide et efficace, j'ai trouvé un peintre en 24h !"
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">Sophie</p>
                    <p className="text-gray-600 text-sm">Lyon</p>
                  </div>
                </div>

                {/* Témoignage 2 : Marc, Bordeaux */}
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-2xl font-bold text-white">M</span>
                  </div>
                  <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                    "Très bonne expérience, devis clair et artisans pros."
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">Marc</p>
                    <p className="text-gray-600 text-sm">Bordeaux</p>
                  </div>
                </div>

                {/* Témoignage 3 : Leïla, Paris */}
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-2xl font-bold text-white">L</span>
                  </div>
                  <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                    "Service au top, j'ai économisé du temps et de l'argent."
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">Leïla</p>
                    <p className="text-gray-600 text-sm">Paris</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section "Nos domaines d'expertise" */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-white rounded-lg">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
                Nos domaines d'expertise
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Rénovation intérieure */}
                <div className="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Rénovation intérieure</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Transformez votre intérieur avec nos experts en rénovation. De la conception à la réalisation, nous vous accompagnons dans tous vos projets.
                  </p>
                </div>

                {/* Peinture et décoration */}
                <div className="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M9 9h2m-2 2h2m-2 2h2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Peinture et décoration</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Donnez vie à vos murs avec nos peintres professionnels. Choix de couleurs, finitions et techniques pour un résultat impeccable.
                  </p>
                </div>

                {/* Maçonnerie et gros œuvre */}
                <div className="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Maçonnerie et gros œuvre</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Constructions, rénovations et réparations de structures. Nos maçons qualifiés assurent solidité et durabilité de vos projets.
                  </p>
                </div>

                {/* Plomberie et chauffage */}
                <div className="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Plomberie et chauffage</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Installation, réparation et maintenance de vos systèmes de plomberie et chauffage. Confort et efficacité énergétique garantis.
                  </p>
                </div>

                {/* Électricité et domotique */}
                <div className="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Électricité et domotique</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Électriciens certifiés pour vos installations électriques et systèmes domotiques. Sécurité et modernité au service de votre confort.
                  </p>
                </div>

                {/* Jardinage et aménagement extérieur */}
                <div className="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Jardinage et aménagement extérieur</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Créez votre espace extérieur de rêve avec nos paysagistes. Aménagement, entretien et création de jardins sur mesure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section FAQ */}
          <section className="py-16 bg-white rounded-lg border">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
                Questions fréquentes
              </h2>
              
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg border border-gray-200">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="font-semibold text-gray-800 text-lg">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer en bas de page */}
      <Footer />
    </div>
  );
} 