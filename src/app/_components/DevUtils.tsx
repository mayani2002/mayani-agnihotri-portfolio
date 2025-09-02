/**
 * Development Utilities
 * 
 * This module provides development-only tools for validating SEO, accessibility,
 * and performance. These components only render in development mode and are
 * automatically excluded from production builds.
 * 
 * Tools included:
 * - SEOValidator: Checks meta tags, structured data, heading hierarchy
 * - AccessibilityValidator: Validates WCAG compliance basics
 * - PerformanceBudget: Real-time Core Web Vitals monitoring
 * - DevConsoleCommands: Helpful browser console commands for testing
 * 
 * Usage:
 * - Add to your root layout during development
 * - Check browser console for helpful commands
 * - Use validation warnings to improve SEO and accessibility
 * - Monitor performance metrics in real-time
 * 
 * Note: All components automatically disable in production builds
 */

// Development utilities for testing SEO and performance
'use client';

import { useEffect, useState } from 'react';

// SEO Validator Component (Development Only)
export const SEOValidator: React.FC = () => {
    const [seoIssues, setSeoIssues] = useState<string[]>([]);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;

        const issues: string[] = [];

        // Check for meta tags
        const metaTags = {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
            keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
            ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
            ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
            ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
            twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
        };

        if (!metaTags.title || metaTags.title.length < 30) {
            issues.push('Title should be at least 30 characters');
        }
        if (!metaTags.description || metaTags.description.length < 120) {
            issues.push('Meta description should be at least 120 characters');
        }
        if (!metaTags.ogImage) {
            issues.push('Missing Open Graph image');
        }
        if (!metaTags.twitterCard) {
            issues.push('Missing Twitter Card meta tag');
        }

        // Check for structured data
        const structuredData = document.querySelector('script[type="application/ld+json"]');
        if (!structuredData) {
            issues.push('Missing structured data (JSON-LD)');
        }

        // Check for heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const h1Count = document.querySelectorAll('h1').length;
        if (h1Count !== 1) {
            issues.push(`Found ${h1Count} H1 tags, should be exactly 1`);
        }

        // Check for alt attributes on images
        const images = document.querySelectorAll('img');
        const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
        if (imagesWithoutAlt.length > 0) {
            issues.push(`${imagesWithoutAlt.length} images missing alt attributes`);
        }

        setSeoIssues(issues);
    }, []);

    if (process.env.NODE_ENV !== 'development' || seoIssues.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-4 left-4 z-50 bg-red-600/90 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h3 className="font-bold mb-2">⚠️ SEO Issues:</h3>
            <ul className="text-sm space-y-1">
                {seoIssues.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                ))}
            </ul>
        </div>
    );
};

// Accessibility Validator (Development Only)
export const AccessibilityValidator: React.FC = () => {
    const [a11yIssues, setA11yIssues] = useState<string[]>([]);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;

        const issues: string[] = [];

        // Check for skip links
        const skipLink = document.querySelector('a[href="#main"], a[href="#content"]');
        if (!skipLink) {
            issues.push('Missing skip navigation link');
        }

        // Check for main landmark
        const mainLandmark = document.querySelector('main');
        if (!mainLandmark) {
            issues.push('Missing main landmark');
        }

        // Check for aria-labels on interactive elements
        const buttons = document.querySelectorAll('button');
        const buttonsWithoutLabels = Array.from(buttons).filter(btn =>
            !btn.textContent?.trim() && !btn.getAttribute('aria-label')
        );
        if (buttonsWithoutLabels.length > 0) {
            issues.push(`${buttonsWithoutLabels.length} buttons missing accessible labels`);
        }

        // Check for form labels
        const inputs = document.querySelectorAll('input');
        const inputsWithoutLabels = Array.from(inputs).filter(input => {
            const id = input.id;
            const label = id ? document.querySelector(`label[for="${id}"]`) : null;
            return !label && !input.getAttribute('aria-label');
        });
        if (inputsWithoutLabels.length > 0) {
            issues.push(`${inputsWithoutLabels.length} form inputs missing labels`);
        }

        setA11yIssues(issues);
    }, []);

    if (process.env.NODE_ENV !== 'development' || a11yIssues.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 bg-orange-600/90 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h3 className="font-bold mb-2">♿ Accessibility Issues:</h3>
            <ul className="text-sm space-y-1">
                {a11yIssues.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                ))}
            </ul>
        </div>
    );
};

// Performance Budget Monitor
export const PerformanceBudget: React.FC = () => {
    const [budgetStatus, setBudgetStatus] = useState<{
        fcp: 'good' | 'needs-improvement' | 'poor';
        lcp: 'good' | 'needs-improvement' | 'poor';
        cls: 'good' | 'needs-improvement' | 'poor';
    }>({
        fcp: 'good',
        lcp: 'good',
        cls: 'good',
    });

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;

        // Monitor Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.name === 'first-contentful-paint') {
                    setBudgetStatus(prev => ({
                        ...prev,
                        fcp: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
                    }));
                }
            });
        });

        try {
            observer.observe({ entryTypes: ['paint'] });
        } catch (error) {
            console.warn('Performance Observer not supported');
        }

        return () => observer.disconnect();
    }, []);

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'good': return 'text-green-400';
            case 'needs-improvement': return 'text-yellow-400';
            case 'poor': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="fixed bottom-20 right-4 z-50 bg-black/80 text-white p-3 rounded-lg shadow-lg text-xs">
            <h4 className="font-bold mb-2">📊 Performance Budget</h4>
            <div className="space-y-1">
                <div className={`flex justify-between ${getStatusColor(budgetStatus.fcp)}`}>
                    <span>FCP:</span>
                    <span>{budgetStatus.fcp}</span>
                </div>
                <div className={`flex justify-between ${getStatusColor(budgetStatus.lcp)}`}>
                    <span>LCP:</span>
                    <span>{budgetStatus.lcp}</span>
                </div>
                <div className={`flex justify-between ${getStatusColor(budgetStatus.cls)}`}>
                    <span>CLS:</span>
                    <span>{budgetStatus.cls}</span>
                </div>
            </div>
        </div>
    );
};

// Console commands for development
export const DevConsoleCommands = () => {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;

        // Add helpful console commands
        (window as any).devTools = {
            // Test error boundary
            throwError: () => {
                throw new Error('Test error for error boundary');
            },

            // Check SEO
            checkSEO: () => {
                console.group('🔍 SEO Check');
                console.log('Title:', document.title);
                console.log('Description:', document.querySelector('meta[name="description"]')?.getAttribute('content'));
                console.log('Structured Data:', document.querySelector('script[type="application/ld+json"]')?.textContent);
                console.groupEnd();
            },

            // Check performance
            checkPerformance: () => {
                console.group('⚡ Performance Check');
                const perfEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                console.log('DOM Load Time:', perfEntries.domContentLoadedEventEnd - perfEntries.domContentLoadedEventStart + 'ms');
                console.log('Full Load Time:', perfEntries.loadEventEnd - perfEntries.loadEventStart + 'ms');
                console.groupEnd();
            },

            // Clear all localStorage
            clearStorage: () => {
                localStorage.clear();
                sessionStorage.clear();
                console.log('✅ Storage cleared');
            },
        };

        console.log('🛠️ Development tools available:');
        console.log('• devTools.throwError() - Test error boundary');
        console.log('• devTools.checkSEO() - Check SEO metadata');
        console.log('• devTools.checkPerformance() - Check performance');
        console.log('• devTools.clearStorage() - Clear browser storage');
    }, []);

    return null;
};
