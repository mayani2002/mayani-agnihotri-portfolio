'use client';
import { useState, useEffect } from "react";
import { FaXTwitter, FaLinkedinIn, FaGithub, FaBars, FaAngleLeft, FaEnvelope } from "react-icons/fa6";
import { OptimizedImage } from './OptimizedImageNew';

interface LeftSidebarProps {
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

export default function LeftSidebar({ isOpen: externalIsOpen, setIsOpen: externalSetIsOpen }: LeftSidebarProps) {
    // Use internal state as fallback, external state takes priority
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = externalSetIsOpen || setInternalIsOpen;

    return (
        <>
            {/* Overlay for mobile when open */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    aria-hidden="true"
                ></div>
            )}

            {/* Mobile-only floating download resume button */}
            <a
                href="/Mayani-Agnihotri-Resume.pdf"
                download="Mayani-Agnihotri-Resume.pdf"
                className="fixed bottom-20 left-4 md:hidden btn-resume-mobile select-none text-sm z-50"
                aria-label="Download Resume"
            >
                📄 Resume
            </a>

            {/* Hamburger button - Always visible toggle */}
            <button
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed top-3 left-3 md:top-4 sidebar-button shadow-medium 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-primary z-40
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'md:left-[260px]' : 'md:left-4'}
                `}
            >
                {isOpen ? <FaAngleLeft size={16} /> : <FaBars size={16} />}
            </button>

            <aside
                className={`
          fixed top-0 left-0 h-screen sidebar-surface
          rounded-r-3xl border-r-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col py-3 px-5 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          
          w-72 md:w-64 
          overflow-y-auto overflow-x-hidden modal-scrollbar scrollbar-stable
          md:rounded-r-lg
        `}
                aria-label="Sidebar Navigation"
            >
                {/* Scrollable Content Container */}
                <div className="flex-1 flex flex-col pt-8 pb-3 min-h-0">
                    {/* Profile Section */}
                    <div className="flex-shrink-0 mb-4">
                        {/* Profile Image */}
                        <div className="w-20 h-20 rounded-full mx-auto flex-shrink-0 overflow-hidden border-3 border-primary mb-3 shadow-medium relative">
                            <img src="/portfolio-hero.png" alt="Mayani Agnihotri Profile" className="w-full h-full object-cover" />
                            <span className="absolute bottom-0 right-0 w-4 h-4 bg-accent border-2 border-white rounded-full shadow-small"></span>
                        </div>

                        {/* Name and Title */}
                        <h2 className="mt-2 font-kalam text-lg text-primary text-center leading-tight">
                            Mayani Agnihotri
                        </h2>
                        <h4 className="text-xs font-medium text-secondary mb-3 text-center">
                            Software Engineer & Fullstack Developer
                        </h4>
                    </div>

                    {/* Social Icons */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4 flex-shrink-0">
                        <a
                            href="https://github.com/mayani2002"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="social-icon"
                        >
                            <FaGithub size={14} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mayani-agnihotri/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            className="social-icon"
                        >
                            <FaLinkedinIn size={14} />
                        </a>
                        <a
                            href="https://x.com/mayani_agnihotri"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X Profile"
                            className="social-icon"
                        >
                            <FaXTwitter size={14} />
                        </a>
                        <a
                            href="mailto:mayani.agni01@gmail.com"
                            aria-label="Email Contact"
                            className="social-icon"
                        >
                            <FaEnvelope size={14} />
                        </a>
                    </div>

                    {/* Info Section - Scrollable with improved scrollbar */}
                    <div className="flex-1 overflow-y-auto min-h-0 mb-3 sidebar-scroll pr-1 modal-scrollbar scrollbar-stable">
                        <div className="flex flex-col gap-2 text-xs font-medium">
                            {[
                                ["Age:", "23"],
                                ["Location:", "India"],
                                ["Freelance:", <span key="available" className="text-green-600 dark:text-green-400 font-semibold">Available</span>],
                                ["Experience:", "1 Yr (non-internship)"],
                                ["Email:", "mayani.agni01@gmail.com"],
                            ].map(([label, value], idx) => (
                                <div key={idx} className="flex justify-between items-center gap-2">
                                    <span className="info-label">
                                        {label}
                                    </span>
                                    <span className="info-value">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Download CV Button - Always at bottom */}
                    <div className="flex-shrink-0 mt-auto">
                        <a
                            href="/Mayani-Agnihotri-Resume.pdf"
                            download="Mayani-Agnihotri-Resume.pdf"
                            className="bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-full shadow-medium text-center transition-colors duration-200 dark:bg-green-600 dark:hover:bg-green-700 w-full select-none text-sm block"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>
            </aside>
        </>
    );
}
