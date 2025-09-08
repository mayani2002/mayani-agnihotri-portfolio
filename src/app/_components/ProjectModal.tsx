'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiX,
    FiGithub,
    FiEye,
    FiCalendar,
    FiUsers,
    FiTag,
    FiTrendingUp,
    FiCheckCircle,
    FiAlertTriangle
} from 'react-icons/fi';
import { Project } from '@/data/projects';
import { OptimizedImage } from './OptimizedImage';
import ImageModal from './ImageModal';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    if (!project) return null;

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring' as const,
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative surface-elevated rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar scrollbar-stable"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full surface hover:surface-elevated transition-colors duration-200 text-secondary hover:text-primary"
                        >
                            <FiX size={20} />
                        </button>

                        {/* Project Images */}
                        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl cursor-pointer group" onClick={() => setSelectedImage({ src: project.images[0] || '/placeholder-project.svg', alt: project.title })}>
                            <OptimizedImage
                                src={project.images[0] || '/placeholder-project.svg'}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {project.featured && (
                                <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Featured
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <FiEye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Project Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-primary mb-2 font-kalam">
                                        {project.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-muted">
                                        <span className="flex items-center gap-1">
                                            <FiCalendar />
                                            {project.startDate} {project.endDate && `- ${project.endDate}`}
                                        </span>
                                        {project.teamSize && (
                                            <span className="flex items-center gap-1">
                                                <FiUsers />
                                                {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <FiTag />
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-4 md:mt-0">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 surface hover:surface-elevated rounded-lg text-sm font-medium transition-colors duration-200"
                                        >
                                            <FiGithub />
                                            GitHub
                                        </a>
                                    )}
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-[#60CAD9] hover:from-purple-700 hover:to-[#4fb8c7] text-white rounded-lg text-sm font-medium transition-all duration-300"
                                        >
                                            <FiEye />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Project Status & Role */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'Completed'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : project.status === 'In Progress'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                    }`}>
                                    {project.status}
                                </span>
                                {project.role && (
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                        {project.role}
                                    </span>
                                )}
                            </div>

                            {/* Project Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-primary mb-3 font-kalam">About This Project</h3>
                                <p className="text-primary leading-relaxed text-sm">
                                    {project.longDescription}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-primary mb-3 font-kalam">Technologies Used</h3>
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="exp-tech-badge px-2 py-1 text-xs rounded-full font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project Metrics */}
                            {project.metrics && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2 font-kalam">
                                        <FiTrendingUp />
                                        Project Impact
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {project.metrics.users && (
                                            <div className="text-center p-3 surface rounded-lg">
                                                <div className="text-2xl font-bold text-brand-primary">
                                                    {project.metrics.users}+
                                                </div>
                                                <div className="text-sm text-muted">Users</div>
                                            </div>
                                        )}
                                        {project.metrics.downloads && (
                                            <div className="text-center p-3 surface rounded-lg">
                                                <div className="text-2xl font-bold text-brand-primary">
                                                    {project.metrics.downloads}+
                                                </div>
                                                <div className="text-sm text-muted">Downloads</div>
                                            </div>
                                        )}
                                        {project.metrics.stars && (
                                            <div className="text-center p-3 surface rounded-lg">
                                                <div className="text-2xl font-bold text-brand-primary">
                                                    {project.metrics.stars}+
                                                </div>
                                                <div className="text-sm text-muted">GitHub Stars</div>
                                            </div>
                                        )}
                                        {project.metrics.performance && (
                                            <div className="text-center p-3 surface rounded-lg">
                                                <div className="text-2xl font-bold text-brand-primary">
                                                    {project.metrics.performance}
                                                </div>
                                                <div className="text-sm text-muted">Performance</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Challenges & Learnings */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {project.challenges && project.challenges.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2 font-kalam">
                                            <FiAlertTriangle />
                                            Key Challenges
                                        </h3>
                                        <ul className="space-y-2">
                                            {project.challenges.map((challenge, index) => (
                                                <li key={`${project.id}-challenge-${index}-${challenge.slice(0, 10)}`} className="flex items-start gap-2 text-primary text-sm leading-relaxed">
                                                    <span className="text-orange-500 mt-1">•</span>
                                                    {challenge}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.learnings && project.learnings.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2 font-kalam">
                                            <FiCheckCircle />
                                            Key Learnings
                                        </h3>
                                        <ul className="space-y-2">
                                            {project.learnings.map((learning, index) => (
                                                <li key={`${project.id}-learning-${index}-${learning.slice(0, 10)}`} className="flex items-start gap-2 text-primary text-sm leading-relaxed">
                                                    <span className="text-green-500 mt-1">•</span>
                                                    {learning}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Image Modal */}
            <ImageModal
                src={selectedImage?.src || ''}
                alt={selectedImage?.alt || ''}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </AnimatePresence>
    );
};

export default ProjectModal;
