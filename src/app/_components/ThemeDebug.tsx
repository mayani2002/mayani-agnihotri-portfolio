'use client';

import { useTheme } from '../_utils/ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeDebug() {
    const { theme, toggleTheme } = useTheme();
    const [htmlClasses, setHtmlClasses] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof document !== 'undefined') {
            setHtmlClasses(document.documentElement.className);
        }
    }, []);

    useEffect(() => {
        if (mounted && typeof document !== 'undefined') {
            setHtmlClasses(document.documentElement.className);
        }
    }, [theme, mounted]);

    // Don't render anything during SSR
    if (!mounted) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white p-2 text-xs rounded z-[9999] space-y-1">
            <div>Theme: {theme}</div>
            <div>HTML Classes: {htmlClasses}</div>
            <button
                onClick={toggleTheme}
                className="bg-white text-black px-2 py-1 rounded text-xs"
            >
                Toggle Test
            </button>
        </div>
    );
}
