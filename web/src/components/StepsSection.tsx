import React from 'react';

export default function StepsSection() {
  const steps = [
    {
      number: '1',
      title: 'Décrivez votre projet en 1 minute',
      description: 'Remplissez notre formulaire simple et décrivez vos besoins'
    },
    {
      number: '2',
      title: 'Nous sélectionnons les meilleurs artisans',
      description: 'Notre équipe analyse votre projet et contacte les professionnels qualifiés'
    },
    {
      number: '3',
      title: 'Recevez et comparez vos devis',
      description: 'Obtenez plusieurs devis détaillés pour faire le meilleur choix'
    },
    {
      number: '4',
      title: 'Choisissez et lancez vos travaux',
      description: 'Avec des artisans vérifiés et qualifiés pour un résultat optimal'
    }
  ];

  return (
    <section className="py-10 md:py-15 lg:py-20 px-4 md:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Comment ça marche ?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            En 4 étapes simples, trouvez l'artisan idéal pour vos travaux
          </p>
        </div>

        {/* Grille des étapes - Responsive selon vos spécifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-4 md:space-y-6 group"
            >
              {/* Cercle numéroté avec taille responsive */}
              <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-purple-200 group-hover:border-purple-300 group-hover:shadow-xl transition-all duration-300">
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-600">
                  {step.number}
                </span>
              </div>
              
              {/* Contenu textuel */}
              <div className="space-y-2 md:space-y-3 max-w-xs">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton CTA */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20">
          <button 
            onClick={() => {
              // Faire défiler vers le haut de la page
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Attendre un peu puis ouvrir le dropdown
              setTimeout(() => {
                const input = document.querySelector('input[placeholder="Ex: peinture, plomberie..."]') as HTMLInputElement;
                if (input) {
                  input.focus();
                  input.click();
                }
              }, 500);
            }}
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Commencer maintenant
            <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
