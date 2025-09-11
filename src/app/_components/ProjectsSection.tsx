'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FiGithub, FiEye, FiCalendar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { projects, Project } from '@/data/projects';
import { OptimizedImage } from './OptimizedImageNew';
import ProjectModal from './ProjectModal';
import { useImageModal } from '@/contexts/ImageModalContext';
import { motion, useInView } from 'framer-motion';


const ProjectsSection: React.FC = () => {
    const { openImageModal } = useImageModal();
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [expandedTechs, setExpandedTechs] = useState<Set<string>>(new Set());
    const [showAllMobile, setShowAllMobile] = useState<boolean>(false);
    const [showAllDesktop, setShowAllDesktop] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isInViewport, setIsInViewport] = useState<boolean>(false);
    const [cardsPerRow, setCardsPerRow] = useState<number>(2); // Default estimate for projects
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef, { once: true, amount: 0.2 });

    // Check screen size and calculate cards per row dynamically for projects
    useEffect(() => {
        const calculateProjectCardsPerRow = () => {
            const width = window.innerWidth;
            const isMobileSize = width < 768;

            if (isMobileSize) {
                return 1; // Mobile and tablet show 1 project per row
            }

            // Calculate based on project grid CSS auto-fit logic
            // Using minmax values for projects: minmax(350px-400px, 1fr)
            let minCardWidth = 350;
            let gap = 24; // 1.5rem = 24px

            // Adjust based on CSS breakpoints for projects
            if (width >= 1400) {
                minCardWidth = 380;
                gap = 24; // 1.5rem
            } else if (width >= 1025) {
                minCardWidth = 350;
                gap = 24;
            } else {
                // Tablet and below show 1 per row
                return 1;
            }

            // Calculate container width (accounting for padding)
            const containerPadding = width < 640 ? 32 : width < 1024 ? 64 : 128;
            const availableWidth = width - containerPadding;

            // Calculate how many project cards fit per row
            const cardsInRow = Math.floor((availableWidth + gap) / (minCardWidth + gap));
            return Math.max(1, cardsInRow);
        };

        const checkScreenSize = () => {
            const isMobileSize = window.innerWidth < 768;
            setIsMobile(isMobileSize);
            setCardsPerRow(calculateProjectCardsPerRow());
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Intersection Observer to detect if section is in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            {
                threshold: 0.3, // Trigger when 30% of section is visible
                rootMargin: '-50px 0px -50px 0px' // Add some margin for better UX
            }
        );

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    // Reset show states when filter changes
    useEffect(() => {
        setShowAllMobile(false);
        setShowAllDesktop(false);
    }, [selectedFilter]);

    // Get unique technologies for filter
    const allTechnologies = useMemo(() => {
        const techs = new Set<string>();
        projects.forEach(project => {
            project.technologies.forEach(tech => techs.add(tech));
        });
        return Array.from(techs).sort();
    }, []);

    // Filter projects based on selected technology
    const filteredProjects = useMemo(() => {
        if (selectedFilter === 'All') return projects;
        return projects.filter(project =>
            project.technologies.includes(selectedFilter)
        );
    }, [selectedFilter]);

    // Get featured projects for mobile default view (prioritize featured, then recent)
    const featuredProjects = useMemo(() => {
        const featured = filteredProjects.filter(project => project.featured);
        const nonFeatured = filteredProjects.filter(project => !project.featured);
        return [...featured, ...nonFeatured].slice(0, 3);
    }, [filteredProjects]);

    // Get projects for desktop 2-row limit (dynamic based on screen size)
    const twoRowDesktopProjects = useMemo(() => {
        const maxProjectsForTwoRows = cardsPerRow * 2;
        return filteredProjects.slice(0, maxProjectsForTwoRows);
    }, [filteredProjects, cardsPerRow]);

    // Get projects to display based on screen size and show state
    const projectsToDisplay = useMemo(() => {
        if (isMobile) {
            // On mobile, show only featured/recent by default, all when expanded
            return showAllMobile ? filteredProjects : featuredProjects;
        } else {
            // On desktop, show 2 rows by default (dynamic based on screen), all when expanded
            return showAllDesktop ? filteredProjects : twoRowDesktopProjects;
        }
    }, [filteredProjects, featuredProjects, twoRowDesktopProjects, showAllMobile, showAllDesktop, isMobile]);

    const toggleTechExpansion = (projectId: string) => {
        setExpandedTechs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(projectId)) {
                newSet.delete(projectId);
            } else {
                newSet.add(projectId);
            }
            return newSet;
        });
    };

    // Handle show more for both mobile and desktop
    const handleShowMore = () => {
        if (isMobile) {
            setShowAllMobile(true);
        } else {
            setShowAllDesktop(true);
        }
    };

    // Handle show less for both mobile and desktop
    const handleShowLess = () => {
        if (isMobile) {
            setShowAllMobile(false);
        } else {
            setShowAllDesktop(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="py-20"
            aria-labelledby="projects-heading"
        >
            <div className="adaptive-container">
                {/* Section Header - Match ExperienceSection exactly */}
                <div className="text-center mb-16">
                    <h2
                        id="projects-heading"
                        className="text-4xl md:text-5xl font-bold text-primary mb-4 font-kalam"
                    >
                        Featured Projects
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"
                    ></motion.div>                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        A showcase of my recent work, featuring full-stack applications,
                        tools, and experiments with modern technologies.
                    </p>
                </div>

                {/* Compact Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-1 mb-12">
                    <button
                        onClick={() => setSelectedFilter('All')}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${selectedFilter === 'All'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        All
                    </button>
                    {allTechnologies.slice(0, 6).map((tech) => (
                        <button
                            key={tech}
                            onClick={() => setSelectedFilter(tech)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${selectedFilter === tech
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {tech}
                        </button>
                    ))}
                </div>

                {/* Projects Grid - Flexible Layout */}
                <div className="projects-grid-flexible">
                    {projectsToDisplay.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative exp-card-bg rounded-lg border border-themed transition-all duration-300 p-4 project-card-width"
                        >
                            {/* Project Image */}
                            <div className="relative h-48 overflow-hidden rounded-lg mb-3 cursor-pointer" onClick={() => openImageModal(project.images?.[0] || '/placeholder-project.svg', project.title)}>
                                <OptimizedImage
                                    src={project.images?.[0] || '/placeholder-project.svg'}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    quality={80}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {project.featured && (
                                    <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        Featured
                                    </div>
                                )}
                                {/* Overlay hint on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                    <FiEye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-primary font-kalam">
                                        {project.title}
                                    </h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${project.status === 'Completed'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : project.status === 'In Progress'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>

                                <p className="text-primary leading-relaxed text-sm line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Project Meta */}
                                <div className="flex items-center gap-4 text-xs text-muted">
                                    <span className="flex items-center gap-1">
                                        <FiCalendar />
                                        {project.startDate}
                                    </span>
                                    {project.teamSize && (
                                        <span className="flex items-center gap-1">
                                            <FiUsers />
                                            {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                                        </span>
                                    )}
                                </div>

                                {/* Technologies - Expandable */}
                                <div>
                                    <div className="flex flex-wrap gap-1">
                                        {(expandedTechs.has(project.id)
                                            ? project.technologies
                                            : project.technologies.slice(0, 6)
                                        ).map((tech, index) => (
                                            <span
                                                key={`${project.id}-tech-${index}`}
                                                className="exp-tech-badge px-2 py-1 text-xs rounded-full font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 6 && (
                                            <button
                                                onClick={() => toggleTechExpansion(project.id)}
                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-muted hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 rounded-full text-xs font-medium transition-colors duration-200"
                                            >
                                                {expandedTechs.has(project.id)
                                                    ? 'Show less'
                                                    : `+${project.technologies.length - 6} more`
                                                }
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-3 border-t border-themed">
                                    <button
                                        onClick={() => {
                                            // Prevent double click issues
                                            if (selectedProject !== project) {
                                                setSelectedProject(project);
                                            }
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-[#60CAD9] hover:from-purple-700 hover:to-[#4fb8c7] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                                    >
                                        <FiEye size={14} />
                                        View Details
                                    </button>
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 exp-card-bg hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors duration-300 text-secondary hover:text-primary border border-themed"
                                            title="View on GitHub"
                                        >
                                            <FiGithub size={16} />
                                        </a>
                                    )}
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 exp-card-bg hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors duration-300 text-secondary hover:text-primary border border-themed"
                                            title="Live Demo"
                                        >
                                            <FiEye size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 📱 Show More Button - Mobile & Desktop with Dynamic 2-Row Limit */}
                {((isMobile && !showAllMobile && filteredProjects.length > 3) ||
                    (!isMobile && !showAllDesktop && filteredProjects.length > cardsPerRow * 2)) && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleShowMore}
                                className="flex items-center gap-2 px-4 py-2 border-2 text-[#60CAD9] hover:bg-[#60CAD9] hover:text-white rounded-full font-medium transition-all duration-300"
                                style={{ borderColor: '#60CAD9', color: '#60CAD9' }}
                            >
                                <span>Show {filteredProjects.length - projectsToDisplay.length} More</span>
                                <FiTrendingUp size={16} />
                            </button>
                        </div>
                    )}

                {/* Floating Show Less Button - Mobile & Desktop */}
                {((isMobile && showAllMobile && filteredProjects.length > 3) ||
                    (!isMobile && showAllDesktop && filteredProjects.length > cardsPerRow * 2)) &&
                    isInViewport && (
                        <div className="fixed bottom-20 right-4 z-50">
                            <button
                                onClick={handleShowLess}
                                className="flex items-center gap-2 px-4 py-2 border-2 text-[#60CAD9] hover:bg-[#60CAD9]  rounded-full font-medium shadow-xl bg-white dark:bg-gray-900 transition-all duration-300"
                                style={{ borderColor: '#60CAD9', color: '#60CAD9' }}
                            >
                                <span>Show Less</span>
                                <div style={{ transform: 'rotate(180deg)', transition: 'transform 0.2s' }}>
                                    <FiTrendingUp size={16} />
                                </div>
                            </button>
                        </div>
                    )}

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-muted text-lg mb-4">
                            No projects found for "{selectedFilter}"
                        </p>
                        <button
                            onClick={() => setSelectedFilter('All')}
                            className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                            View all projects
                        </button>
                    </div>
                )}
            </div>

            {/* Project Detail Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default ProjectsSection;
