'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
    FiBook,
    FiBookOpen,
    FiAward,
    FiTarget,
    FiCalendar,
    FiMapPin,
    FiExternalLink,
    FiUser,
    FiUsers,
    FiShield,
    FiChevronDown,
    FiChevronUp,
    FiHome
} from 'react-icons/fi';
import { OptimizedImage } from './OptimizedImage';
import { education } from '../../data/education';
import type { Education } from '../../data/education';

interface EducationSectionProps {
    id?: string;
}

type FilterType = 'all' | 'degree' | 'certification';

const EducationSection: React.FC<EducationSectionProps> = ({ id = 'education' }) => {
    const [activeTab, setActiveTab] = useState<FilterType>('all');
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef, { once: true, amount: 0.2 });

    // Handle logo loading errors
    const handleLogoError = (eduId: string) => {
        setLogoErrors(prev => new Set([...prev, eduId]));
    };

    // Get fallback icon based on education type
    const getFallbackIcon = (edu: Education) => {
        const iconProps = {
            size: 20,
            className: "text-brand-primary"
        };

        if (edu.degree.includes('Bachelor') || edu.degree.includes('Master') || edu.degree.includes('PhD') || edu.degree.includes('Doctor')) {
            return <FiBook {...iconProps} />;
        } else if (edu.degree.includes('Certification') || edu.degree.includes('Professional')) {
            return <FiAward {...iconProps} />;
        } else if (edu.degree.includes('Secondary') || edu.degree.includes('High School')) {
            return <FiHome {...iconProps} />;
        } else {
            return <FiBookOpen {...iconProps} />;
        }
    };

    // Filter education based on active tab
    const filteredEducation = (): Education[] => {
        switch (activeTab) {
            case 'degree':
                return education.filter(edu =>
                    edu.degree.includes('Bachelor') ||
                    edu.degree.includes('Master') ||
                    edu.degree.includes('PhD') ||
                    edu.degree.includes('Doctor')
                );
            case 'certification':
                return education.filter(edu =>
                    edu.degree.includes('Certification') ||
                    edu.degree.includes('Professional') ||
                    edu.degree.includes('Certificate')
                );
            default:
                return education;
        }
    };

    // Get appropriate icon for education type
    const getEducationIcon = (education: Education) => {
        if (education.degree.includes('Bachelor') || education.degree.includes('Master') || education.degree.includes('PhD')) {
            return FiBook;
        }
        if (education.degree.includes('Certification') || education.degree.includes('Professional')) {
            return FiShield;
        }
        return FiBookOpen;
    };

    // Toggle card expansion
    const toggleCardExpansion = (educationId: string) => {
        setExpandedCard(expandedCard === educationId ? null : educationId);
    };

    return (
        <section ref={sectionRef} id="education" className="py-20 relative overflow-hidden">
            <div className="adaptive-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-kalam">
                        Education & Learning
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
                    ></motion.div>
                    <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
                        My educational journey, from formal degree programs to continuous professional development,
                        shaping the foundation of my technical expertise and lifelong learning mindset.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-1 mb-12">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${activeTab === 'all'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-themed text-primary hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30'
                            }`}
                    >
                        All Education
                    </button>
                    <button
                        onClick={() => setActiveTab('degree')}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${activeTab === 'degree'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-themed text-primary hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30'
                            }`}
                    >
                        Degrees
                    </button>
                    <button
                        onClick={() => setActiveTab('certification')}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${activeTab === 'certification'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-themed text-primary hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30'
                            }`}
                    >
                        Certifications
                    </button>
                </div>

                {/* Education Timeline */}
                <div className="relative">
                    {/* Timeline Line - Improved positioning and styling */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 exp-timeline-line"></div>

                    {/* Education Cards */}
                    {filteredEducation().map((edu, index) => {
                        const IconComponent = getEducationIcon(edu);
                        const isExpanded = expandedCard === edu.id;

                        return (
                            <div
                                key={edu.id}
                                className="relative mb-8 pl-14"
                            >
                                {/* Timeline Node - Better positioning and styling */}
                                <div className="absolute left-4 top-6 w-4 h-4 exp-timeline-dot rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
                                
                                {/* Timeline Line Extension - Connect to next card */}
                                {index < filteredEducation().length - 1 && (
                                    <div className="absolute left-6 top-10 w-0.5 h-8 exp-timeline-line"></div>
                                )}

                                {/* Education Card */}
                                <div className="experience-card rounded-lg transition-all duration-300 p-4 border border-themed exp-card-bg relative">

                                    {/* Card Header */}
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-3">
                                        {/* Left side: Institution Logo, Name & Degree */}
                                        <div className="flex items-start gap-3 flex-1">
                                            {/* Institution Logo with Fallback */}
                                            <div className="flex-shrink-0">
                                                {edu.logo && !logoErrors.has(edu.id) ? (
                                                    <OptimizedImage
                                                        src={edu.logo}
                                                        alt={`${edu.institution} logo`}
                                                        width={40}
                                                        height={40}
                                                        className="w-10 h-10 object-contain rounded-lg bg-white dark:bg-gray-800 p-1"
                                                        onError={() => handleLogoError(edu.id)}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary/10 to-brand-primary/20 dark:from-brand-primary/20 dark:to-brand-primary/30 border border-brand-primary/20 dark:border-brand-primary/30 flex items-center justify-center">
                                                        {getFallbackIcon(edu)}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                {/* Institution Name */}
                                                <h3 className="text-lg font-bold text-primary font-kalam leading-tight mb-1">
                                                    {edu.institution}
                                                </h3>
                                                {/* Degree */}
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-sm text-brand-primary font-semibold">
                                                        {edu.degree}
                                                    </p>

                                                    {/* GPA */}
                                                    {edu.gpa && (
                                                        <span className="min-w-max px-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm rounded border border-green-200 dark:border-green-700">
                                                            GPA: {edu.gpa}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right side: Date & Location */}
                                        <div className="lg:text-right flex-shrink-0 lg:pr-28">
                                            <div className="text-xs text-muted">
                                                <p className="font-medium flex items-center lg:justify-end gap-1 mb-1">
                                                    <FiCalendar size={12} />
                                                    {edu.startDate} - {edu.endDate}
                                                </p>
                                                {edu.location && (
                                                    <p className="flex items-center lg:justify-end gap-1">
                                                        <FiMapPin size={12} />
                                                        {edu.location}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Toggle Button - Responsive positioning */}
                                        {(
                                            (edu.coursework && edu.coursework.length > 4) ||
                                            (edu.achievements && edu.achievements.length > 0) ||
                                            (edu.activities && edu.activities.length > 0) ||
                                            edu.thesis ||
                                            edu.website
                                        ) && (
                                                <div className="lg:absolute lg:top-4 lg:right-4">
                                                    <button
                                                        onClick={() => toggleCardExpansion(edu.id)}
                                                        className="px-2 py-1 text-xs font-medium border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-all duration-200 flex items-center gap-1"
                                                        title={isExpanded ? 'Show Less' : 'Show More'}
                                                    >
                                                        <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                                                        {isExpanded ? (
                                                            <FiChevronUp size={12} />
                                                        ) : (
                                                            <FiChevronDown size={12} />
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                    </div>


                                    {/* Main Content Grid - Compact layout with columns */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {/* Left Column: Field of Study & Description */}
                                        <div className="space-y-2">
                                            {/* Field of Study */}
                                            <div>
                                                <p className="text-primary font-medium text-sm">{edu.field}</p>
                                            </div>

                                            {/* Description */}
                                            {edu.description && (
                                                <div>
                                                    <p className="text-muted text-sm leading-relaxed">
                                                        {edu.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column: Relevant Coursework */}
                                        {edu.coursework && edu.coursework.length > 0 && (
                                            <div>
                                                <h4 className="flex items-center gap-1 text-sm font-semibold text-primary mb-2">
                                                    <FiBook size={12} />
                                                    Relevant Coursework
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {edu.coursework.slice(0, 4).map((course, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-200 dark:border-blue-700"
                                                        >
                                                            {course}
                                                        </span>
                                                    ))}
                                                    {/* Show remaining coursework inline when expanded */}
                                                    {isExpanded && edu.coursework.length > 4 && (
                                                        <>
                                                            {edu.coursework.slice(4).map((course, idx) => (
                                                                <span
                                                                    key={idx + 4}
                                                                    className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-200 dark:border-blue-700"
                                                                >
                                                                    {course}
                                                                </span>
                                                            ))}
                                                        </>
                                                    )}
                                                    {!isExpanded && edu.coursework.length > 4 && (
                                                        <button
                                                            onClick={() => toggleCardExpansion(edu.id)}
                                                            className="px-1.5 py-0.5 bg-gray-50 dark:bg-gray-800 text-muted text-xs rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                                                            title="Click to show all coursework"
                                                        >
                                                            +{edu.coursework.length - 4}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Expandable Content - Using columns for better space utilization */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="pt-2 border-t border-themed"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {/* Left Column: Achievements */}
                                                    {edu.achievements && edu.achievements.length > 0 && (
                                                        <div>
                                                            <h4 className="flex items-center gap-1 text-sm font-semibold text-primary mb-2">
                                                                <FiAward size={12} />
                                                                Achievements
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {edu.achievements.map((achievement, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                                                                        <FiTarget size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                                        {achievement}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Right Column: Activities & Leadership */}
                                                    {edu.activities && edu.activities.length > 0 && (
                                                        <div>
                                                            <h4 className="flex items-center gap-1 text-sm font-semibold text-primary mb-2">
                                                                <FiUsers size={12} />
                                                                Activities & Leadership
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {edu.activities.map((activity, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                                                                        <FiUser size={12} className="text-purple-500 mt-0.5 flex-shrink-0" />
                                                                        {activity}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Thesis */}
                                                {edu.thesis && (
                                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700/30 mt-3">
                                                        <h4 className="flex items-center gap-1 text-sm font-semibold text-primary mb-2">
                                                            <FiBookOpen size={12} />
                                                            Thesis Project
                                                        </h4>
                                                        <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2 text-sm">
                                                            {edu.thesis.title}
                                                        </h5>
                                                        <p className="text-sm text-muted mb-2">
                                                            {edu.thesis.description}
                                                        </p>
                                                        {edu.thesis.advisor && (
                                                            <p className="text-xs text-muted">
                                                                Advisor: {edu.thesis.advisor}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Website Link */}
                                                {edu.website && (
                                                    <div className="pt-2 mt-3">
                                                        <a
                                                            href={edu.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200"
                                                        >
                                                            <FiExternalLink size={12} />
                                                            Visit Institution
                                                        </a>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16 pt-12 border-t border-themed">
                    <h3 className="text-xl font-bold text-primary mb-4">
                        Continuous Learning Journey
                    </h3>
                    <p className="text-muted max-w-2xl mx-auto mb-6">
                        Education doesn't stop after graduation. I'm constantly learning new technologies,
                        earning certifications, and staying updated with industry trends.
                    </p>
                    <div className="flex justify-center gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {education.filter(edu => edu.endDate === 'Present').length}
                            </div>
                            <div className="text-sm text-muted">Ongoing Programs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {education.reduce((sum, edu) => sum + (edu.coursework?.length || 0), 0)}
                            </div>
                            <div className="text-sm text-muted">Courses Completed</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
