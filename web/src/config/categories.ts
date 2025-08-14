export type QuestionOption = {
  value: string;
  label: string;
};

export type StepKind = 'text' | 'radio' | 'checkbox' | 'textarea';

export interface CategoryStep {
  id: string;
  title: string;
  description?: string;
  kind: StepKind;
  options?: QuestionOption[];
  optional?: boolean;
  // Additional HTML input attributes for 'text' kind
  inputAttributes?: {
    type?: 'text' | 'email' | 'number' | 'tel';
    placeholder?: string;
    pattern?: string;
    maxLength?: number;
  };
}

export interface CategoryDefinition {
  slug: string;
  name: string;
  steps: CategoryStep[];
}

export const categories: CategoryDefinition[] = [
  {
    slug: 'peinture-interieure',
    name: 'Peinture intérieure',
    steps: [
      {
        id: 'zipcode',
        title: 'Code postal du lieu des travaux',
        description: "Nous l’utilisons pour trouver les meilleurs artisans de votre région.",
        kind: 'text',
        inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 },
      },
      {
        id: 'surfaces',
        title: 'Quels travaux de peinture sont nécessaires ?',
        description: 'Veuillez compter tous les murs et plafonds à peindre.',
        kind: 'radio',
        options: [
          { value: '1-5', label: '1-5 surfaces' },
          { value: '6-10', label: '6-10 surfaces' },
          { value: '11-15', label: '11-15 surfaces' },
          { value: '16-20', label: '16-20 surfaces' },
          { value: '21-25', label: '21-25 surfaces' },
          { value: '25+', label: 'Plus de 25 surfaces' },
        ],
      },
      {
        id: 'rooms',
        title: 'Quelles pièces souhaitez-vous peindre ? (facultatif)',
        kind: 'checkbox',
        optional: true,
        options: [
          { value: 'house', label: 'Toute la maison' },
          { value: 'living', label: 'Salon' },
          { value: 'bedroom', label: 'Chambre(s)' },
          { value: 'hallway', label: 'Couloir' },
          { value: 'kitchen', label: 'La cuisine' },
          { value: 'bathroom', label: 'La salle de bain' },
          { value: 'attic', label: 'Les combles' },
          { value: 'other', label: 'Autre' },
        ],
      },
      {
        id: 'condition',
        title: 'Quel est l’état des surfaces ? (facultatif)',
        kind: 'radio',
        optional: true,
        options: [
          { value: 'good', label: 'Bon état' },
          { value: 'average', label: 'Etat moyen' },
          { value: 'bad', label: 'Mauvais état' },
          { value: 'very-bad', label: 'Très mauvais état' },
        ],
      },
      {
        id: 'timeline',
        title: 'Quand souhaitez-vous que le travail soit terminé ? (facultatif)',
        kind: 'radio',
        optional: true,
        options: [
          { value: 'urgent', label: 'Urgent' },
          { value: 'no-date', label: 'Pas de date fixée' },
          { value: 'lt-2-weeks', label: 'Dans moins de deux semaines' },
          { value: 'lt-1-month', label: "Dans moins d'un mois" },
          { value: 'lt-6-months', label: 'Dans moins de 6 mois' },
        ],
      },
      {
        id: 'photos',
        title: 'Photos ou plans (facultatif)',
        description: 'En ajoutant des photos, les artisans pourront mieux évaluer le travail.',
        kind: 'radio',
        optional: true,
        options: [
          { value: 'yes', label: 'Oui' },
          { value: 'later', label: 'Non, peut-être plus tard' },
        ],
      },
      {
        id: 'notes',
        title: 'Informations supplémentaires (facultatif)',
        description: 'Merci de ne pas partager vos coordonnées ici',
        kind: 'textarea',
        optional: true,
      },
      {
        id: 'email',
        title: 'Recevez des réponses d’artisans près de chez vous.',
        description: 'Vos coordonnées seront visibles uniquement par les artisans que vous aurez choisis.',
        kind: 'text',
        inputAttributes: { type: 'email', placeholder: 'E-mail' },
      },
    ],
  },
  {
    slug: 'entretien-jardin-espaces-verts',
    name: "Entretien de jardin et d'espaces verts",
    steps: [
      {
        id: 'zipcode',
        title: 'Code postal du lieu des travaux',
        kind: 'text',
        inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 },
      },
      {
        id: 'service',
        title: 'Quel service recherchez-vous ?'
        ,
        kind: 'checkbox',
        options: [
          { value: 'tonte', label: 'Tonte de pelouse' },
          { value: 'taille', label: 'Taille de haies' },
          { value: 'elagage', label: 'Élagage/abattage' },
          { value: 'desherbage', label: 'Désherbage' },
          { value: 'debroussaillage', label: 'Débroussaillage' },
          { value: 'entretien-general', label: 'Entretien général' },
        ],
      },
      {
        id: 'garden-size',
        title: 'Surface approximative du jardin',
        kind: 'radio',
        options: [
          { value: '<50', label: '< 50 m²' },
          { value: '50-200', label: '50-200 m²' },
          { value: '200-500', label: '200-500 m²' },
          { value: '>500', label: '> 500 m²' },
        ],
      },
      {
        id: 'green-waste',
        title: 'Souhaitez-vous l’évacuation des déchets verts ?',
        kind: 'radio',
        options: [
          { value: 'yes', label: 'Oui' },
          { value: 'no', label: 'Non' },
        ],
      },
      {
        id: 'frequency',
        title: "Fréquence d'intervention",
        kind: 'radio',
        options: [
          { value: 'ponctuel', label: 'Ponctuel' },
          { value: 'mensuel', label: 'Mensuel' },
          { value: 'hebdo', label: 'Hebdomadaire' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      { id: 'timeline', title: 'Quand souhaitez-vous démarrer ?', kind: 'radio', optional: true, options: [
        { value: 'urgent', label: 'Urgent' },
        { value: 'lt-2-weeks', label: 'Dans moins de deux semaines' },
        { value: 'lt-1-month', label: "Dans moins d'un mois" },
        { value: 'no-date', label: 'Pas de date fixée' },
      ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'climatisation',
    name: 'Climatisation',
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'scope', title: 'Que souhaitez-vous faire ?', kind: 'radio', options: [
        { value: 'install', label: 'Installation' },
        { value: 'replace', label: 'Remplacement' },
        { value: 'service', label: 'Entretien/Dépannage' },
      ] },
      { id: 'system', title: 'Type de système', kind: 'radio', options: [
        { value: 'split', label: 'Split' },
        { value: 'multi-split', label: 'Multi-split' },
        { value: 'gainable', label: 'Gainable' },
        { value: 'pac-air-air', label: 'Pompe à chaleur air/air' },
      ] },
      { id: 'area', title: 'Surface à climatiser', kind: 'radio', options: [
        { value: '<30', label: '< 30 m²' },
        { value: '30-60', label: '30-60 m²' },
        { value: '60-120', label: '60-120 m²' },
        { value: '>120', label: '> 120 m²' },
      ] },
      { id: 'rooms', title: 'Nombre de pièces', kind: 'radio', optional: true, options: [
        { value: '1', label: '1' }, { value: '2-3', label: '2-3' }, { value: '4-5', label: '4-5' }, { value: '6+', label: '6+' },
      ] },
      { id: 'electric-ready', title: 'Alimentation électrique prête ?', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'no', label: 'Non' } ] },
      { id: 'timeline', title: 'Quand souhaitez-vous réaliser les travaux ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'renovation-appartement-maison',
    name: 'Rénovation appartement, maison (et autres bâtiments)',
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'rooms', title: 'Pièces concernées', kind: 'checkbox', options: [
        { value: 'living', label: 'Salon' }, { value: 'bedroom', label: 'Chambre(s)' }, { value: 'kitchen', label: 'Cuisine' }, { value: 'bathroom', label: 'Salle de bain' }, { value: 'toilet', label: 'WC' }, { value: 'other', label: 'Autre' }
      ] },
      { id: 'works', title: 'Types de travaux', kind: 'checkbox', options: [
        { value: 'peinture', label: 'Peinture' }, { value: 'plomberie', label: 'Plomberie' }, { value: 'electricite', label: 'Électricité' }, { value: 'sol', label: 'Sol (parquet/carrelage)' }, { value: 'isolation', label: 'Isolation' }, { value: 'menuiserie', label: 'Menuiserie' }
      ] },
      { id: 'area', title: 'Surface totale à rénover', kind: 'radio', options: [
        { value: '<20', label: '< 20 m²' }, { value: '20-50', label: '20-50 m²' }, { value: '50-100', label: '50-100 m²' }, { value: '>100', label: '> 100 m²' }
      ] },
      { id: 'budget', title: 'Budget estimatif', kind: 'radio', optional: true, options: [
        { value: '<2k', label: '< 2 000€' }, { value: '2k-5k', label: '2 000€ - 5 000€' }, { value: '5k-15k', label: '5 000€ - 15 000€' }, { value: '>15k', label: '> 15 000€' }
      ] },
      { id: 'timeline', title: 'Quand souhaitez-vous démarrer ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'petits-travaux-maconnerie',
    name: 'Petits travaux de maçonnerie',
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'type', title: 'Type de travaux de maçonnerie', kind: 'checkbox', options: [
        { value: 'mur', label: 'Création/réparation de mur' }, { value: 'ouverture', label: 'Ouverture/agrandissement' }, { value: 'dalle', label: 'Dalle/beton' }, { value: 'fissures', label: 'Reprise de fissures' }, { value: 'autre', label: 'Autre' }
      ] },
      { id: 'material', title: 'Matériau principal', kind: 'radio', options: [ { value: 'parpaing', label: 'Parpaing' }, { value: 'brique', label: 'Brique' }, { value: 'beton', label: 'Béton' }, { value: 'pierre', label: 'Pierre' } ] },
      { id: 'dimensions', title: 'Dimensions approximatives (facultatif)', kind: 'text', optional: true, inputAttributes: { type: 'text', placeholder: 'Ex: mur 3m x 2.5m' } },
      { id: 'timeline', title: 'Quand souhaitez-vous réaliser les travaux ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'carrelage',
    name: "Pose ou rénovation d'un carrelage",
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'location', title: 'Où poser/renover le carrelage ?', kind: 'radio', options: [ { value: 'sol', label: 'Sol' }, { value: 'mur', label: 'Mur' }, { value: 'sol-mur', label: 'Sol et mur' } ] },
      { id: 'surface', title: 'Surface à carreler', kind: 'radio', options: [ { value: '<5', label: '< 5 m²' }, { value: '5-15', label: '5-15 m²' }, { value: '15-30', label: '15-30 m²' }, { value: '>30', label: '> 30 m²' } ] },
      { id: 'tile-size', title: 'Format des carreaux', kind: 'radio', optional: true, options: [ { value: 'petit', label: '< 20 cm' }, { value: 'moyen', label: '20-60 cm' }, { value: 'grand', label: '> 60 cm' } ] },
      { id: 'remove-old', title: "Dépose de l'existant nécessaire ?", kind: 'radio', options: [ { value: 'yes', label: 'Oui' }, { value: 'no', label: 'Non' } ] },
      { id: 'timeline', title: 'Quand souhaitez-vous réaliser les travaux ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'petits-travaux-electricite',
    name: "Petits travaux d'électricité",
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'type', title: "Quel type d'intervention ?", kind: 'checkbox', options: [
        { value: 'reparation', label: 'Réparation de panne' }, { value: 'installation', label: 'Installation de prises/interrupteurs' }, { value: 'luminaires', label: 'Pose de luminaires' }, { value: 'mise-aux-normes', label: 'Mise aux normes' }, { value: 'tableau', label: 'Remplacement tableau électrique' }
      ] },
      { id: 'rooms', title: 'Pièces concernées (facultatif)', kind: 'checkbox', optional: true, options: [ { value: 'living', label: 'Salon' }, { value: 'bedroom', label: 'Chambre(s)' }, { value: 'kitchen', label: 'Cuisine' }, { value: 'bathroom', label: 'Salle de bain' } ] },
      { id: 'timeline', title: 'Quand souhaitez-vous réaliser les travaux ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'petits-travaux-plomberie',
    name: 'Petits travaux de plomberie',
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'type', title: 'Quel type de travaux ?', kind: 'checkbox', options: [
        { value: 'fuite', label: 'Fuite/urgence' }, { value: 'robinetterie', label: 'Remplacement robinet' }, { value: 'chauffe-eau', label: 'Chauffe-eau' }, { value: 'salle-de-bain', label: 'Salle de bain' }, { value: 'wc', label: 'WC' }, { value: 'autre', label: 'Autre' }
      ] },
      { id: 'urgency', title: 'Est-ce urgent ?', kind: 'radio', options: [ { value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' } ] },
      { id: 'timeline', title: 'Quand souhaitez-vous réaliser les travaux ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'toiture',
    name: 'Installation ou rénovation couverture/toiture',
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'scope', title: 'Quel est votre besoin ?', kind: 'radio', options: [ { value: 'reparation', label: 'Réparation' }, { value: 'renovation', label: 'Rénovation complète' }, { value: 'isolation', label: 'Isolation' }, { value: 'nettoyage', label: 'Nettoyage' } ] },
      { id: 'cover', title: 'Type de couverture', kind: 'radio', options: [ { value: 'tuile', label: 'Tuiles' }, { value: 'ardoise', label: 'Ardoise' }, { value: 'bac-acier', label: 'Bac acier' }, { value: 'autre', label: 'Autre' } ] },
      { id: 'roof-area', title: 'Surface de toiture', kind: 'radio', options: [ { value: '<20', label: '< 20 m²' }, { value: '20-50', label: '20-50 m²' }, { value: '50-100', label: '50-100 m²' }, { value: '>100', label: '> 100 m²' } ] },
      { id: 'access', title: "Accès/difficulté d'intervention (facultatif)", kind: 'radio', optional: true, options: [ { value: 'facile', label: 'Facile' }, { value: 'moyen', label: 'Moyen' }, { value: 'difficile', label: 'Difficile' } ] },
      { id: 'timeline', title: 'Quand souhaitez-vous réaliser les travaux ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
  {
    slug: 'cloture',
    name: 'Clôture',
    steps: [
      { id: 'zipcode', title: 'Code postal du lieu des travaux', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Par ex : 01000', pattern: '^\\d{5}$', maxLength: 5 } },
      { id: 'type', title: 'Type de clôture', kind: 'radio', options: [ { value: 'grillage-rigide', label: 'Grillage rigide' }, { value: 'grillage-souple', label: 'Grillage souple' }, { value: 'bois', label: 'Bois' }, { value: 'alu', label: 'Aluminium' }, { value: 'autre', label: 'Autre' } ] },
      { id: 'length', title: 'Longueur approximative', kind: 'text', inputAttributes: { type: 'text', placeholder: 'Ex: 20 mètres' } },
      { id: 'extras', title: 'Éléments complémentaires (facultatif)', kind: 'checkbox', optional: true, options: [ { value: 'portillon', label: 'Portillon' }, { value: 'portail', label: 'Portail' } ] },
      { id: 'ground', title: 'Nature du terrain (facultatif)', kind: 'radio', optional: true, options: [ { value: 'plat', label: 'Plat' }, { value: 'pente', label: 'En pente' }, { value: 'muret', label: 'Sur muret' } ] },
      { id: 'timeline', title: 'Quand souhaitez-vous réaliser les travaux ?', kind: 'radio', optional: true, options: [ { value: 'urgent', label: 'Urgent' }, { value: 'lt-1-month', label: "Dans moins d'un mois" }, { value: 'no-date', label: 'Pas de date fixée' } ] },
      { id: 'photos', title: 'Photos (facultatif)', kind: 'radio', optional: true, options: [ { value: 'yes', label: 'Oui' }, { value: 'later', label: 'Non, plus tard' } ] },
      { id: 'notes', title: 'Informations supplémentaires (facultatif)', kind: 'textarea', optional: true },
      { id: 'email', title: 'Recevez des réponses d’artisans près de chez vous.', kind: 'text', inputAttributes: { type: 'email', placeholder: 'E-mail' } },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return categories.find((c) => c.slug === slug);
}

export function findCategoryByName(text: string): CategoryDefinition | undefined {
  const q = text.trim().toLowerCase();
  return categories.find((c) => c.name.toLowerCase().includes(q));
}


