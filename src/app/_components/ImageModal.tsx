'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { OptimizedImage } from './OptimizedImageNew';

interface ImageModalProps {
    src: string;
    alt: string;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * 🖼️ Image Modal Component
 * 
 * Features:
 * - 📱 Responsive full-screen image viewer
 * - ✨ Smooth animations with framer-motion
 * - 🎯 Click outside to close
 * - ⌨️ Keyboard ESC support
 * - 🔧 Optimized image loading
 */
const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring' as const,
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
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

    // Handle ESC key press
    React.useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white"
                        aria-label="Close image"
                    >
                        <FiX size={24} />
                    </button>

                    {/* Image Container */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <OptimizedImage
                                src={src}
                                alt={alt}
                                width={1200}
                                height={800}
                                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                                priority
                            />
                        </div>

                        {/* Image Caption */}
                        {alt && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-4 rounded-b-lg">
                                <p className="text-sm text-center">{alt}</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageModal;
