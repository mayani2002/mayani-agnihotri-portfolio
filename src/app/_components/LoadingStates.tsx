'use client';

/**
 * Loading States Component Library
 * 
 * This module provides a comprehensive set of loading UI components to improve user experience
 * during data fetching, image loading, and page transitions. Consistent loading states help
 * users understand that the application is working and reduce perceived loading time.
 * 
 * Components included:
 * - PageLoader: Full page loading with animated spinners
 * - CardSkeleton: Skeleton placeholder for card layouts
 * - ListSkeleton: Skeleton for list items with configurable count
 * - Spinner: Simple spinning loader in various sizes
 * - ButtonLoader: Loading state for buttons with spinner
 * - ImageSkeleton: Placeholder for images while they load
 * - SectionLoader: Large content area loading state
 * 
 * Design Philosophy:
 * - Matches your design system colors and spacing
 * - Smooth animations that don't distract
 * - Accessible (respects prefers-reduced-motion)
 * - Consistent styling across all components
 */

import React from 'react';

// Skeleton Loading Component
export const SkeletonLoader: React.FC<{
    height?: string;
    width?: string;
    className?: string;
    rounded?: boolean;
    animate?: boolean;
}> = ({
    height = 'h-4',
    width = 'w-full',
    className = '',
    rounded = false,
    animate = true
}) => (
        <div
            className={`
      ${height} ${width} ${className}
      bg-gray-200 dark:bg-gray-700
      ${rounded ? 'rounded-full' : 'rounded'}
      ${animate ? 'animate-pulse' : ''}
    `}
            role="presentation"
            aria-label="Loading..."
        />
    );

// Page Loading Component
export const PageLoader: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center surface">
        <div className="text-center space-y-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="w-12 h-12 border-4 border-accent-light border-t-transparent rounded-full animate-spin mx-auto absolute top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <p className="text-primary text-lg font-medium">Loading...</p>
            <p className="text-secondary text-sm">Please wait while we prepare your content</p>
        </div>
    </div>
);

// Card Loading Skeleton
export const CardSkeleton: React.FC = () => (
    <div className="surface-elevated rounded-lg p-6 border-themed shadow-medium animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
            <SkeletonLoader height="h-12" width="w-12" rounded />
            <div className="flex-1 space-y-2">
                <SkeletonLoader height="h-4" width="w-3/4" />
                <SkeletonLoader height="h-3" width="w-1/2" />
            </div>
        </div>
        <div className="space-y-3">
            <SkeletonLoader height="h-3" width="w-full" />
            <SkeletonLoader height="h-3" width="w-5/6" />
            <SkeletonLoader height="h-3" width="w-4/6" />
        </div>
        <div className="flex justify-between items-center mt-6">
            <SkeletonLoader height="h-8" width="w-24" rounded />
            <SkeletonLoader height="h-6" width="w-16" rounded />
        </div>
    </div>
);

// List Loading Skeleton
export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 3 }) => (
    <div className="space-y-4">
        {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 surface-elevated rounded-lg animate-pulse">
                <SkeletonLoader height="h-10" width="w-10" rounded />
                <div className="flex-1 space-y-2">
                    <SkeletonLoader height="h-4" width="w-3/4" />
                    <SkeletonLoader height="h-3" width="w-1/2" />
                </div>
                <SkeletonLoader height="h-6" width="w-20" rounded />
            </div>
        ))}
    </div>
);

// Spinner Component
export const Spinner: React.FC<{
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'accent';
}> = ({ size = 'md', color = 'primary' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const colorClasses = {
        primary: 'border-primary-light border-t-transparent',
        secondary: 'border-secondary border-t-transparent',
        accent: 'border-accent-light border-t-transparent'
    };

    return (
        <div
            className={`
        ${sizeClasses[size]}
        border-2 rounded-full animate-spin
        ${colorClasses[color]}
      `}
            role="status"
            aria-label="Loading"
        />
    );
};

// Button Loading State
export const ButtonLoader: React.FC<{
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}> = ({ children, loading = false, disabled = false, className = '', onClick }) => (
    <button
        onClick={onClick}
        disabled={loading || disabled}
        className={`
      relative inline-flex items-center justify-center
      ${loading || disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `}
    >
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
                <Spinner size="sm" color="primary" />
            </div>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>
            {children}
        </span>
    </button>
);

// Image Loading Placeholder
export const ImageSkeleton: React.FC<{
    width?: string;
    height?: string;
    className?: string;
}> = ({ width = 'w-full', height = 'h-64', className = '' }) => (
    <div
        className={`
      ${width} ${height} ${className}
      bg-gray-200 dark:bg-gray-700 
      animate-pulse rounded-lg
      flex items-center justify-center
    `}
    >
        <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
            />
        </svg>
    </div>
);

// Section Loading
export const SectionLoader: React.FC<{
    title?: boolean;
    cards?: number;
    list?: boolean;
}> = ({ title = true, cards = 0, list = false }) => (
    <div className="space-y-6">
        {title && (
            <div className="text-center space-y-2">
                <SkeletonLoader height="h-8" width="w-64" className="mx-auto" />
                <SkeletonLoader height="h-4" width="w-96" className="mx-auto" />
            </div>
        )}

        {cards > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: cards }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </div>
        )}

        {list && <ListSkeleton items={5} />}
    </div>
);
