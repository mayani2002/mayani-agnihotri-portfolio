/**
 * Optimized Image Components
 * 
 * This module provides a comprehensive set of image components built on top of Next.js Image
 * optimization. These components handle loading states, error handling, responsive sizing,
 * and performance optimization automatically.
 * 
 * Key Benefits:
 * - Automatic WebP/AVIF conversion for modern browsers
 * - Lazy loading by default (loads images as they enter viewport)
 * - Responsive image sizing based on device screen size
 * - Built-in loading states and error handling
 * - Optimized caching and compression
 * 
 * Usage Examples:
 * - OptimizedImage: General purpose image with full control
 * - Avatar: Profile pictures with preset sizes
 * - ProjectImage: Portfolio project screenshots
 * - GalleryImage: Image gallery with hover effects
 */

import Image from 'next/image';
import { useState } from 'react';

// Optimized Image Component with Loading States
export interface OptimizedImageProps {
    src: string; // Image source URL
    alt: string; // Alternative text for accessibility (required!)
    width?: number; // Image width in pixels
    height?: number; // Image height in pixels
    className?: string; // CSS classes to apply
    priority?: boolean; // Whether to load image immediately (for above-the-fold images)
    quality?: number; // Image quality 1-100 (default: 75, higher = better quality but larger file)
    placeholder?: 'blur' | 'empty'; // Loading placeholder type
    blurDataURL?: string; // Base64 encoded blur placeholder image
    sizes?: string; // Responsive image sizes for different breakpoints
    fill?: boolean; // Whether image should fill its container (requires relative parent)
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'; // How image fits container
    objectPosition?: string; // Position of image within container
    loading?: 'lazy' | 'eager'; // Loading behavior (lazy = load when visible)
    onLoad?: () => void; // Callback when image loads successfully
    onError?: () => void; // Callback when image fails to load
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    quality = 75,
    placeholder = 'empty',
    blurDataURL,
    sizes,
    fill = false,
    objectFit = 'cover',
    objectPosition = 'center',
    loading = 'lazy',
    onLoad,
    onError,
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleLoad = () => {
        setImageLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setImageError(true);
        onError?.();
    };

    if (imageError) {
        return (
            <div
                className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <div className="text-gray-400 text-center p-4">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">Failed to load</span>
                </div>
            </div>
        );
    }

    const imageProps = {
        src,
        alt,
        quality,
        priority,
        placeholder,
        blurDataURL,
        sizes,
        loading,
        onLoad: handleLoad,
        onError: handleError,
        className: `${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
        style: {
            objectFit: fill ? undefined : objectFit,
            objectPosition: fill ? undefined : objectPosition,
        },
    };

    if (fill) {
        return (
            <div className="relative overflow-hidden">
                <Image
                    {...imageProps}
                    fill
                />
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <Image
                {...imageProps}
                width={width}
                height={height}
            />
            {!imageLoaded && (
                <div
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
                    style={{ width, height }}
                />
            )}
        </div>
    );
};

// Avatar Component with Optimized Image
export const Avatar: React.FC<{
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
    priority?: boolean;
}> = ({
    src,
    alt,
    size = 'md',
    className = '',
    priority = false
}) => {
        const sizeClasses = {
            sm: 'w-8 h-8',
            md: 'w-12 h-12',
            lg: 'w-16 h-16',
            xl: 'w-24 h-24',
            '2xl': 'w-32 h-32',
        };

        const sizeDimensions = {
            sm: { width: 32, height: 32 },
            md: { width: 48, height: 48 },
            lg: { width: 64, height: 64 },
            xl: { width: 96, height: 96 },
            '2xl': { width: 128, height: 128 },
        };

        return (
            <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
                <OptimizedImage
                    src={src}
                    alt={alt}
                    width={sizeDimensions[size].width}
                    height={sizeDimensions[size].height}
                    priority={priority}
                    quality={85}
                    objectFit="cover"
                    className="rounded-full"
                />
            </div>
        );
    };

// Project Image with Lazy Loading
export const ProjectImage: React.FC<{
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}> = ({ src, alt, className = '', priority = false }) => (
    <OptimizedImage
        src={src}
        alt={alt}
        width={600}
        height={400}
        priority={priority}
        quality={80}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        className={`rounded-lg ${className}`}
        objectFit="cover"
    />
);

// Hero/Banner Image
export const HeroImage: React.FC<{
    src: string;
    alt: string;
    className?: string;
}> = ({ src, alt, className = '' }) => (
    <div className={`relative w-full h-screen ${className}`}>
        <OptimizedImage
            src={src}
            alt={alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            objectFit="cover"
            objectPosition="center"
            className="absolute inset-0"
        />
    </div>
);

// Gallery Image with Modal Support
export const GalleryImage: React.FC<{
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void;
}> = ({ src, alt, className = '', onClick }) => (
    <div
        className={`relative cursor-pointer group overflow-hidden rounded-lg ${className}`}
        onClick={onClick}
    >
        <OptimizedImage
            src={src}
            alt={alt}
            width={300}
            height={200}
            quality={75}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="group-hover:scale-105 transition-transform duration-300"
            objectFit="cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
        </div>
    </div>
);

// Responsive Image Grid
export const ImageGrid: React.FC<{
    images: Array<{ src: string; alt: string; }>;
    columns?: 2 | 3 | 4;
    gap?: 2 | 4 | 6 | 8;
    className?: string;
}> = ({ images, columns = 3, gap = 4, className = '' }) => {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const gridGap = {
        2: 'gap-2',
        4: 'gap-4',
        6: 'gap-6',
        8: 'gap-8',
    };

    return (
        <div className={`grid ${gridCols[columns]} ${gridGap[gap]} ${className}`}>
            {images.map((image, index) => (
                <GalleryImage
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="aspect-square"
                />
            ))}
        </div>
    );
};

// Image with Loading Skeleton
export const ImageWithSkeleton: React.FC<OptimizedImageProps> = (props) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative">
            {!loaded && (
                <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded"
                    style={{ width: props.width, height: props.height }}
                />
            )}
            <OptimizedImage
                {...props}
                onLoad={() => {
                    setLoaded(true);
                    props.onLoad?.();
                }}
                className={`${props.className || ''} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            />
        </div>
    );
};
