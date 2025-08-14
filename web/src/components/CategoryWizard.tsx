import React, { useMemo, useState } from 'react';
import type { CategoryDefinition, CategoryStep } from '../config/categories';

type WizardValues = Record<string, string | string | undefined> & {
  [key: string]: any;
};

// Icônes SVG modernes pour chaque type d'étape
const StepIcons = {
  text: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  ),
  radio: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  checkbox: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  textarea: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )
};

// Icônes spécifiques pour les options de peinture
const RoomIcons = {
  house: '🏠',
  living: '🛋️',
  bedroom: '🛏️',
  hallway: '🚪',
  kitchen: '🍳',
  bathroom: '🚿',
  attic: '🏠',
  other: '➕'
};

// Icônes pour les surfaces de peinture
const SurfaceIcons = {
  '1-5': '🎨',
  '6-10': '🖌️',
  '11-15': '🏠',
  '16-20': '🏢',
  '21-25': '🏗️',
  '25+': '🌆'
};

// Système de traduction pour les valeurs
const ValueTranslations: Record<string, Record<string, string>> = {
  surfaces: {
    '1-5': '1-5 surfaces',
    '6-10': '6-10 surfaces',
    '11-15': '11-15 surfaces',
    '16-20': '16-20 surfaces',
    '21-25': '21-25 surfaces',
    '25+': 'Plus de 25 surfaces'
  },
  rooms: {
    house: 'Toute la maison',
    living: 'Salon',
    bedroom: 'Chambre(s)',
    hallway: 'Couloir',
    kitchen: 'La cuisine',
    bathroom: 'La salle de bain',
    attic: 'Les combles',
    other: 'Autre'
  },
  condition: {
    new: 'Nouvelles',
    good: 'Bonnes',
    average: 'Moyennes',
    poor: 'Mauvaises'
  },
  timeline: {
    urgent: 'Urgent',
    'lt-1-month': "Dans moins d'un mois",
    'lt-3-months': 'Dans moins de 3 mois',
    'lt-6-months': 'Dans moins de 6 mois',
    'lt-1-year': 'Dans moins d\'un an',
    'no-date': 'Pas de date fixée'
  },
  photos: {
    yes: 'Oui',
    later: 'Non, plus tard'
  }
};

// Fonction pour traduire les valeurs
function translateValue(stepId: string, value: any): string {
  if (!value) return '-';
  
  if (Array.isArray(value)) {
    return value.map(v => translateValue(stepId, v)).join(', ');
  }
  
  const translations = ValueTranslations[stepId];
  if (translations && translations[value]) {
    return translations[value];
  }
  
  // Si c'est un code postal ou autre valeur textuelle, on la retourne telle quelle
  return String(value);
}

function StepView({ step, value, onChange }: { step: CategoryStep; value: any; onChange: (v: any) => void }) {
  if (step.kind === 'text') {
    return (
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200">
            {StepIcons.text}
          </div>
        </div>
        <input
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-base placeholder-gray-400"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={step.inputAttributes?.placeholder}
          type={step.inputAttributes?.type || 'text'}
          maxLength={step.inputAttributes?.maxLength}
          pattern={step.inputAttributes?.pattern}
        />
      </div>
    );
  }
  
  if (step.kind === 'textarea') {
    return (
      <div className="relative group">
        <div className="absolute top-3 left-3 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200">
          {StepIcons.textarea}
        </div>
        <textarea
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-base placeholder-gray-400 resize-none"
          rows={4}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Décrivez vos besoins..."
        />
      </div>
    );
  }
  
  if (step.kind === 'radio') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {step.options?.map((opt) => {
          const isSelected = value === opt.value;
          const icon = step.id === 'surfaces' ? SurfaceIcons[opt.value as keyof typeof SurfaceIcons] : '✨';
          
          return (
            <label 
              key={opt.value} 
              className={`relative cursor-pointer group transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-purple-200 border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
              } border-2 rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[100px]`}
            >
              <input 
                type="radio" 
                name={step.id} 
                checked={isSelected} 
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div className={`text-3xl mb-2 transition-transform duration-200 group-hover:scale-110 ${
                isSelected ? 'scale-110' : ''
              }`}>
                {icon}
              </div>
              <span className={`font-medium text-sm transition-colors duration-200 ${
                isSelected ? 'text-purple-700' : 'text-gray-700'
              }`}>
                {opt.label}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          );
        })}
      </div>
    );
  }
  
  if (step.kind === 'checkbox') {
    const set = new Set<string>(Array.isArray(value) ? value : []);
    const toggle = (v: string) => {
      const next = new Set(set);
      if (next.has(v)) next.delete(v); else next.add(v);
      onChange(Array.from(next));
    };
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {step.options?.map((opt) => {
          const isSelected = set.has(opt.value);
          const icon = step.id === 'rooms' ? RoomIcons[opt.value as keyof typeof RoomIcons] : '🏠';
          
          return (
            <label 
              key={opt.value} 
              className={`relative cursor-pointer group transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-purple-200 border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
              } border-2 rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[110px]`}
            >
              <input
                className="sr-only"
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(opt.value)}
              />
              <div className={`text-3xl mb-2 transition-transform duration-200 group-hover:scale-110 ${
                isSelected ? 'scale-110' : ''
              }`}>
                {icon}
              </div>
              <span className={`font-medium text-xs transition-colors duration-200 ${
                isSelected ? 'text-purple-700' : 'text-gray-700'
              }`}>
                {opt.label}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          );
        })}
      </div>
    );
  }
  
  return null;
}

export default function CategoryWizard({ category, onSubmit }: { category: CategoryDefinition; onSubmit: (values: WizardValues) => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<WizardValues>({});

  const step = useMemo(() => category.steps[stepIndex], [category, stepIndex]);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === category.steps.length - 1;

  const next = () => {
    if (!isLast) setStepIndex((i) => i + 1);
  };
  const prev = () => {
    if (!isFirst) setStepIndex((i) => i - 1);
  };

  const update = (v: any) => {
    setValues((curr) => ({ ...curr, [step.id]: v }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLast) onSubmit(values);
    else next();
  };

  const isSummary = isLast;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-gray-800">{category.name}</h1>
          <div className="text-sm text-gray-500">
            Étape {stepIndex + 1} sur {category.steps.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((stepIndex + 1) / category.steps.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Step Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-md">
            {StepIcons[step.kind as keyof typeof StepIcons]}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{isSummary ? 'Récapitulatif' : step.title}</h2>
          {!isSummary && step.description && (
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              {step.description}
            </p>
          )}
        </div>

        {/* Step Content */}
        <div className="min-h-[120px] flex items-center justify-center">
          {!isSummary ? (
            <div className="w-full">
              <StepView step={step} value={values[step.id]} onChange={update} />
            </div>
          ) : (
            <div className="w-full bg-white border-2 border-gray-100 rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
                <h3 className="text-lg font-semibold text-white">Résumé de votre projet</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {category.steps.slice(0, -1).map((s) => (
                    <div key={s.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                          {StepIcons[s.kind as keyof typeof StepIcons]}
                        </div>
                        <span className="font-medium text-gray-700 text-sm">{s.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-900 font-medium text-sm">
                          {translateValue(s.id, values[s.id])}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          {!isFirst && (
            <button 
              type="button" 
              onClick={prev}
              className="group flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-gray-600 group-hover:text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-gray-700 group-hover:text-purple-700 transition-colors duration-200">Retour</span>
            </button>
          )}
          
          <button 
            type="submit" 
            className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span className="font-semibold">
              {isLast ? 'Terminer le projet' : 'Continuer'}
            </span>
            {!isLast && (
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}


