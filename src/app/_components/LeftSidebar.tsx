
'use client';
import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaBars, FaTimes } from "react-icons/fa";

export default function LeftSidebar() {
    const [isOpen, setIsOpen] = useState(true);

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

            <aside
                className={`
          fixed top-0 left-0 h-screen bg-white dark:bg-[var(--color-bg-dark)]
          rounded-r-3xl shadow-xl flex flex-col py-8 px-6 z-50
          transform transition-transform duration-300 ease-in-out max-h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          
          w-72 md:w-64 

          md:hover:shadow-[0_0_20px_var(--color-primary-light)]
          relative

          border-4 border-transparent md:border-[var(--color-primary-light)]
          md:rounded-r-3xl
          md:transition-shadow md:duration-1000 md:ease-in-out
          md:animate-borderGlow
        `}
                aria-label="Sidebar Navigation"
            >
                {/* Toggle Button */}
                <button
                    aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-4 right-[-2rem] md:right-[-2.5rem] bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary-dark)] dark:hover:bg-[var(--color-primary-light)] text-white rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-light)] transition"
                >
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                {/* Profile Image */}
                <div className="w-28 h-28 rounded-full mx-auto flex-shrink-0 overflow-hidden border-4 border-[var(--color-primary-light)] mb-4 shadow relative">
                    <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 w-5 h-5 bg-[var(--color-accent-light)] border-2 border-white rounded-full shadow-lg"></span>
                </div>

                {/* Name and Title */}
                <h2 className="mt-1 font-kalam text-2xl text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] text-center">
                    Rayan Adlardard
                </h2>
                <h4 className="text-sm font-medium text-gray-500 dark:text-[var(--color-lessimp-light)] mb-6 text-center">
                    Front-End Developer
                </h4>

                {/* Social Icons */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            aria-label="Social link"
                            className="
                w-8 h-8 flex items-center justify-center rounded-full 
                bg-[var(--color-primary-light)] text-white 
                hover:bg-[var(--color-primary-dark)] 
                dark:bg-[var(--color-primary-dark)] dark:hover:bg-[var(--color-primary-light)]
                transition"
                        >
                            <Icon />
                        </a>
                    ))}
                </div>

                {/* Info Section */}
                <div className="flex flex-col gap-3 text-sm font-medium">
                    {[
                        ["Age:", "24"],
                        ["Residence:", "BD"],
                        ["Freelance:", <span key="available" className="text-green-600 dark:text-green-400 font-semibold">Available</span>],
                        ["Address:", "Dhaka, Bangladesh"],
                    ].map(([label, value], idx) => (
                        <div key={idx} className="flex justify-between items-center">
                            <span className="bg-[var(--color-accent-light)] dark:bg-[var(--color-accent-dark)] text-white px-2 py-1 rounded font-semibold">
                                {label}
                            </span>
                            <span className="text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] text-right">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Spacer pushes button to bottom */}
                <div className="flex-grow" />

                {/* Download CV Button */}
                <a
                    href="/CV.pdf"
                    download
                    className="
            bg-green-700 hover:bg-green-800 text-white font-semibold 
            px-5 py-2 rounded-full shadow-md text-center transition-colors duration-200
            dark:bg-green-600 dark:hover:bg-green-700
            w-full select-none
          "
                >
                    Download CV
                </a>
            </aside>

            {/* For animation: add custom styles in global CSS */}
            <style jsx global>{`
        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 8px var(--color-primary-light);
          }
          50% {
            box-shadow: 0 0 20px var(--color-primary-light);
          }
        }
        .animate-borderGlow {
          animation: borderGlow 3s ease-in-out infinite;
        }
      `}</style>
        </>
    );
}
