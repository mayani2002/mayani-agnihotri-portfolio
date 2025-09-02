'use client';

import React from 'react';
import RightVerticalNav from './_components/RightVerticalNav';
import LeftSidebar from "./_components/LeftSidebar";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import ExperienceSection from "./_components/ExperienceSection";
import { ErrorBoundary } from './_components/ErrorBoundary';

export const Home: React.FC = () => {
  return (
    <ErrorBoundary>
      {/* Navigation Components */}
      <LeftSidebar />
      <RightVerticalNav />

      {/* Main Content with Consistent Page Margins */}
      <main className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Hero Section - Full Screen */}
        <HeroSection />

        {/* Work Experience Section */}
        <ExperienceSection />

        {/* Future Sections will go here */}
        {/* 
        <AboutSection />
        <SkillsSection />
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
