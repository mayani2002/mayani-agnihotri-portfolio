'use client';

import { useEffect } from 'react';

/**
 * 🧹 ExtensionAttributeCleanup
 * 
 * A lightweight component that removes browser extension attributes
 * that cause React hydration warnings, while preserving real error visibility.
 * 
 * ✅ Safe: Only removes known extension attributes
 * ✅ Minimal: Runs cleanup once after hydration + lightweight observer
 * ✅ Performance-friendly: No intervals, targeted mutation observer
 * ✅ Preserves real errors: Doesn't touch console.error
 */
export const ExtensionAttributeCleanup: React.FC = () => {
    useEffect(() => {
        // Extension attribute patterns to clean up
        const extensionPatterns = [
            'jf-ext-',           // Password managers (generic)
            'data-gr-',          // Grammarly  
            'data-new-gr-',      // Grammarly (newer version)
            'data-lastpass-',    // LastPass
            'data-1password-',   // 1Password
            'data-bitwarden-',   // Bitwarden
            'data-dashlane-',    // Dashlane
            'data-honey-',       // Honey
        ];

        // Check if an attribute name matches extension patterns
        const isExtensionAttribute = (attributeName: string): boolean => {
            const lowerName = attributeName.toLowerCase();
            return extensionPatterns.some(pattern => lowerName.includes(pattern));
        };

        // Clean up extension attributes from a single element
        const cleanElement = (element: Element): void => {
            const attributes = Array.from(element.attributes);

            for (const attr of attributes) {
                if (isExtensionAttribute(attr.name)) {
                    element.removeAttribute(attr.name);
                }
            }
        };

        // Initial cleanup after hydration
        const performInitialCleanup = (): void => {
            if (typeof document === 'undefined') return;

            // Clean all existing elements
            const allElements = document.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
                cleanElement(allElements[i]);
            }
        };

        // Set up MutationObserver for real-time cleanup
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                // Handle attribute additions
                if (mutation.type === 'attributes' && mutation.attributeName) {
                    if (isExtensionAttribute(mutation.attributeName)) {
                        const target = mutation.target as Element;
                        target.removeAttribute(mutation.attributeName);
                    }
                }

                // Handle new DOM nodes
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            cleanElement(node as Element);
                        }
                    }
                }
            }
        });

        // Start observing after initial cleanup
        performInitialCleanup();

        // Observe future changes (lightweight - only attributes and new nodes)
        observer.observe(document.documentElement, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: undefined, // Monitor all attributes for extension patterns
        });

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    // This component renders nothing - purely functional
    return null;
};

export default ExtensionAttributeCleanup;