import type { Metadata } from "next";
import { Rubik, Kalam, Qwitcher_Grypen } from "next/font/google";
import "./globals.css";

// Component imports
import { ThemeProvider } from './_utils/ThemeProvider';
import { ErrorBoundary } from './_components/ErrorBoundary';
import { PerformanceAnalytics, PerformanceDebugger } from './_components/PerformanceAnalytics';
import { SEOValidator, AccessibilityValidator, PerformanceBudget, DevConsoleCommands } from './_components/DevUtils';
import { AggressiveHydrationFix } from './_components/AggressiveHydrationFix';
import { BinaryBackground } from './_components/BinaryBackground';

// App configuration
const APP_CONFIG = {
  name: 'Mayani Agnihotri Portfolio',
  author: 'Mayani Agnihotri',
  description: 'Portfolio of Mayani Agnihotri – Software Engineer and Fullstack Developer skilled in React, Node.js, JavaScript, Python, and scalable backend systems. Experienced in startups, freelancing, and building end-to-end products. Open to SDE-1 opportunities at top tech companies and freelance collaborations worldwide.',
  url: 'https://mayani-agnihotri.vercel.app'
} as const;


const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const kalam = Kalam({
  subsets: ["latin", "devanagari"], variable: "--font-kalam",
  weight: "300"
});
const qwitcherGrypen = Qwitcher_Grypen({
  subsets: ["latin"], variable: "--font-qwitcher",
  weight: "400"
});

export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.author} | Software Engineer | Fullstack Developer`,
    template: `%s | ${APP_CONFIG.author}`
  },
  description: APP_CONFIG.description,
  keywords: "Mayani Agnihotri, Software Engineer, Fullstack Developer, React Developer, Node.js Developer, JavaScript Engineer, Python Developer, Freelance Software Developer, Frontend Engineer, Backend Engineer, SDE-1 Portfolio, Web Developer, API Development, Startup Developer, ATS Friendly Resume, Product Development, Hackathon Winner",
  authors: [{ name: "Mayani Agnihotri", url: "https://mayani-agnihotri.vercel.app" }],
  creator: "Mayani Agnihotri",
  publisher: "Mayani Agnihotri",
  alternates: {
    canonical: "https://mayani-agnihotri.vercel.app",
    languages: {
      'en-US': 'https://mayani-agnihotri.vercel.app',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mayani-agnihotri.vercel.app',
    title: 'Mayani Agnihotri | Software Engineer | Fullstack Developer',
    description: 'Portfolio of Mayani Agnihotri – Software Engineer and Fullstack Developer skilled in React, Node.js, JavaScript, Python, and scalable backend systems.',
    siteName: 'Mayani Agnihotri Portfolio',
    images: [
      {
        url: 'https://mayani-agnihotri.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mayani Agnihotri - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mayani_agnihotri',
    creator: '@mayani_agnihotri',
    title: 'Mayani Agnihotri | Software Engineer | Fullstack Developer',
    description: 'Portfolio of Mayani Agnihotri – Software Engineer and Fullstack Developer skilled in React, Node.js, JavaScript, Python, and scalable backend systems.',
    images: ['https://mayani-agnihotri.vercel.app/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#60CAD9" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Performance and Preloads */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />

        {/* 🛡️ IMMEDIATE HYDRATION PROTECTION + THEME SCRIPT */}
        {/* This script runs BEFORE React loads, providing first-line defense against hydration errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 🚫 IMMEDIATE CONSOLE ERROR SUPPRESSION
                // Block hydration warnings before React even loads
                const originalError = console.error;
                console.error = function(...args) {
                  const message = String(args[0] || '');
                  if (
                    message.includes('hydrat') ||           // All hydration messages
                    message.includes('jf-ext-') ||          // Password manager extensions  
                    message.includes('server') && message.includes('client') || // SSR mismatches
                    message.includes('A tree hydrated') ||  // Specific React error
                    message.includes('server rendered HTML') || // HTML mismatch errors
                    message.includes("didn't match") ||     // Attribute mismatch errors
                    message.includes('extension')           // Generic extension conflicts
                  ) {
                    return; // 🚫 Block these messages completely
                  }
                  return originalError.apply(console, args);
                };

                // 🧹 IMMEDIATE DOM CLEANUP  
                // Remove extension attributes as soon as possible
                function cleanupExtensionAttrs() {
                  if (typeof document === 'undefined') return;
                  const elements = document.querySelectorAll('[jf-ext-button-ct], [data-gr-ext-installed], [data-new-gr-c-s-check-loaded]');
                  elements.forEach(el => {
                    el.removeAttribute('jf-ext-button-ct');      // Password managers
                    el.removeAttribute('data-gr-ext-installed'); // Grammarly  
                    el.removeAttribute('data-new-gr-c-s-check-loaded'); // Grammarly new
                  });
                }

                // 🔄 CLEANUP SCHEDULE
                // Run cleanup at multiple intervals to catch extensions loading at different times
                if (typeof document !== 'undefined') {
                  cleanupExtensionAttrs();                    // Immediate
                  setTimeout(cleanupExtensionAttrs, 0);       // Next tick
                  setTimeout(cleanupExtensionAttrs, 50);      // Early load
                  setTimeout(cleanupExtensionAttrs, 100);     // Extension init
                  setTimeout(cleanupExtensionAttrs, 500);     // Late extensions
                }

                // 🎨 THEME DETECTION (Existing functionality)
                // Prevent theme flicker by setting theme class immediately
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mayani Agnihotri",
              "jobTitle": "Software Engineer & Fullstack Developer",
              "description": "Software Engineer and Fullstack Developer skilled in React, Node.js, JavaScript, Python, and scalable backend systems.",
              "url": "https://mayani-agnihotri.vercel.app",
              "image": "https://mayani-agnihotri.vercel.app/profile-mayani.jpeg",
              "email": "mayani.agni01@gmail.com",
              "address": {
                "@type": "Place",
                "addressCountry": "India"
              },
              "sameAs": [
                "https://github.com/mayani2002",
                "https://www.linkedin.com/in/mayani-agnihotri/",
                "https://x.com/mayani_agnihotri"
              ],
              "knowsAbout": [
                "React",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "Python",
                "Full-Stack Development",
                "Web Development",
                "Software Engineering"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Software Engineer",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "India"
                },
                "skills": "React, Node.js, JavaScript, TypeScript, Python, MongoDB, PostgreSQL, AWS"
              }
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mayani Agnihotri Portfolio",
              "description": "Professional portfolio showcasing software engineering projects and expertise",
              "url": "https://mayani-agnihotri.vercel.app",
              "author": {
                "@type": "Person",
                "name": "Mayani Agnihotri"
              },
              "inLanguage": "en-US",
              "copyrightYear": "2024",
              "genre": "Portfolio"
            })
          }}
        />
      </head>
      <body
        className={`${rubik.variable} ${kalam.variable} ${qwitcherGrypen.variable} surface font-main scrollbar-stable`}
        suppressHydrationWarning>
        {/* Skip Navigation Link - Must be first element for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] bg-purple-600 text-white px-4 py-2 rounded-md font-medium shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <ThemeProvider>
            <AggressiveHydrationFix />
            <BinaryBackground />
            <div suppressHydrationWarning>
              {/* <PerformanceAnalytics /> */}
              {/* <PerformanceDebugger /> */}
              <SEOValidator />
              <AccessibilityValidator />
              <PerformanceBudget />
              <DevConsoleCommands />
            </div>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
