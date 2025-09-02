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

    const { hero } = personalInfo;

    return (
        <ComponentErrorBoundary componentName="Hero Section">
            <section
                id="hero"
                className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg"
            >
                {/* Background Gradient - Much Darker with High Pigment */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-violet-900 dark:to-purple-900" />

                {/* Enhanced Circular Gradients - Higher Pigment in Dark Mode */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-400/8 dark:bg-violet-800/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-800/4 dark:bg-fuchsia-400/25 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/3 dark:bg-violet-300/20 rounded-full blur-3xl" />

                {/* Background Pattern/Texture */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />

                {/* Main Content Container - Good margins on all sides */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 h-screen flex items-center">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full mx-4 sm:mx-8 lg:mx-12">

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
                                <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4 hero-text-glow min-h-[60px] sm:min-h-[80px] lg:min-h-[100px] xl:min-h-[120px] flex items-center justify-center lg:justify-start font-kalam
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
                                <div className="text-lg sm:text-xl lg:text-2xl font-light mb-4">
                                    <span className="hero-text-primary">{hero.subtitle}</span>
                                </div>

                                {/* Description below subtitle - SMALL SIZE with lower opacity */}
                                <p className="text-sm sm:text-base lg:text-lg hero-text-secondary font-light opacity-70 mt-2 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    {hero.description}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className={`flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center lg:justify-start transform transition-all duration-1000 delay-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}>
                                {/* Hire Me Button - Green */}
                                <a
                                    href={personalInfo.socialLinks.email}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-base"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Hire Me 
                                </a>

                                {/* View Resume Button - Removed slow transition */}
                                <a
                                    href={personalInfo.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 border-2 hero-border hero-accent hover:bg-indigo-600 dark:hover:bg-purple-300 hover:text-white dark:hover:text-purple-900 font-medium rounded-lg transition-all duration-150 text-base"
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
                                {/* Profile Picture Container */}
                                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] 2xl:w-[500px] 2xl:h-[500px]">

                                    {/* Circular Text Outside Profile Picture - Single Line */}
                                    <div className="absolute inset-0 pointer-events-none z-10" style={{ transform: 'scale(1.3)' }}>
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

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex flex-col items-center hero-text-secondary animate-bounce">
                        <span className="text-sm font-light mb-2">Scroll Down</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>
        </ComponentErrorBoundary>
    );
};

export default HeroSection;
