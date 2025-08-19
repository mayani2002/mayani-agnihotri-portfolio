// components/RightVerticalNav.tsx

import Link from 'next/link';
import { FaHome, FaCode, FaPenFancy, FaGraduationCap, FaAddressBook, FaTrophy, FaQuoteLeft, FaBriefcase, FaTools, FaGrinStars } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri',
        icon: <FaHome size={20} />,
        label: 'Home',
    },
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri',
        icon: <FaBriefcase size={20} />,
        label: 'Work',
    },
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri',
        icon: <FaCode size={20} />,
        label: 'Projects',
    },
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri',
        icon: <FaTools size={20} />,
        label: 'Tech Stack',
    },
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri',
        icon: <FaTrophy size={20} />,
        label: 'Success',
    },
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri',
        icon: <FaGraduationCap size={20} />,
        label: 'Education',
    },
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri', // Placeholder for your resume file
        icon: <FaPenFancy size={20} />,
        label: 'Blogs',
    },
    {
        href: 'https://github.com/Mayani-Brijesh-Agnihotri',
        icon: <FaGrinStars size={20} />,
        label: 'Feedback',
    },
];

export default function VerticalNav() {
    return (
        <nav className="h-screen flex flex-col fixed items-center right-0 top-1/2 transform -translate-y-1/2 p-2 z-40 bg-white dark:bg">
            <ThemeToggle />
            <ul className="space-y-4 pt-3">
                {navLinks.map((link) => (
                    <li key={link.label} className="flex flex-col items-center group ">
                        <span className=" text-xs h-3 align-[-2px] text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {link.label}
                        </span>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="p-2 bg-gray-300 text-white dark:text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
                        >
                            {link.icon}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}