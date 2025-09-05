'use client';

import { personalInfo } from '../../data/personal';
import {
    FaGithub,
    FaLinkedinIn,
    FaEnvelope,
    FaHeart,
    FaArrowUp,
    FaXTwitter
} from 'react-icons/fa6'; export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <div className="py-12">

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                        {/* Left Column - About */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-kalam text-brand-primary">
                                {personalInfo.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {personalInfo.tagline}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                📍 {personalInfo.location}
                            </p>
                        </div>

                        {/* Middle Column - Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Quick Links
                            </h4>
                            <nav className="space-y-2">
                                <a href="#experience" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors duration-200">
                                    Experience
                                </a>
                                <a href="#projects" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors duration-200">
                                    Projects
                                </a>
                                <a href="#achievements" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors duration-200">
                                    Achievements
                                </a>
                                <a href="#education" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors duration-200">
                                    Education
                                </a>
                                <a
                                    href={personalInfo.resumeUrl}
                                    download="Mayani-Agnihotri-Resume.pdf"
                                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors duration-200"
                                >
                                    Download Resume
                                </a>
                            </nav>
                        </div>

                        {/* Right Column - Contact & Social */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Let's Connect
                            </h4>

                            {/* Contact Info */}
                            <div className="space-y-2">
                                <a
                                    href={personalInfo.socialLinks.email}
                                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors duration-200"
                                >
                                    📧 {personalInfo.email}
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-4 pt-2">
                                <a
                                    href={personalInfo.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-all duration-200"
                                    aria-label="GitHub Profile"
                                >
                                    <FaGithub size={16} />
                                </a>
                                <a
                                    href={personalInfo.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-all duration-200"
                                    aria-label="LinkedIn Profile"
                                >
                                    <FaLinkedinIn size={16} />
                                </a>
                                <a
                                    href={personalInfo.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-all duration-200"
                                    aria-label="Twitter Profile"
                                >
                                    <FaXTwitter size={16} />
                                </a>
                                <a
                                    href={personalInfo.socialLinks.email}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-all duration-200"
                                    aria-label="Send Email"
                                >
                                    <FaEnvelope size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-200 dark:border-gray-700 my-8" />

                    {/* Bottom Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <span>© {currentYear} {personalInfo.name}. Made with </span>
                            <FaHeart className="text-red-500 mx-1 text-xs" />
                            <span>using Next.js & Tailwind CSS</span>
                        </div>

                        {/* Back to Top */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                            aria-label="Back to top"
                        >
                            <span>Back to Top</span>
                            <FaArrowUp className="text-xs group-hover:transform group-hover:-translate-y-1 transition-transform duration-200" />
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}