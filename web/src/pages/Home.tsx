import React from 'react';
import HeroSection from '../components/HeroSection';
import TrustSection from '../components/TrustSection';
import StepsSection from '../components/StepsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ServicesSection from '../components/ServicesSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Section Confiance */}
      <TrustSection />
      
      {/* Section Étapes */}
      <StepsSection />
      
      {/* Section Témoignages */}
      <TestimonialsSection />
      
      {/* Section Services */}
      <ServicesSection />
      
      {/* Section FAQ */}
      <FAQSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 