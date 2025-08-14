import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryWizard from '../components/CategoryWizard';
import Footer from '../components/Footer';
import { categories } from '../config/categories';

export default function PublishProject() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Utilise la première catégorie par défaut

  const handleSubmit = (values: any) => {
    // Stocker les valeurs du projet en sessionStorage
    sessionStorage.setItem('draftProject', JSON.stringify({ 
      category: selectedCategory.slug, 
      values 
    }));
    
    // Rediriger vers l'inscription client
    navigate('/register-client');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-12 flex items-center justify-between">
            {/* Navigation gauche */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Retour à l'accueil</span>
              </button>
            </div>

            {/* Titre central */}
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-800">Publier un projet</h1>
              {selectedCategory && (
                <p className="text-sm text-gray-600">
                  {selectedCategory.name}
                </p>
              )}
            </div>

            {/* Navigation droite */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Connexion
              </button>
              <button
                onClick={() => navigate('/register-client')}
                className="px-3 py-1.5 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Inscription
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <CategoryWizard 
            category={selectedCategory}
            onSubmit={handleSubmit}
          />
        </div>
      </main>

      {/* Footer informatif */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            {/* Badges de confiance */}
            <div className="flex justify-center space-x-8">
              <div className="flex items-center space-x-2 text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Gratuit</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium">Sans engagement</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Réponses sous 24h</span>
              </div>
            </div>

            {/* Message de confidentialité */}
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Vos informations sont protégées et ne seront utilisées que pour vous mettre en relation avec des artisans qualifiés.
            </p>
          </div>
        </div>
      </footer>

      <Footer />
    </div>
  );
}


