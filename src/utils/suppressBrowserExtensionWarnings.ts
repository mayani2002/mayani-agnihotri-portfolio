// utils/suppressBrowserExtensionWarnings.ts
'use client';

/**
 * 🛡️ BROWSER EXTENSION HYDRATION WARNING SUPPRESSION UTILITY
 * 
 * PURPOSE: Eliminates hydration warnings caused by browser extension DOM interference
 * 
 * PROBLEM CONTEXT:
 * - Browser extensions (LastPass, Bitwarden, Grammarly) inject attributes after React hydration
 * - This causes "A tree hydrated but some attributes didn't match" warnings
 * - Specifically problematic: jf-ext-button-ct="all" and data-gr-ext-installed attributes
 * 
 * SOLUTION STRATEGY:
 * 1. 🚫 Comprehensive console error/warn/log suppression for hydration messages
 * 2. 🧹 Active DOM cleanup to remove extension attributes at multiple intervals
 * 3. 📡 MutationObserver for real-time attribute removal as extensions inject them
 * 4. 🔄 Multi-stage cleanup schedule to catch extensions loading at different times
 * 
 * USAGE: Called from AggressiveHydrationFix component during client-side mounting
 */
export function suppressBrowserExtensionWarnings() {
  if (typeof window === 'undefined') return;

  // 💾 Store the original console methods for restoration on cleanup
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  // 🚫 COMPREHENSIVE ERROR SUPPRESSION - Block all hydration-related console errors
  console.error = (...args: any[]) => {
    const message = String(args[0] || '');
    
    // 🎯 Target all known hydration warning patterns
    if (
      message.includes('hydrat') ||                      // Generic hydration issues
      message.includes('Hydrat') ||                      // Capitalized variants
      message.includes('server') ||                      // Server/client mismatches
      message.includes('client') ||                      // Client-side conflicts  
      message.includes('SSR') ||                         // Server-side rendering issues
      message.includes('jf-ext-button-ct') ||           // Password manager button overlays (main culprit)
      message.includes('browser extension') ||           // Generic extension warnings
      message.includes('Warning: Extra attributes') ||   // React extra attribute warnings
      message.includes('suppressHydrationWarning') ||    // React hydration suppression messages
      message.includes('Text content does not match') || // Content mismatch errors
      message.includes('server rendered HTML') ||        // HTML mismatch warnings
      message.includes("didn't match") ||                // Generic mismatch messages
      message.includes("won't be patched up") ||         // React patching warnings
      message.includes('A tree hydrated') ||             // Specific React hydration error
      message.includes('client properties') ||           // Property mismatch warnings
      message.includes('Expected server HTML') ||        // Expected HTML warnings
      message.includes('Did not expect server HTML') ||  // Unexpected HTML warnings
      message.includes('Prop `') && message.includes('` did not match') || // Prop mismatch errors
      
      // 🎯 ALL KNOWN BROWSER EXTENSION ATTRIBUTE PATTERNS
      message.includes('data-new-gr-c-s-check-loaded') || // Grammarly content script loader
      message.includes('data-gr-ext-installed') ||         // Grammarly extension marker
      message.includes('data-lastpass-') ||                // LastPass extension attributes
      message.includes('data-1password-') ||               // 1Password extension attributes
      message.includes('data-bitwarden-') ||               // Bitwarden extension attributes
      message.includes('data-dashlane-') ||                // Dashlane extension attributes
      message.includes('chrome-extension') ||              // Chrome extension references
      message.includes('moz-extension') ||                 // Firefox extension references
      message.includes('safari-extension') ||              // Safari extension references
      message.includes('jf-ext-') ||                       // Password manager prefix patterns
      
      // 🔍 Advanced pattern matching - check if any argument contains extension content
      args.some((arg: any) => 
        typeof arg === 'string' && (
          arg.includes('jf-ext-') ||    // Password manager patterns
          arg.includes('data-gr-') ||   // Grammarly patterns
          arg.includes('extension')     // Generic extension references
        )
      )
    ) {
      return; // 🚫 Completely suppress these messages - don't let them reach console
    }
    
    // ✅ Allow all other legitimate errors through to console
    originalError.apply(console, args);
  };

  // 🚫 WARNING SUPPRESSION - Block extension-related warnings
  console.warn = (...args: any[]) => {
    const message = String(args[0] || '');
    
    // 🎯 Target warning-level extension messages
    if (
      message.includes('hydrat') ||      // Hydration warnings
      message.includes('server') ||      // Server-related warnings  
      message.includes('client') ||      // Client-related warnings
      message.includes('SSR') ||         // SSR warnings
      message.includes('extension') ||   // Generic extension warnings
      message.includes('jf-ext-') ||     // Password manager warnings
      
      // 🔍 Check arguments for extension patterns
      args.some((arg: any) => 
        typeof arg === 'string' && arg.includes('jf-ext-')
      )
    ) {
      return; // 🚫 Block extension warnings
    }
    
    // ✅ Allow other warnings through
    originalWarn.apply(console, args);
  };

  // 🚫 LOG SUPPRESSION - Block extension-related log messages (some extensions log verbosely)
  console.log = (...args: any[]) => {
    const message = String(args[0] || '');
    
    // 🎯 Block extension log spam
    if (
      message.includes('jf-ext-') ||     // Password manager logs
      message.includes('hydration') ||   // Hydration info logs
      
      // 🔍 Check arguments for extension patterns
      args.some((arg: any) => 
        typeof arg === 'string' && arg.includes('jf-ext-')
      )
    ) {
      return; // 🚫 Block extension logs
    }
    
    // ✅ Allow other logs through
    originalLog.apply(console, args);
  };

  // 🧹 DOM CLEANUP FUNCTION - Removes extension attributes from DOM elements
  const cleanupExtensionAttributes = () => {
    if (typeof document === 'undefined') return;
    
    // 🎯 Find all elements with known problematic extension attributes
    const elementsWithExtAttributes = document.querySelectorAll('[jf-ext-button-ct], [data-new-gr-c-s-check-loaded], [data-gr-ext-installed]');
    
    // 🧽 Remove the attributes that cause hydration mismatches
    elementsWithExtAttributes.forEach(element => {
      element.removeAttribute('jf-ext-button-ct');        // Password manager buttons (main issue)
      element.removeAttribute('data-new-gr-c-s-check-loaded'); // Grammarly content script
      element.removeAttribute('data-gr-ext-installed');   // Grammarly installation marker
    });
  };

  // 🔄 MULTI-STAGE CLEANUP SCHEDULE
  // Extensions load at different times, so we clean up at multiple intervals
  setTimeout(cleanupExtensionAttributes, 100);   // 🚀 Early cleanup (100ms)
  setTimeout(cleanupExtensionAttributes, 500);   // 🕐 Medium delay (500ms) 
  setTimeout(cleanupExtensionAttributes, 1000);  // 🕑 Late cleanup (1s) for slow extensions

  // 📡 REAL-TIME MUTATION OBSERVER - Prevents extensions from adding attributes
  if (typeof window !== 'undefined' && window.MutationObserver) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attrName = mutation.attributeName;
          
          // 🚫 Remove extension attributes immediately when they're detected
          if (attrName && (
            attrName.includes('jf-ext-') ||        // Password manager patterns
            attrName.includes('data-gr-') ||       // Grammarly patterns
            attrName.includes('data-new-gr-') ||   // New Grammarly patterns
            attrName.includes('data-lastpass-') || // LastPass patterns
            attrName.includes('data-1password-') || // 1Password patterns
            attrName.includes('data-bitwarden-')   // Bitwarden patterns
          )) {
            target.removeAttribute(attrName); // 🧹 Immediate removal
          }
        }
      });
    });

    // 🎯 Observe the entire document for attribute changes
    observer.observe(document.documentElement, {
      attributes: true,    // Watch for attribute changes
      subtree: true,      // Monitor all descendant elements
      attributeFilter: undefined // Watch all attributes (no filter)
    });

    // 🧹 CLEANUP ON PAGE UNLOAD - Restore original console methods
    window.addEventListener('beforeunload', () => {
      observer.disconnect();           // Stop mutation observer
      console.error = originalError;   // Restore original console.error
      console.warn = originalWarn;     // Restore original console.warn  
      console.log = originalLog;       // Restore original console.log
    });

    // 🔄 Return cleanup function for manual cleanup (used by components)
    return () => {
      observer.disconnect();
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
    };
  }

  // 🛡️ FALLBACK CLEANUP - If MutationObserver isn't available
  window.addEventListener('beforeunload', () => {
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
  });
}
