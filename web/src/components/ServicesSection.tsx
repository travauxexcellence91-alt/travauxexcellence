import React from 'react';

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Rénovation intérieure',
      description: 'Transformez votre intérieur avec nos experts en rénovation. De la conception à la réalisation, nous vous accompagnons dans tous vos projets.',
      color: 'orange'
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M9 9h2m-2 2h2m-2 2h2" />
        </svg>
      ),
      title: 'Peinture et décoration',
      description: 'Donnez vie à vos murs avec nos peintres professionnels. Choix de couleurs, finitions et techniques pour un résultat impeccable.',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Maçonnerie et gros œuvre',
      description: 'Constructions, rénovations et réparations de structures. Nos maçons qualifiés assurent solidité et durabilité de vos projets.',
      color: 'red'
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Plomberie et chauffage',
      description: 'Installation, réparation et maintenance de vos systèmes de plomberie et chauffage. Confort et efficacité énergétique garantis.',
      color: 'green'
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Électricité et domotique',
      description: 'Électriciens certifiés pour vos installations électriques et systèmes domotiques. Sécurité et modernité au service de votre confort.',
      color: 'yellow'
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Jardinage et aménagement extérieur',
      description: 'Créez votre espace extérieur de rêve avec nos paysagistes. Aménagement, entretien et création de jardins sur mesure.',
      color: 'emerald'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'bg-orange-100 text-orange-600',
      blue: 'bg-blue-100 text-blue-600',
      red: 'bg-red-100 text-red-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      emerald: 'bg-emerald-100 text-emerald-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-10 md:py-15 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Nos domaines d'expertise
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Des professionnels qualifiés dans tous les domaines du bâtiment et de la rénovation
          </p>
        </div>

        {/* Grille des services - Responsive selon vos spécifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 md:p-8 shadow-md border hover:shadow-lg transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-6">
                {/* Icône avec taille responsive */}
                <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(service.color)} group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                {/* Titre du service */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {service.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                {service.description}
              </p>
              
              {/* Bouton d'action */}
              <div className="mt-4 md:mt-6">
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm md:text-base group-hover:underline transition-colors duration-200">
                  En savoir plus
                  <svg className="inline-block ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton CTA */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20">
          <button className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
            Voir tous nos services
            <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
