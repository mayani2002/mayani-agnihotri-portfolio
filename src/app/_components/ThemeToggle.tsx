// components/ThemeToggle.tsx
'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../_utils/ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <FaMoon size={20} />
            ) : (
                <FaSun size={20} />
            )}
        </button>
    );
}