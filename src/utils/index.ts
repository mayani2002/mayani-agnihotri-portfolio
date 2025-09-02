/**
 * Utility Functions
 * 
 * Collection of reusable utility functions used throughout the application.
 * Focused on commonly needed operations.
 */

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
};

export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Date utilities
export const formatDate = (date: string, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Theme utilities
export const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Storage utilities
export const safeLocalStorage = {
    get: (key: string): string | null => {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    set: (key: string, value: string): boolean => {
        if (typeof window === 'undefined') return false;
        try {
            localStorage.setItem(key, value);
            return true;
        } catch {
            return false;
        }
    }
};
