'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    FiAward,
    FiStar,
    FiTrendingUp,
    FiUsers,
    FiExternalLink,
    FiCalendar,
    FiFilter,
    FiTarget,
    FiBookOpen,
    FiGithub,
    FiHeart,
    FiCode,
    FiZap,
    FiShield
} from 'react-icons/fi';
import { achievements, Achievement } from '@/data/achievements';
import AchievementModal from './AchievementModal';

/**
 * 🏆 Achievement Section Component
 * 
 * Features:
 * - 📱 Responsive grid layout with fixed heights
 * - 🔍 Category-based filtering  
 * - 🎯 Achievement detail modals
 * - 🔗 Verification link integration
 * - ✨ Smooth animations and transitions
 * - 🏅 Achievement importance indicators
 * - 👁️ Viewport-aware show less button
 */
const AchievementSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [showAllMobile, setShowAllMobile] = useState<boolean>(false);
    const [showAllDesktop, setShowAllDesktop] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showFloatingButton, setShowFloatingButton] = useState<boolean>(true);
    const [cardsPerRow, setCardsPerRow] = useState<number>(4); // Default estimate
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef, { once: true, amount: 0.2 });

    // Check screen size and calculate cards per row dynamically
    useEffect(() => {
        const calculateCardsPerRow = () => {
            const width = window.innerWidth;
            const isMobileSize = width < 768;

            if (isMobileSize) {
                return 1; // Mobile always shows 1 card per row
            }

            // Calculate based on CSS grid auto-fit logic
            // Using minmax values from CSS: minmax(280px-320px, 1fr)
            let minCardWidth = 280;
            let gap = 24; // 1.5rem = 24px

            // Adjust based on CSS breakpoints
            if (width >= 1400) {
                minCardWidth = 320;
                gap = 32; // 2rem
            } else if (width >= 1025) {
                minCardWidth = 300;
                gap = 24;
            } else if (width >= 641) {
                minCardWidth = 320;
                gap = 20;
            }

            // Calculate container width (accounting for padding)
            const containerPadding = width < 640 ? 32 : width < 1024 ? 64 : 128;
            const availableWidth = width - containerPadding;

            // Calculate how many cards fit per row
            const cardsInRow = Math.floor((availableWidth + gap) / (minCardWidth + gap));
            return Math.max(1, cardsInRow);
        };

        const checkScreenSize = () => {
            const isMobileSize = window.innerWidth < 768;
            setIsMobile(isMobileSize);
            setCardsPerRow(calculateCardsPerRow());
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Scroll-based detection for floating button
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Show button only when section is actually visible in viewport
            // More restrictive: section must be at least partially visible
            const isSectionVisible = sectionRect.bottom > 0 && sectionRect.top < windowHeight;

            // Additional check: ensure user hasn't scrolled too far past the section
            const isNotTooFarPast = sectionRect.bottom > -200; // Allow some buffer when scrolled past

            setShowFloatingButton(isSectionVisible || (sectionRect.top < 0 && isNotTooFarPast));
        };

        window.addEventListener('scroll', handleScroll);
        // Check initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset show states when category changes
    useEffect(() => {
        setShowAllMobile(false);
        setShowAllDesktop(false);
    }, [selectedCategory]);

    // Get unique categories for filtering
    const categories = useMemo(() => {
        const cats = new Set(achievements.map(achievement => achievement.category));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    // Filter achievements based on selected category
    const filteredAchievements = useMemo(() => {
        if (selectedCategory === 'All') return achievements;
        return achievements.filter(achievement => achievement.category === selectedCategory);
    }, [selectedCategory]);

    // Get high priority achievements for mobile default view
    const highPriorityAchievements = useMemo(() => {
        return filteredAchievements
            .filter(achievement => achievement.importance === 'High')
            .slice(0, 3);
    }, [filteredAchievements]);

    // Get achievements for desktop 2-row limit (dynamic based on screen size)
    const twoRowDesktopAchievements = useMemo(() => {
        const maxCardsForTwoRows = cardsPerRow * 2;
        return filteredAchievements.slice(0, maxCardsForTwoRows);
    }, [filteredAchievements, cardsPerRow]);

    // Get achievements to display based on screen size and show state
    const achievementsToDisplay = useMemo(() => {
        if (isMobile) {
            // On mobile, show only high priority by default, all when expanded
            return showAllMobile ? filteredAchievements : highPriorityAchievements;
        } else {
            // On desktop, show 2 rows by default (dynamic based on screen), all when expanded
            return showAllDesktop ? filteredAchievements : twoRowDesktopAchievements;
        }
    }, [filteredAchievements, highPriorityAchievements, twoRowDesktopAchievements, showAllMobile, showAllDesktop, isMobile]);

    // Get category icon
    const getCategoryIcon = (category: Achievement['category']) => {
        const iconMap = {
            'Award': FiAward,
            'Certification': FiShield,
            'Milestone': FiTarget,
            'Hackathon': FiCode,
            'Publication': FiExternalLink
        };
        return iconMap[category] || FiAward;
    };

    // Get importance badge color
    const getImportanceColor = (importance: Achievement['importance']) => {
        const colorMap = {
            'High': 'bg-purple-500 text-white',
            'Medium': 'bg-sky-400 dark:bg-sky-600 text-white',
            'Low': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
        };
        return colorMap[importance];
    };

    // Handle show more 
    const handleShowMore = () => {
        if (isMobile) {
            setShowAllMobile(true);
        } else {
            setShowAllDesktop(true);
        }
    };

    // Handle show less
    const handleShowLess = () => {
        if (isMobile) {
            setShowAllMobile(false);
        } else {
            setShowAllDesktop(false);
        }
    };

    return (
        <section ref={sectionRef} id="achievements" className="py-20">
            <div className="adaptive-container">
                {/* 📋 Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-kalam">
                      Achievements & Certifications
                    </h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
                    ></motion.div>
                    <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
                        A showcase of certifications, awards, milestones, and hackathon wins earned throughout my
                        journey as a software engineer and developer.
                    </p>
                </div>

                {/* 🔽 Filter Categories */}
                <div className="flex flex-wrap justify-center gap-1 mb-12">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${selectedCategory === 'All'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        All
                    </button>
                    {categories.slice(1).map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${selectedCategory === category
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 🎯 Achievements Grid - Flexible Layout */}
                <div className="cards-grid-flexible">
                    <AnimatePresence>
                        {achievementsToDisplay.map((achievement, index) => {
                            const IconComponent = getCategoryIcon(achievement.category);

                            return (
                                <motion.div
                                    key={achievement.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group relative exp-card-bg rounded-xl border border-themed transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer overflow-hidden h-96 card-width-responsive"
                                    onClick={() => setSelectedAchievement(achievement)}
                                >
                                    {/* 🏅 Importance Badge */}
                                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold z-10 ${getImportanceColor(achievement.importance)}`}>
                                        {achievement.importance}
                                    </div>

                                    {/* 📸 Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 right-0 transform rotate-12 translate-x-8 -translate-y-8">
                                            <IconComponent size={100} />
                                        </div>
                                    </div>

                                    <div className="relative p-5 h-full flex flex-col">
                                        {/* 🔝 Header */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="p-2 rounded-lg text-white flex-shrink-0">
                                                <IconComponent size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-muted rounded-full mb-2">
                                                    {achievement.category}
                                                </span>
                                                <h3 className="text-base font-bold text-primary font-kalam line-clamp-2 leading-tight">
                                                    {achievement.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* 🖼️ Thumbnail Image */}
                                        {achievement.image && (
                                            <div className="mb-3 overflow-hidden rounded-lg border border-themed flex-shrink-0">
                                                <img
                                                    src={achievement.image}
                                                    alt={achievement.title}
                                                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}

                                        {/* 📝 Description */}
                                        <p className="text-primary text-sm leading-relaxed line-clamp-3 mb-3 flex-1">
                                            {achievement.description}
                                        </p>

                                        {/* 📊 Bottom Section - Auto positioned at bottom */}
                                        <div className="space-y-2 mt-auto">
                                            {/* Date & Issuer */}
                                            <div className="flex items-center gap-3 text-xs text-muted">
                                                <span className="flex items-center gap-1 flex-shrink-0">
                                                    <FiCalendar size={11} />
                                                    {new Date(achievement.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short'
                                                    })}
                                                </span>
                                                {achievement.issuer && (
                                                    <span className="truncate text-xs">{achievement.issuer}</span>
                                                )}
                                            </div>

                                            {/* Metrics - Condensed */}
                                            {achievement.metrics && (
                                                <div className="flex flex-wrap gap-1">
                                                    {achievement.metrics.ranking && (
                                                        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs font-medium">
                                                            <FiTrendingUp size={10} />
                                                            <span className="text-xs">{achievement.metrics.ranking}</span>
                                                        </span>
                                                    )}
                                                    {achievement.metrics.participants && (
                                                        <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium">
                                                            <FiUsers size={10} />
                                                            <span className="text-xs">{achievement.metrics.participants}</span>
                                                        </span>
                                                    )}
                                                    {achievement.metrics.score && (
                                                        <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-medium">
                                                            <FiStar size={10} />
                                                            <span className="text-xs">{achievement.metrics.score}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Skills - Limited and condensed */}
                                            {achievement.skills && achievement.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {achievement.skills.slice(0, 2).map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="exp-tech-badge px-2 py-1 text-xs rounded-full font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {achievement.skills.length > 2 && (
                                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-muted text-xs rounded-full font-medium">
                                                            +{achievement.skills.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Verification Link */}
                                            {achievement.credentialUrl && (
                                                <div className="flex items-center justify-between pt-2 border-t border-themed">
                                                    <span className="text-xs text-muted">Verified</span>
                                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                        <FiExternalLink size={11} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* 📱 Show More Button - Mobile & Desktop with Dynamic 2-Row Limit */}
                {((isMobile && !showAllMobile && filteredAchievements.length > 3) ||
                    (!isMobile && !showAllDesktop && filteredAchievements.length > cardsPerRow * 2)) && (
                        <div className="flex justify-center mt-8">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleShowMore}
                                className="flex items-center gap-2 px-4 py-2 border-2 text-[#60CAD9] hover:bg-[#60CAD9] hover:text-white rounded-full font-medium transition-all duration-300"
                                style={{ borderColor: '#60CAD9', color: '#60CAD9' }}
                            >
                                <span>Show {filteredAchievements.length - achievementsToDisplay.length} More</span>
                                <FiTrendingUp size={16} />
                            </motion.button>
                        </div>
                    )}

                {/* Floating Show Less Button - Mobile & Desktop */}
                <AnimatePresence>
                    {((isMobile && showAllMobile && filteredAchievements.length > 3) ||
                        (!isMobile && showAllDesktop && filteredAchievements.length > cardsPerRow * 2)) &&
                        showFloatingButton && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="fixed bottom-20 right-4 z-50"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleShowLess}
                                    className="flex items-center gap-2 px-4 py-2 border-2 text-[#60CAD9] hover:bg-[#60CAD9] hover:text-white rounded-full font-medium shadow-xl bg-white dark:bg-gray-900 transition-all duration-300"
                                    style={{ borderColor: '#60CAD9', color: '#60CAD9' }}
                                >
                                    <span>Show Less</span>
                                    <motion.div
                                        animate={{ rotate: 180 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FiTrendingUp size={16} />
                                    </motion.div>
                                </motion.button>
                            </motion.div>
                        )}
                </AnimatePresence>

                {/* �📊 Empty State */}
                {filteredAchievements.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🏆</div>
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            No achievements found for "{selectedCategory}"
                        </h3>
                        <p className="text-muted mb-6">
                            Try selecting a different category to see more achievements.
                        </p>
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Show All Achievements
                        </button>
                    </div>
                )}

                {/* 📈 Statistics Summary
                <div className="mt-16 text-center">
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <div className="text-2xl font-bold text-primary">{achievements.length}</div>
                            <div className="text-sm text-muted">Total Achievements</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
                            <div className="text-sm text-muted">Categories</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-primary">
                                {achievements.filter(a => new Date(a.date).getFullYear() === new Date().getFullYear()).length}
                            </div>
                            <div className="text-sm text-muted">This Year</div>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Achievement Modal */}
            <AchievementModal
                achievement={selectedAchievement}
                isOpen={!!selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
            />
        </section>
    );
};

export default AchievementSection;
