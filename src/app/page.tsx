'use client';

import React, { useState, useEffect } from 'react';
import RightVerticalNav from './_components/RightVerticalNav';
import LeftSidebar from "./_components/LeftSidebar";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import ExperienceSection from "./_components/ExperienceSection";
import ProjectsSection from "./_components/ProjectsSection";
import { ErrorBoundary } from './_components/ErrorBoundary';
import { NoSSR } from './_components/NoSSR';

export const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <ErrorBoundary>
      {/* Navigation Components */}
      <NoSSR>
        <LeftSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <RightVerticalNav />
      </NoSSR>

      {/* Main Content with Dynamic Margins */}
      <main
        id="main"
        className={`
          relative mx-auto transition-all duration-300 ease-in-out
          px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20
          ${isDesktop && isSidebarOpen ? 'md:ml-64 max-w-5xl' : 'max-w-6xl'}
          md:mr-24 lg:mr-20
        `}
        suppressHydrationWarning
      >
        {/* Hero Section - Full Screen */}
        <HeroSection />

        {/* Work Experience Section */}
        <ExperienceSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Future Sections will go here */}
        {/* 
        <AboutSection />
        <SkillsSection />
        <ContactSection />
        */}
      </main>

      {/* Footer */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isDesktop && isSidebarOpen ? 'md:ml-64' : ''}
        md:mr-24 lg:mr-20
      `}>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Home;
