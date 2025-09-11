'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    priority?: boolean;
    width?: number;
    height?: number;
    quality?: number;
    onLoad?: () => void;
    onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    fill = false,
    className = '',
    sizes,
    priority = false,
    width,
    height,
    quality = 75,
    onLoad,
    onError,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        if (process.env.NODE_ENV === 'development') {
            console.log('✅ OptimizedImage loaded:', src);
        }
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
    };

    const handleError = () => {
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ OptimizedImage failed to load:', src);
        }
        setIsLoading(false);
        setHasError(true);
        onError?.();
    };

    // Show placeholder for missing images
    if (!src || src === '/placeholder-project.svg') {
        return (
            <div className={`bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center ${className}`}>
                <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                    <div className="text-3xl mb-2">🎨</div>
                    <div className="text-sm font-medium">Project Image</div>
                    <div className="text-xs opacity-70">Coming Soon</div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {/* Loading state */}
            {isLoading && !hasError && (
                <div className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse flex items-center justify-center z-10`}>
                    <div className="text-center text-gray-400">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <div className="text-xs">Loading...</div>
                    </div>
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className={`absolute inset-0 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 flex items-center justify-center z-10`}>
                    <div className="text-center p-4 text-red-600 dark:text-red-400">
                        <div className="text-2xl mb-2">⚠️</div>
                        <div className="text-sm font-medium">Image Not Found</div>
                        <div className="text-xs opacity-70 mt-1 max-w-[200px] truncate">{src}</div>
                    </div>
                </div>
            )}

            {/* Actual Next.js Image */}
            <Image
                src={src}
                alt={alt}
                fill={fill}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                sizes={sizes || (fill ? '100vw' : undefined)}
                priority={priority}
                quality={quality}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};