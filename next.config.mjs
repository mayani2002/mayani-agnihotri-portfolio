/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image optimization settings - Next.js automatically optimizes images for better performance
    images: {
        // Configure external image domains using the modern remotePatterns configuration
        // This replaces the deprecated 'domains' array
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com', // Allows any Unsplash subdomain
                port: '',
                pathname: '/**', // Allows any path
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
                port: '',
                pathname: '/**',
            },
        ],

        // Modern image formats for better compression and quality
        // WebP and AVIF provide much smaller file sizes than JPEG/PNG
        formats: ['image/webp', 'image/avif'],

        // Screen sizes to generate responsive images for
        // Next.js will create optimized versions for each size
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],

        // Smaller image sizes for thumbnails and icons
        imageSizes: [16, 32, 48, 64, 96, 128, 256],

        // Cache optimized images for 1 year (31536000 seconds)
        // This improves performance for returning visitors
        minimumCacheTTL: 31536000,
    },

    // Remove the "Powered by Next.js" header for cleaner response headers
    poweredByHeader: false,

    // Enable gzip compression for better performance
    // This reduces the size of HTML, CSS, and JS files sent to browsers
    compress: true,

    // Basic security and performance headers
    async headers() {
        return [
            {
                // Apply these headers to all pages
                source: '/(.*)',
                headers: [
                    // Prevent MIME type sniffing attacks
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // Prevent the page from being embedded in frames (clickjacking protection)
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // Enable XSS filtering in older browsers
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // Control how much referrer information is shared
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                // Cache static assets (images, fonts) for better performance
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        // Cache for 1 year, these files have hashed names so they're safe to cache long-term
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
