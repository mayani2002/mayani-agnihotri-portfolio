'use client';
import Link from 'next/link';
import {
    FaHouse,
    FaFileCode,
    FaSquarePen,
    FaGraduationCap,
    FaBriefcase,
    FaDev,
    FaTrophy,
    FaUserPen,
} from 'react-icons/fa6';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaHouse size={18} />, label: 'Home', color: 'text-gray-600 dark:text-gray-400' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaBriefcase size={18} />, label: 'Work', color: 'text-sky-600 dark:text-sky-400' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaFileCode size={18} />, label: 'Projects', color: 'text-cyan-600 dark:text-cyan-400' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaDev size={18} />, label: 'Tech Stack', color: 'text-purple-500 dark:text-purple-400' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaTrophy size={18} />, label: 'Success', color: 'text-yellow-500 dark:text-yellow-400' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaGraduationCap size={18} />, label: 'Education', color: 'text-indigo-500 dark:text-indigo-400' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaSquarePen size={18} />, label: 'Blogs', color: 'text-fuchsia-500 dark:text-fuchsia-400' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaUserPen size={18} />, label: 'Feedback', color: 'text-green-500 dark:text-green-400' },
];

export default function RightVerticalNav() {
    return (
        <>
            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 surface border-t border-themed md:hidden z-50">
                <ul className="flex justify-around items-center max-w-screen-md mx-auto py-2">
                    {navLinks.map(({ href, icon, label, color }) => (
                        <li key={label} className="relative group">
                            <Link
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`flex flex-col items-center justify-center px-3 py-1 ${color} hover-surface rounded-lg transition-all duration-300 hover:scale-105`}
                            >
                                {icon}
                                <span className="sr-only">{label}</span>
                            </Link>
                            {/* Tooltip for mobile (above icons) */}
                            <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 px-2 py-1 rounded surface-elevated text-primary text-xs whitespace-nowrap pointer-events-none z-50 shadow-medium">
                                {label}
                            </span>
                        </li>
                    ))}
                    {/* Theme Toggle with circular border */}
                    <li className="flex items-center justify-center p-2 rounded-full border-themed border-themed-hover transition-colors duration-300">
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>

            {/* Desktop Vertical Nav */}
            <nav className="hidden md:flex flex-col fixed right-4 top-1/2 transform -translate-y-1/2 p-1 z-50 surface-elevated border-themed rounded-xl shadow-large max-w-[72px] max-h-screen overflow-y-auto">
                <div className="mb-2">
                    <ThemeToggle />
                </div>
                <ul className="flex flex-col space-y-2 items-center">
                    {navLinks.map(({ href, icon, label, color }) => (
                        <li key={label} className="relative group w-full flex justify-center">
                            <Link
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`p-3 rounded-full ${color} hover-surface transition-all duration-300 flex items-center justify-center hover:scale-110`}
                            >
                                {icon}
                            </Link>
                            {/* Tooltip on right side */}
                            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 surface-elevated text-primary text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50 shadow-medium">
                                {label}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
