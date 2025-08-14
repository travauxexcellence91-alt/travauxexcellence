import React from 'react';

export default function TrustSection() {
  const trustItems = [
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Devis sécurisés',
      description: 'Vos données sont protégées'
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Artisans vérifiés',
      description: 'Professionnels qualifiés et assurés'
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Réponse rapide',
      description: 'Recevez vos devis en moins de 24h'
    }
  ];

  return (
    <section className="py-10 md:py-15 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Pourquoi passer par <span className="text-purple-600">TRAVAUX EXCELLENCE</span> ?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Nous vous garantissons un service de qualité avec des artisans vérifiés et des devis transparents
          </p>
        </div>

        {/* Grille des éléments de confiance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-4 md:space-y-6 group"
            >
              {/* Icône avec taille responsive */}
              <div className="w-12 h-12 md:w-15 md:h-15 lg:w-20 lg:h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              
              {/* Contenu textuel */}
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques supplémentaires */}
        <div className="mt-16 md:mt-20 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">5000+</div>
            <div className="text-sm md:text-base text-gray-600">Projets réalisés</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">24h</div>
            <div className="text-sm md:text-base text-gray-600">Délai de réponse</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">98%</div>
            <div className="text-sm md:text-base text-gray-600">Clients satisfaits</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">100%</div>
            <div className="text-sm md:text-base text-gray-600">Gratuit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
