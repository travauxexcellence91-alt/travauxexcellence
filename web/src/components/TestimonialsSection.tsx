import React from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sophie',
      city: 'Lyon',
      avatar: 'S',
      quote: 'Rapide et efficace, j\'ai trouvé un peintre en 24h !',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Marc',
      city: 'Bordeaux',
      avatar: 'M',
      quote: 'Très bonne expérience, devis clair et artisans pros.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Leïla',
      city: 'Paris',
      avatar: 'L',
      quote: 'Service au top, j\'ai économisé du temps et de l\'argent.',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  return (
    <section className="py-10 md:py-15 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Ils nous ont fait confiance
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>

        {/* Grille des témoignages - Responsive selon vos spécifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="text-center space-y-4 md:space-y-6 group hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Avatar avec taille responsive */}
              <div className={`w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {testimonial.avatar}
                </span>
              </div>
              
              {/* Citation */}
              <blockquote className="text-gray-700 italic text-base md:text-lg lg:text-xl leading-relaxed max-w-sm mx-auto">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Informations client */}
              <div className="text-center">
                <p className="font-semibold text-gray-800 text-base md:text-lg">
                  {testimonial.name}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  {testimonial.city}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques de satisfaction */}
        <div className="mt-16 md:mt-20 lg:mt-24 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-10 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">4.9/5</div>
              <div className="text-sm md:text-base text-gray-600">Note moyenne</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">2000+</div>
              <div className="text-sm md:text-base text-gray-600">Avis clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">95%</div>
              <div className="text-sm md:text-base text-gray-600">Recommande</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">24h</div>
              <div className="text-sm md:text-base text-gray-600">Réponse garantie</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
