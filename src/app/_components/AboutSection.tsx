'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FiCheck,
    FiHeart,
    FiTarget,
    FiUsers,
    FiAward,
    FiBookOpen,
    FiZap,
    FiTrendingUp,
    FiGlobe
} from 'react-icons/fi';

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });

    const stats = [
        { icon: FiCheck, label: 'Projects', value: '15+', color: 'text-blue-500' },
        { icon: FiAward, label: 'Achievements', value: '4+', color: 'text-purple-500' },
        { icon: FiUsers, label: 'Team Projects', value: '8+', color: 'text-green-500' },
        { icon: FiTrendingUp, label: 'Years Learning', value: '3+', color: 'text-orange-500' }
    ];

    const values = [
        {
            icon: FiCheck,
            title: 'Optimization',
            description: 'Writing maintainable, scalable solutions',
            color: 'text-blue-500'
        },
        {
            icon: FiHeart,
            title: 'User-Centric',
            description: 'Focusing on exceptional user experiences',
            color: 'text-red-500'
        },
        {
            icon: FiZap,
            title: 'Innovation',
            description: 'Embracing new technologies and methods',
            color: 'text-yellow-500'
        },
        {
            icon: FiGlobe,
            title: 'Impact',
            description: 'Building solutions that make a difference',
            color: 'text-green-500'
        }
    ];

    return (
        <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden" aria-labelledby="about-heading">
            <div className="adaptive-container">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-primary mb-4 font-kalam">
                        About Me
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="prose prose-lg max-w-none text-muted">
                            <p className="text-lg leading-relaxed mb-4">
                                I’m <strong className="text-purple-600 dark:text-purple-400">Mayani Agnihotri</strong> with
                                a software engineer and startup enthusiast driven by <u>curiosity</u>, <u>principles</u>, and <u>trust</u>.
                            </p>

                            <p className="leading-relaxed mb-4">
                                My journey in tech began with curiosity and has evolved into expertise across
                                <span className="text-purple-600 dark:text-purple-400 font-semibold"> React, Node.js, AI, and cloud technologies</span>.
                                I thrive on learning, adapting, and turning ideas into impact. With a strong belief in resilience and consistency, I bring clarity and calm even in challenging situations. 
                            </p>

                            <p className="leading-relaxed">
                                Beyond tech, I enjoy managing projects, people, and possibilities with equal passion. For me, growth is a continuous journey—every challenge is an opportunity to evolve, and every step a chance to build with purpose.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className={`${stat.color} mb-2 flex justify-center group-hover:scale-110 transition-transform duration-200`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="text-2xl font-bold text-primary font-kalam">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Values & Approach */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-6 font-kalam">
                                What Drives Me
                            </h3>

                            <div className="space-y-4">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        <div className={`${value.color} flex-shrink-0 p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm`}>
                                            <value.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary mb-1">
                                                {value.title}
                                            </h4>
                                            <p className="text-sm text-muted leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Tech Philosophy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="text-purple-600 dark:text-purple-400">
                                    <FiTarget size={20} />
                                </div>
                                <h4 className="font-semibold text-primary">My Approach</h4>
                            </div>
                            <p className="text-sm text-muted leading-relaxed">
                                I believe in writing code that not only works but tells a story. Every project is an opportunity
                                to learn something new, solve a unique challenge, and contribute to the broader tech community.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;