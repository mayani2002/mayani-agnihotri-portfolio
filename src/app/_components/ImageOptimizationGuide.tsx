// Common image patterns to replace with OptimizedImageNew:
// 
// Pattern 1: <img src="..." alt="..." className="..." />
// Replace with: <OptimizedImage src="..." alt="..." width={X} height={Y} className="..." quality={85} />
//
// Pattern 2: Profile/Avatar images (should have priority={true} and quality={90})
// Pattern 3: Hero images (should have priority={true} and quality={85})
// Pattern 4: Company logos (should have quality={85})
// Pattern 5: Background images in CSS (consider converting to OptimizedImage)

// Search in these files for <img tags:
// - HeroSection.tsx
// - LeftSidebar.tsx
// - ExperienceSection.tsx
// - AboutSection.tsx
// - ContactSection.tsx
// - Any other component files

// Also search for CSS background-image properties that could be optimized

export const ImageOptimizationGuide = {
    // Hero section images
    hero: {
        quality: 85,
        priority: true,
        sizes: '(max-width: 768px) 100vw, 50vw'
    },

    // Profile/Avatar images
    avatar: {
        quality: 90,
        priority: true,
        sizes: '150px'
    },

    // Company logos
    logo: {
        quality: 85,
        sizes: '48px'
    },

    // Thumbnails
    thumbnail: {
        quality: 75,
        sizes: '(max-width: 768px) 50vw, 25vw'
    }
};