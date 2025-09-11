'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload } from 'react-icons/fi';
import { useImageModal } from '@/contexts/ImageModalContext';
import { OptimizedImage } from './OptimizedImageNew';

const GlobalImageModal: React.FC = () => {
    const { imageModal, closeImageModal } = useImageModal();

    // Debug: Log when modal opens
    React.useEffect(() => {
        if (imageModal.isOpen && process.env.NODE_ENV === 'development') {
            console.log('🖼️ GlobalImageModal opened with:', {
                src: imageModal.src,
                alt: imageModal.alt,
                isOpen: imageModal.isOpen
            });
        }
    }, [imageModal]);

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeImageModal();
        }
    };

    const handleDownload = () => {
        if (imageModal.src) {
            const link = document.createElement('a');
            link.href = imageModal.src;
            link.download = imageModal.alt || 'image';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {imageModal.isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeImageModal}
                        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 text-white backdrop-blur-sm"
                        aria-label="Close image"
                    >
                        <FiX size={24} />
                    </button>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        className="absolute top-4 right-16 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 text-white backdrop-blur-sm"
                        aria-label="Download image"
                    >
                        <FiDownload size={20} />
                    </button>

                    {/* Image Container */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <OptimizedImage
                                src={imageModal.src}
                                alt={imageModal.alt}
                                fill
                                className="object-contain rounded-lg shadow-2xl"
                                sizes="90vw"
                                quality={90}
                                priority
                                onError={() => process.env.NODE_ENV === 'development' && console.error('❌ Image failed to load:', imageModal.src)}
                                onLoad={() => process.env.NODE_ENV === 'development' && console.log('✅ Image loaded successfully:', imageModal.src)}
                            />
                        </div>

                        {/* Image Caption */}
                        {imageModal.alt && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                                {imageModal.alt}
                            </div>
                        )}
                    </motion.div>

                    {/* Instructions */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
                        Click outside image or press ESC to close
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalImageModal;