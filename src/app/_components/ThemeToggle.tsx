// components/ThemeToggle.tsx
'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../_utils/ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <FaMoon size={16} />
            ) : (
                <FaSun size={16} />
            )}
        </button>
    );
}