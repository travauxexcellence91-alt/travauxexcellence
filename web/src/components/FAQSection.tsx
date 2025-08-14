import React, { useState } from 'react';

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Le service est-il vraiment gratuit ?",
      answer: "Oui, demander un devis ne vous engage à rien et reste 100% gratuit. Nous ne prenons aucune commission sur vos projets."
    },
    {
      question: "Comment sélectionnez-vous les artisans ?",
      answer: "Chaque professionnel est vérifié, assuré et noté par nos clients. Nous vérifions les licences, assurances et références."
    },
    {
      question: "En combien de temps vais-je recevoir des devis ?",
      answer: "La plupart des demandes reçoivent une réponse sous 24 heures. Nous garantissons une réponse rapide de nos artisans partenaires."
    },
    {
      question: "Puis-je annuler ma demande ?",
      answer: "Bien sûr ! Vous pouvez annuler votre demande à tout moment sans frais. Vos données sont supprimées de nos serveurs."
    },
    {
      question: "Les artisans sont-ils garantis ?",
      answer: "Oui, tous nos artisans sont assurés et garantis. En cas de problème, nous vous accompagnons dans la résolution."
    }
  ];

  return (
    <section className="py-10 md:py-15 lg:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Questions fréquentes
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur nos services
          </p>
        </div>

        {/* Liste des questions */}
        <div className="space-y-4 md:space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 md:px-6 py-4 md:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg"
              >
                <span className="font-semibold text-gray-800 text-base md:text-lg lg:text-xl leading-tight pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 text-gray-600 transform transition-transform duration-200 flex-shrink-0 ${
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
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bouton de contact */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20">
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <button className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 text-base md:text-lg shadow-lg hover:shadow-xl">
            Nous contacter
            <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
