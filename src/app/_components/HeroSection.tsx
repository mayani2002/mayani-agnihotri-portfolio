'use client';

import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/personal';
import { ComponentErrorBoundary } from './ErrorBoundary';
import { OptimizedImage } from './OptimizedImage';

/**
 * Hero Section Component
 * 
 * Main landing section of the portfolio featuring:
 * - Large animated name display with alternating fonts (Kalam for both Devanagari + Latin scripts)
 * - Professional subtitle with description
 * - Circular catchphrase text around profile picture using Kalam font
 * - Profile picture with floating animation and theme-aware colors
 * - Responsive design with proper margins and alignment
 * - Dark theme with high pigment gradients
 * - Green "Hire Me" and "View Resume" buttons
 * 
 * Design features enhanced typography, smooth animations, and consistent theming
 */
export const HeroSection: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentNameStyle, setCurrentNameStyle] = useState<'devanagari' | 'latin'>('devanagari');
    const [typingText, setTypingText] = useState('');
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    // Name variations for alternating animation
    const nameVariations = {
        devanagari: "मयनी अग्निहोत्री", // Mayani Agnihotri in Devanagari
        latin: "Mayani Agnihotri"
    };

    // Typing animation for name
    useEffect(() => {
        const name = nameVariations[currentNameStyle];
        let currentIndex = 0;

        const typeInterval = setInterval(() => {
            if (currentIndex <= name.length) {
                setTypingText(name.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    // Switch to other style and restart typing after longer delay
                    setCurrentNameStyle(prev => prev === 'devanagari' ? 'latin' : 'devanagari');
                    setTypingText('');
                }, 5000); // Wait 5 seconds before switching (increased from 2s)
            }
        }, 80); // Faster typing speed (reduced from 100ms to 80ms)

        return () => clearInterval(typeInterval);
    }, [currentNameStyle]);

    // Trigger animations on mount
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Hide scroll indicator when user scrolls
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setShowScrollIndicator(scrollY < 50); // Hide when scrolled more than 50px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { hero } = personalInfo;

    return (
        <ComponentErrorBoundary componentName="Hero Section">
            <section
                id="hero"
                className="min-h-screen flex items-center justify-center relative"
            >

                {/* Main Content Container - Margins handled by page layout */}
                <div className="relative z-10 h-screen flex items-center">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

                        {/* Left Side - Text Content */}
                        <div className="hero-text-primary space-y-2 lg:space-y-3 text-center lg:text-left order-2 lg:order-1">

                            {/* Greeting with Animation - SMALL SIZE */}
                            <div className={`transform transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}>
                                <p className="text-sm sm:text-base lg:text-lg font-light mb-0 hero-text-secondary">
                                    {hero.greeting}
                                </p>
                            </div>

                            {/* Large Animated Name - STANDARD SIZE - Make it bold */}
                            <div className={`transform transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}>
                                <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-2 hero-text-glow min-h-[50px] sm:min-h-[65px] lg:min-h-[80px] flex items-center justify-center lg:justify-start font-kalam
                                    }`}>
                                    <span className="typing-cursor">
                                        {typingText}
                                        <span className="animate-pulse hero-accent ml-2">|</span>
                                    </span>
                                </h1>
                            </div>

                            {/* Professional Subtitle - STANDARD SIZE */}
                            <div className={`transform transition-all duration-1000 delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}>
                                <div className="text-lg sm:text-xl lg:text-2xl font-light mb-2">
                                    <span className="hero-text-primary">{hero.subtitle}</span>
                                </div>

                                {/* Description below subtitle - SMALL SIZE with lower opacity */}
                                <p className="text-sm sm:text-base lg:text-lg hero-text-secondary font-light opacity-70 mt-1 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    {hero.description}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className={`flex flex-col sm:flex-row gap-3 pt-3 items-center justify-center lg:justify-start transform transition-all duration-1000 delay-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}>
                                {/* Hire Me Button - Green - More compact */}
                                <a
                                    href={personalInfo.socialLinks.email}
                                    className="inline-flex items-center justify-center px-5 py-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Hire Me
                                </a>

                                {/* View Resume Button - More compact */}
                                <a
                                    href={personalInfo.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-5 py-2.5 border-2 hero-border hero-accent hover:bg-indigo-600 dark:hover:bg-purple-300 hover:text-white dark:hover:text-purple-900 font-medium rounded-lg transition-all duration-150 text-sm sm:text-base"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    View Resume
                                </a>
                            </div>

                            {/* Immediate Joiner Message */}
                            <div className={`transform transition-all duration-1000 delay-900 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}>
                                <div className="text-xs sm:text-sm lg:text-base hero-text-secondary font-medium">
                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full border border-green-300 dark:border-green-700">
                                        💼 Immediate Joiner Available
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Profile Picture with Circular Text */}
                        <div className={`flex justify-center lg:justify-end order-1 lg:order-2 transform transition-all duration-1000 delay-200 ease-out ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                            }`}>
                            <div className="relative flex justify-center">
                                {/* Profile Picture Container - Reduced sizes for compactness */}
                                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">

                                    {/* Circular Text Outside Profile Picture - Single Line */}
                                    <div className="absolute inset-0 pointer-events-none z-10" style={{ transform: 'scale(1.25)' }}>
                                        <svg className="w-full h-full" viewBox="0 0 400 400">
                                            <defs>
                                                {/* Single circle for catchphrase */}
                                                <path
                                                    id="circle-text-path"
                                                    d="M 200, 200 m -180, 0 a 180, 180 0 1, 1 360, 0 a 180, 180 0 1, 1 -360, 0"
                                                />
                                            </defs>
                                            {/* Catchphrase with theme-aware colors - Centered with Kalam font */}
                                            <text className="fill-purple-600 dark:fill-blue-300 font-kalam" style={{ fontSize: '18px', fontWeight: '400' }}>
                                                <textPath href="#circle-text-path" startOffset="25%">
                                                    {hero.catchPhrase.highlighted} {hero.catchPhrase.main}{hero.catchPhrase.suffix}
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>

                                    {/* Floating Animation Wrapper */}
                                    <div className="animate-float w-full h-full">
                                        {/* Profile Picture with gradient border */}
                                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-600 p-3 profile-glow">
                                            <div className="w-full h-full rounded-full overflow-hidden bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-gray-300/50 dark:border-white/20">
                                                <OptimizedImage
                                                    src={personalInfo.profileImage}
                                                    alt={`${personalInfo.name} - Software Engineer Profile Picture`}
                                                    fill
                                                    priority
                                                    quality={90}
                                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 420px"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Static Decorative Elements - No Blinking */}
                                    <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-indigo-500/10 dark:bg-purple-500/15 rounded-full"></div>
                                    <div className="absolute -z-20 -top-8 -left-8 w-full h-full bg-purple-500/5 dark:bg-pink-500/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Indicator - More compact positioning with scroll-based visibility */}
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-500 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-col items-center hero-text-secondary animate-bounce">
                        <span className="text-xs font-light mb-1">Scroll Down</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>
        </ComponentErrorBoundary>
    );
};

export default HeroSection;
