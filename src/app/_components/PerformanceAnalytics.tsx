/**
 * Performance Analytics Components
 * 
 * This module provides comprehensive performance monitoring for your React application.
 * It tracks Web Vitals (Core Web Vitals that Google uses for ranking), component performance,
 * memory usage, and provides debugging tools for optimization.
 * 
 * Key Metrics Tracked:
 * - FCP (First Contentful Paint): When first content appears on screen
 * - LCP (Largest Contentful Paint): When main content is likely loaded
 * - FID (First Input Delay): How quickly page responds to user interaction
 * - CLS (Cumulative Layout Shift): Visual stability (elements jumping around)
 * - TTFB (Time to First Byte): Server response time
 * 
 * Usage:
 * - Add <PerformanceAnalytics /> to your root layout
 * - Use useWebVitals hook for custom metrics handling
 * - Use useComponentPerformance for monitoring specific components
 */

'use client';

import { useEffect } from 'react';

// Performance metrics tracking interface
interface PerformanceMetrics {
    fcp?: number; // First Contentful Paint - when user sees first content (good: <1.8s)
    lcp?: number; // Largest Contentful Paint - when main content loads (good: <2.5s)
    fid?: number; // First Input Delay - responsiveness to user input (good: <100ms)
    cls?: number; // Cumulative Layout Shift - visual stability (good: <0.1)
    ttfb?: number; // Time to First Byte - server response time (good: <800ms)
}

// Web Vitals monitoring
export const useWebVitals = (callback?: (metrics: PerformanceMetrics) => void) => {
    useEffect(() => {
        let metrics: PerformanceMetrics = {};

        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (entry.name === 'first-contentful-paint') {
                    metrics.fcp = entry.startTime;
                    callback?.(metrics);
                }
            });
        });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
                metrics.lcp = lastEntry.startTime;
                callback?.(metrics);
            }
        });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
                metrics.fid = entry.processingStart - entry.startTime;
                callback?.(metrics);
            });
        });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    metrics.cls = clsValue;
                    callback?.(metrics);
                }
            });
        });

        // TTFB from Navigation Timing
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
            const navEntry = navigationEntries[0];
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            callback?.(metrics);
        }

        try {
            fcpObserver.observe({ entryTypes: ['paint'] });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            fidObserver.observe({ entryTypes: ['first-input'] });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
            console.warn('Performance Observer not supported:', error);
        }

        return () => {
            fcpObserver.disconnect();
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
        };
    }, [callback]);
};

// Performance Analytics Component
export const PerformanceAnalytics: React.FC = () => {
    useWebVitals((metrics) => {
        // In development, log to console
        if (process.env.NODE_ENV === 'development') {
            console.log('Web Vitals:', metrics);
        }

        // In production, you might want to send to analytics service
        // analytics.track('web_vitals', metrics);
    });

    useEffect(() => {
        // Track page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime}ms`);
        });

        // Track resource loading
        const resourceObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (entry.duration > 1000) { // Log slow resources (>1s)
                    console.warn(`Slow resource: ${entry.name} - ${entry.duration}ms`);
                }
            });
        });

        try {
            resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (error) {
            console.warn('Resource Observer not supported:', error);
        }

        return () => {
            resourceObserver.disconnect();
        };
    }, []);

    return null; // This component doesn't render anything
};

// Hook for monitoring component performance
export const useComponentPerformance = (componentName: string) => {
    useEffect(() => {
        const startTime = performance.now();

        return () => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;

            if (renderTime > 100) { // Log components that take >100ms
                console.warn(`Slow component: ${componentName} - ${renderTime}ms`);
            }
        };
    }, [componentName]);
};

// Performance debugging in development
export const PerformanceDebugger: React.FC = () => {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const memoryInfo = (performance as any).memory;
            if (memoryInfo) {
                console.log('Memory Usage:', {
                    used: Math.round(memoryInfo.usedJSHeapSize / 1048576) + 'MB',
                    total: Math.round(memoryInfo.totalJSHeapSize / 1048576) + 'MB',
                    limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576) + 'MB',
                });
            }
        }, 10000); // Every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono max-w-xs">
            <div>🔍 Performance Monitor Active</div>
            <div>Check console for metrics</div>
        </div>
    );
};

// Image loading performance tracker
export const useImagePerformance = (src: string) => {
    useEffect(() => {
        const img = new Image();
        const startTime = performance.now();

        img.onload = () => {
            const loadTime = performance.now() - startTime;
            if (loadTime > 2000) { // Log slow images (>2s)
                console.warn(`Slow image: ${src} - ${loadTime}ms`);
            }
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
        };

        img.src = src;
    }, [src]);
};

// Bundle size analyzer (development only)
export const BundleAnalyzer: React.FC = () => {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    useEffect(() => {
        // Track bundle loading
        const scriptTags = document.querySelectorAll('script[src*="_next/static"]');
        let totalSize = 0;

        scriptTags.forEach(async (script: any) => {
            try {
                const response = await fetch(script.src);
                const size = parseInt(response.headers.get('content-length') || '0');
                totalSize += size;

                console.log('Bundle:', {
                    file: script.src.split('/').pop(),
                    size: Math.round(size / 1024) + 'KB',
                });
            } catch (error) {
                console.warn('Could not analyze bundle:', script.src);
            }
        });

        setTimeout(() => {
            console.log('Total bundle size:', Math.round(totalSize / 1024) + 'KB');
        }, 2000);
    }, []);

    return null;
};
