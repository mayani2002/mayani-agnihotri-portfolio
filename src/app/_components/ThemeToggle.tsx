// components/ThemeToggle.tsx
'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../_utils/ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
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