// components/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // Only run on client side after mount
    useEffect(() => {
        setMounted(true);

        // Get initial theme (should match what's set in head script)
        const getInitialTheme = (): Theme => {
            if (typeof window === 'undefined') return 'light';

            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) return savedTheme;

            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
    }, []);

    const applyTheme = (newTheme: Theme) => {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;

        // Remove previous theme classes
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);

        // Store in localStorage
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        if (!mounted) return;

        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    // No need to hide children since theme is set in head script
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};