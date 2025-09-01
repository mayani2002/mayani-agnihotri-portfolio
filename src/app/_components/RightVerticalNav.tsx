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
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaHouse size={18} />, label: 'Home', color: 'text-gray-500' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaBriefcase size={18} />, label: 'Work', color: 'text-sky-600' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaFileCode size={18} />, label: 'Projects', color: 'text-cyan-600' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaDev size={18} />, label: 'Tech Stack', color: 'text-purple-500' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaTrophy size={18} />, label: 'Success', color: 'text-yellow-500' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaGraduationCap size={18} />, label: 'Education', color: 'text-indigo-500' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaSquarePen size={18} />, label: 'Blogs', color: 'text-fuchsia-500' },
    { href: 'https://github.com/Mayani-Brijesh-Agnihotri', icon: <FaUserPen size={18} />, label: 'Feedback', color: 'text-green-500' },
];

export default function RightVerticalNav() {
    return (
        <>
            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 md:hidden z-50">
                <ul className="flex justify-around items-center max-w-screen-md mx-auto py-2">
                    {navLinks.map(({ href, icon, label, color }) => (
                        <li key={label} className="relative group">
                            <Link
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`flex flex-col items-center justify-center px-3 py-1 ${color} hover:text-white hover:bg-blue-600 rounded-lg transition-colors duration-300`}
                            >
                                {icon}
                                <span className="sr-only">{label}</span>
                            </Link>
                            {/* Tooltip for mobile (above icons) */}
                            <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap pointer-events-none z-50">
                                {label}
                            </span>
                        </li>
                    ))}
                    {/* Theme Toggle with circular border */}
                    <li className="flex items-center justify-center p-2 rounded-full border border-gray-400 dark:border-gray-600 hover:border-blue-500 transition-colors duration-300">
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>

            {/* Desktop Vertical Nav */}
            <nav className="hidden md:flex flex-col fixed right-4 top-1/2 transform -translate-y-1/2 p-1 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-[72px] max-h-screen overflow-y-auto">
                <ThemeToggle />
                <ul className="flex flex-col space-y-4 items-center">
                    {navLinks.map(({ href, icon, label, color }) => (
                        <li key={label} className="relative group w-full flex justify-center">
                            <Link
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`p-3 rounded-full ${color} hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center justify-center`}
                            >
                                {icon}
                            </Link>
                            {/* Tooltip on right side */}
                            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50 shadow-lg">
                                {label}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
