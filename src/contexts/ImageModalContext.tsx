'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImageModalState {
    src: string;
    alt: string;
    isOpen: boolean;
}

interface ImageModalContextType {
    openImageModal: (src: string, alt: string) => void;
    closeImageModal: () => void;
    imageModal: ImageModalState;
}

const ImageModalContext = createContext<ImageModalContextType | undefined>(undefined);

export const useImageModal = (): ImageModalContextType => {
    const context = useContext(ImageModalContext);
    if (!context) {
        throw new Error('useImageModal must be used within an ImageModalProvider');
    }
    return context;
};

interface ImageModalProviderProps {
    children: ReactNode;
}

export const ImageModalProvider: React.FC<ImageModalProviderProps> = ({ children }) => {
    const [imageModal, setImageModal] = useState<ImageModalState>({
        src: '',
        alt: '',
        isOpen: false
    });

    const openImageModal = (src: string, alt: string) => {
        console.log('🔥 openImageModal called with:', { src, alt });
        setImageModal({
            src,
            alt,
            isOpen: true
        });
    };

    const closeImageModal = () => {
        setImageModal(prev => ({
            ...prev,
            isOpen: false
        }));
    };

    const value: ImageModalContextType = {
        openImageModal,
        closeImageModal,
        imageModal
    };

    return (
        <ImageModalContext.Provider value={value}>
            {children}
        </ImageModalContext.Provider>
    );
};