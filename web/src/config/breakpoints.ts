// Configuration des breakpoints responsive
export const BREAKPOINTS = {
  mobile: 'max-width: 767px',
  tablet: 'min-width: 768px) and (max-width: 1199px',
  desktop: 'min-width: 1200px',
  desktopLarge: 'min-width: 1400px'
};

// Tailles recommandées pour chaque breakpoint
export const SIZES = {
  mobile: {
    sectionPadding: 'py-10', // 40px
    title: 'text-2xl', // 28px
    subtitle: 'text-base', // 16px
    body: 'text-sm', // 14px
    button: 'text-sm px-4 py-2', // 14px
    icon: 'w-12 h-12', // 48px
    avatar: 'w-10 h-10', // 40px
    spacing: 'space-y-6'
  },
  tablet: {
    sectionPadding: 'py-15', // 60px
    title: 'text-3xl', // 34px
    subtitle: 'text-lg', // 18px
    body: 'text-base', // 16px
    button: 'text-base px-6 py-3', // 16px
    icon: 'w-15 h-15', // 60px
    avatar: 'w-12 h-12', // 50px
    spacing: 'space-y-8'
  },
  desktop: {
    sectionPadding: 'py-20', // 80px
    title: 'text-4xl', // 42px
    subtitle: 'text-xl', // 20px
    body: 'text-lg', // 18px
    button: 'text-lg px-6 py-4', // 18px
    icon: 'w-20 h-20', // 80px
    avatar: 'w-15 h-15', // 60px
    spacing: 'space-y-10'
  }
};

// Classes Tailwind responsive
export const RESPONSIVE = {
  // Grilles
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-3',
    desktopLarge: 'grid-cols-4'
  },
  
  // Espacement
  spacing: {
    mobile: 'space-y-6',
    tablet: 'space-y-8',
    desktop: 'space-y-10'
  },
  
  // Padding des sections
  sectionPadding: {
    mobile: 'py-10 px-4',
    tablet: 'py-15 px-6',
    desktop: 'py-20 px-8'
  },
  
  // Tailles de texte
  text: {
    mobile: {
      h1: 'text-2xl',
      h2: 'text-xl',
      h3: 'text-lg',
      body: 'text-sm'
    },
    tablet: {
      h1: 'text-3xl',
      h2: 'text-2xl',
      h3: 'text-xl',
      body: 'text-base'
    },
    desktop: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      body: 'text-lg'
    }
  }
};
