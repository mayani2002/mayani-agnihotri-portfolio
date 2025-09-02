'use client';

import React from 'react';
import RightVerticalNav from './_components/RightVerticalNav';
import LeftSidebar from "./_components/LeftSidebar";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import { ErrorBoundary } from './_components/ErrorBoundary';

export const Home: React.FC = () => {
  return (
    <ErrorBoundary>
      {/* Navigation Components */}
      <LeftSidebar />
      <RightVerticalNav />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section - Full Screen */}
        <HeroSection />

        {/* Future Sections will go here */}
        {/* 
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        */}
      </main>

      {/* Footer */}
      <Footer />
    </ErrorBoundary>
  );
};

export default Home;
