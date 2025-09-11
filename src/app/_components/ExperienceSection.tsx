'use client';

import React, { useRef, useState } from 'react';
import { workExperience } from '@/data/experience';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { OptimizedImage } from './OptimizedImageNew';

interface ExperienceCardProps {
    experience: typeof workExperience[0];
    index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {

    const formatDate = (dateString: string) => {
        if (dateString === 'Present') return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    const getCompanyLogo = (companyName: string, size: 'sm' | 'md' = 'md') => {
        // Create a professional company initial logo
        const initial = companyName.charAt(0).toUpperCase();
        const dimension = size === 'sm' ? 28 : 40;
        const fontSize = size === 'sm' ? 14 : 16;
        const textY = size === 'sm' ? 20 : 26;

        // Using a more professional gradient background
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="${dimension}" height="${dimension}" viewBox="0 0 ${dimension} ${dimension}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#A855F7;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="${dimension}" height="${dimension}" rx="6" fill="url(#grad)"/>
                <text x="${dimension / 2}" y="${textY}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="600" text-anchor="middle" fill="white">${initial}</text>
            </svg>
        `)}`;
    };

    // Company Logo Component with better error handling
    const CompanyLogo: React.FC<{ experience: typeof workExperience[0]; size?: 'sm' | 'md' }> = ({
        experience,
        size = 'md'
    }) => {
        const [imgSrc, setImgSrc] = useState(experience.companyLogo || getCompanyLogo(experience.company, size));
        const [hasError, setHasError] = useState(false);

        const sizeClasses = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';

        const handleImageError = () => {
            if (!hasError) {
                setHasError(true);
                setImgSrc(getCompanyLogo(experience.company, size));
            }
        };

        return (
            <div className={`${sizeClasses} flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-sm`}>
                <img
                    src={imgSrc}
                    alt={`${experience.company} logo`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={handleImageError}
                    loading="lazy"
                />
            </div>
        );
    };

    return (
        <div
            className={`${index < workExperience.length - 1 ? 'mb-8' : 'mb-0'} flex w-full`}
        >
            {/* Desktop Timeline Layout */}
            <div className="hidden lg:flex w-full flex-row">
                {/* Timeline Left - Reduced margin */}
                <div className="flex flex-col items-center mr-6">
                    <div className="timeline-dot w-4 h-4 exp-timeline-dot rounded-full border-4 border-white dark:border-slate-900 shadow-lg mt-8"></div>
                    {index < workExperience.length - 1 && (
                        <div className="w-0.5 min-h-[200px] exp-timeline-line mt-2"></div>
                    )}
                </div>

                {/* Content Card - Limited Width */}
                <div className="flex-1 max-w-4xl">
                    <div className=" rounded-lg p-4 border border-themed exp-card-bg">
                        {/* Header Row with Company Info and Dates */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
                            {/* Left Column: Company Info */}
                            <div className="lg:col-span-2 flex items-center">
                                <CompanyLogo experience={experience} />
                                <div className="ml-3">
                                    <h3 className="text-lg font-bold text-primary font-kalam">
                                        {experience.position}
                                    </h3>
                                    <p className="text-brand-primary font-semibold text-sm">
                                        {experience.company}
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Date Info */}
                            <div className="lg:text-right lg:col-span-1">
                                <div className="text-xs text-muted">
                                    <p className="font-medium">
                                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                                    </p>
                                    <p>{experience.location} • {experience.type}</p>
                                </div>
                            </div>
                        </div>

                        {/* Two Column Layout for Content - 40% / 60% split */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                            {/* Left Column: Description (40% - 2 of 5 columns) */}
                            <div className="lg:col-span-2">
                                <p className="text-primary leading-relaxed text-sm">
                                    {experience.description}
                                </p>
                            </div>

                            {/* Right Column: Achievements (60% - 3 of 5 columns) */}
                            <div className="lg:col-span-3 lg:border-l border-themed lg:pl-4">
                                <h4 className="text-xs font-semibold text-primary mb-2">
                                    Key Achievements:
                                </h4>
                                <ul className="text-xs text-muted space-y-1">
                                    {experience.achievements.slice(0, 3).map((achievement, idx) => (
                                        <li key={idx} className="leading-relaxed">
                                            • {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Full Width Row for Technologies */}
                        <div className="mt-3 pt-3 ">
                            <div className="flex flex-wrap gap-1 justify-start">
                                {experience.technologies.slice(0, 6).map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="exp-tech-badge px-2 py-1 text-xs rounded-full font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden w-full">
                <div className="flex">
                    <div className="flex flex-col items-center mr-3">
                        <div className="w-3 h-3 exp-timeline-dot rounded-full border-2 border-white dark:border-slate-900 shadow-lg mt-2"></div>
                        {index < workExperience.length - 1 && (
                            <div className="w-0.5 min-h-[150px] exp-timeline-line mt-2"></div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="experience-card rounded-lg p-2 sm:p-3 mb-3 border border-themed exp-card-bg">
                            {/* Header: Company Info + Date in responsive columns */}
                            <div className="grid grid-cols-1 gap-2 mb-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <CompanyLogo experience={experience} size="sm" />
                                        <div className="min-w-0 flex-1 ml-2">
                                            <h3 className="text-sm font-bold text-primary font-kalam truncate">
                                                {experience.position}
                                            </h3>
                                            <p className="text-brand-primary font-semibold text-xs truncate">
                                                {experience.company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-2">
                                        <div className="text-xs text-muted">
                                            <p className="font-medium whitespace-nowrap">
                                                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                                            </p>
                                            <p className="whitespace-nowrap">{experience.location} • {experience.type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content: Description */}
                            <div className="mb-2">
                                <p className="text-primary leading-relaxed text-xs">
                                    {experience.description}
                                </p>
                            </div>

                            {/* Achievements - Compact List */}
                            <div className="mb-2">
                                <h4 className="text-xs font-semibold text-primary mb-1">
                                    Key Achievements:
                                </h4>
                                <ul className="text-xs text-muted space-y-1">
                                    {experience.achievements.slice(0, 2).map((achievement, idx) => (
                                        <li key={idx} className="leading-relaxed">
                                            • {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies - Full Width */}
                            <div className="flex flex-wrap gap-1">
                                {experience.technologies.slice(0, 4).map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="exp-tech-badge px-2 py-1 text-xs rounded-full font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExperienceSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
            id="experience"
            aria-labelledby="experience-heading"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        id="experience-heading"
                        className="text-4xl md:text-5xl font-bold text-primary mb-4 font-kalam"
                    >
                        Work Experience
                    </h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
                    ></motion.div>                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        My professional journey building scalable applications and delivering impactful solutions
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative px-2 sm:pl-2 sm:pr-0">
                    {/* Experience Cards */}
                    {workExperience.map((experience, index) => (
                        <div key={experience.id}>
                            <ExperienceCard
                                experience={experience}
                                index={index}
                            />
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default ExperienceSection;
