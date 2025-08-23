import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function Topbar() {
  const { role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo et navigation principale */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/logo/logo3.png" 
                alt="TRAVAUX EXCELLENCE" 
                className="h-16 w-auto"
              />
              <span className="text-xl font-bold text-gray-800">TRAVAUX EXCELLENCE</span>
            </Link>
            
            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-1">
          {!role && (
            <>
                  <NavLink 
                    to="/" 
                    end 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Accueil
                  </NavLink>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Connexion
                  </NavLink>
                  <NavLink 
                    to="/register-client" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Inscription Client
                  </NavLink>
                  <NavLink 
                    to="/register-artisan" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Inscription Artisan
                  </NavLink>
            </>
          )}
          {role === 'client' && (
            <>
                  <NavLink 
                    to="/client/dashboard" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink 
                    to="/client/new-project" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Nouveau projet
                  </NavLink>
            </>
          )}
          {role === 'artisan' && (
            <>
                  <NavLink 
                    to="/artisan/dashboard" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Leads
                  </NavLink>
                  <NavLink 
                    to="/artisan/my-leads" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Mes leads
                  </NavLink>
                  <NavLink 
                    to="/artisan/profile" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    Profil
                  </NavLink>
            </>
          )}
        </nav>
      </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-3">
      {role && (
              <button 
                onClick={logout} 
                className="group flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            )}
            
            {!role && (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm"
                >
                  Connexion
                </Link>
                <Link
                  to="/register-client"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                >
                  Commencer un projet
                </Link>
              </div>
            )}

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-200"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {mobileMenuOpen ? (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2 shadow-lg">
              {!role && (
                <>
                  <NavLink 
                    to="/" 
                    end 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Accueil
                  </NavLink>
                  <NavLink 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Connexion
                  </NavLink>
                  <NavLink 
                    to="/register-client" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Inscription Client
                  </NavLink>
                  <NavLink 
                    to="/register-artisan" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Inscription Artisan
                  </NavLink>
                  <div className="pt-3 pb-2 border-t border-gray-200">
                    <Link
                      to="/register-client"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium text-sm"
                    >
                      Commencer un projet
                    </Link>
                  </div>
                </>
              )}
              {role === 'client' && (
                <>
                  <NavLink 
                    to="/client/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink 
                    to="/client/new-project" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Nouveau projet
                  </NavLink>
                </>
              )}
              {role === 'artisan' && (
                <>
                  <NavLink 
                    to="/artisan/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Leads
                  </NavLink>
                  <NavLink 
                    to="/artisan/my-leads" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Mes leads
                  </NavLink>
                  <NavLink 
                    to="/artisan/profile" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    Profil
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


