'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiX,
    FiExternalLink,
    FiCalendar,
    FiUsers,
    FiStar,
    FiTrendingUp,
    FiAward,
    FiBookOpen,
    FiTarget,
    FiGithub,
    FiCheckCircle,
    FiShare2,
    FiCode,
    FiShield
} from 'react-icons/fi';
import { Achievement } from '@/data/achievements';

interface AchievementModalProps {
    achievement: Achievement | null;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * 🏆 Achievement Modal Component
 * 
 * Features:
 * - 📱 Responsive modal design
 * - 🔗 External verification links
 * - 📊 Detailed metrics display
 * - 🏷️ Skills and categories
 * - ✨ Smooth animations
 * - 🎯 Achievement importance indicators
 */
const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, isOpen, onClose }) => {
    if (!achievement) return null;

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

    // Get importance styling
    const getImportanceStyle = (importance: Achievement['importance']) => {
        const styleMap = {
            'High': {
                bg: 'bg-purple-500',
                text: 'text-white',
                icon: '🏆'
            },
            'Medium': {
                bg: 'bg-sky-400 dark:bg-sky-600',
                text: 'text-white',
                icon: '🥈'
            },
            'Low': {
                bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
                text: 'text-white',
                icon: '🥉'
            }
        };
        return styleMap[importance];
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Share achievement
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: achievement.title,
                    text: achievement.description,
                    url: achievement.credentialUrl || window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(`${achievement.title}: ${achievement.description}`);
        }
    };

    const IconComponent = getCategoryIcon(achievement.category);
    const importanceStyle = getImportanceStyle(achievement.importance);

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
                        className="relative surface-elevated rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        {/* 🚀 Header with Gradient Background */}
                        <div className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-600 p-6 rounded-t-2xl">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
                            >
                                <FiX size={20} />
                            </button>

                            {/* Category & Importance */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <IconComponent size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                                            {achievement.category}
                                        </span>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${importanceStyle.bg} ${importanceStyle.text}`}>
                                    <span>{importanceStyle.icon}</span>
                                    <span className="text-sm font-bold">{achievement.importance}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-kalam">
                                {achievement.title}
                            </h2>

                            {/* Date & Issuer */}
                            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                                <div className="flex items-center gap-2">
                                    <FiCalendar size={16} />
                                    <span>{formatDate(achievement.date)}</span>
                                </div>
                                {achievement.issuer && (
                                    <div className="flex items-center gap-2">
                                        <FiCheckCircle size={16} />
                                        <span>{achievement.issuer}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            {/* 📝 Description */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-primary mb-3 font-kalam flex items-center gap-2">
                                    <FiBookOpen size={20} />
                                    About This Achievement
                                </h3>
                                <p className="text-primary leading-relaxed text-sm">
                                    {achievement.description}
                                </p>
                            </div>

                            {/* �️ Image Gallery */}
                            {(achievement.images && achievement.images.length > 0) && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-primary mb-3 font-kalam flex items-center gap-2">
                                        <FiGithub size={20} />
                                        Achievement Gallery
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {achievement.images.map((imageUrl, index) => (
                                            <div key={index} className="relative overflow-hidden rounded-lg border border-themed hover:border-primary-light transition-colors duration-300">
                                                <img
                                                    src={imageUrl}
                                                    alt={`${achievement.title} - Image ${index + 1}`}
                                                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* �📊 Metrics */}
                            {achievement.metrics && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-primary mb-3 font-kalam flex items-center gap-2">
                                        <FiTrendingUp size={20} />
                                        Achievement Metrics
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {achievement.metrics.ranking && (
                                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                                                    🏆
                                                </div>
                                                <div className="text-lg font-semibold text-green-800 dark:text-green-300">
                                                    {achievement.metrics.ranking}
                                                </div>
                                                <div className="text-xs text-green-600 dark:text-green-400">Ranking</div>
                                            </div>
                                        )}
                                        {achievement.metrics.participants && (
                                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                                    👥
                                                </div>
                                                <div className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                                                    {achievement.metrics.participants.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-blue-600 dark:text-blue-400">Participants</div>
                                            </div>
                                        )}
                                        {achievement.metrics.score && (
                                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                                    ⭐
                                                </div>
                                                <div className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                                                    {achievement.metrics.score}
                                                </div>
                                                <div className="text-xs text-purple-600 dark:text-purple-400">Score</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* 🏷️ Related Skills */}
                            {achievement.skills && achievement.skills.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-primary mb-3 font-kalam flex items-center gap-2">
                                        <FiTarget size={20} />
                                        Related Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {achievement.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="exp-tech-badge px-3 py-1 text-sm rounded-full font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 🔗 Actions */}
                            <div className="flex flex-wrap gap-3 pt-6 border-t border-themed">
                                {achievement.credentialUrl && (
                                    <a
                                        href={achievement.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <FiExternalLink size={16} />
                                        Verify Credential
                                    </a>
                                )}
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <FiShare2 size={16} />
                                    Share Achievement
                                </button>
                            </div>

                            {/* 🎯 Verification Badge */}
                            {achievement.credentialUrl && (
                                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                                    <div className="flex items-center gap-2">
                                        <FiCheckCircle className="text-green-500" size={20} />
                                        <div>
                                            <div className="text-sm font-medium text-green-800 dark:text-green-300">
                                                Verified Achievement
                                            </div>
                                            <div className="text-xs text-green-600 dark:text-green-400">
                                                This achievement has been verified and can be validated through the credential link.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AchievementModal;
