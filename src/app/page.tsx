'use client';

import React, { useState, useEffect } from 'react';
import RightVerticalNav from './_components/RightVerticalNav';
import LeftSidebar from "./_components/LeftSidebar";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import ExperienceSection from "./_components/ExperienceSection";
import ProjectsSection from "./_components/ProjectsSection";
import AchievementSection from "./_components/AchievementSection";
import EducationSection from "./_components/EducationSection";
import { ErrorBoundary } from './_components/ErrorBoundary';
import { NoSSR } from './_components/NoSSR';

export const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [sidebarAutoOpened, setSidebarAutoOpened] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Auto-open sidebar when scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('#hero') as HTMLElement;
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const pastHero = scrollPosition > heroHeight * 0.6; // Trigger when 60% past hero
        
        if (pastHero && !hasScrolledPastHero && isDesktop) {
          setHasScrolledPastHero(true);
          setSidebarAutoOpened(true);
          // Add a small delay to make it feel more natural
          setTimeout(() => {
            setIsSidebarOpen(true);
          }, 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledPastHero, isDesktop]);

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

        {/* Achievements Section */}
        
        <AchievementSection />
        {/* Education Section */}
        <EducationSection />

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
