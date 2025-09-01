import type { Metadata } from "next";
import { Rubik, Kalam, Qwitcher_Grypen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './_utils/ThemeProvider'; // New Import


const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const kalam = Kalam({
  subsets: ["latin"], variable: "--font-kalam",
  weight: "300"
});
const qwitcherGrypen = Qwitcher_Grypen({
  subsets: ["latin"], variable: "--font-qwitcher",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Mayani Agnihotri | Software Engineer | Fullstack Developer | React, Node.js & Freelance Projects",
  description: "Portfolio of Mayani Agnihotri – Software Engineer and Fullstack Developer skilled in React, Node.js, JavaScript, Python, and scalable backend systems. Experienced in startups, freelancing, and building end-to-end products. Open to SDE-1 opportunities at top tech companies and freelance collaborations worldwide.",
  keywords: "Mayani Agnihotri, Software Engineer, Fullstack Developer, React Developer, Node.js Developer, JavaScript Engineer, Python Developer, Freelance Software Developer, Frontend Engineer, Backend Engineer, SDE-1 Portfolio, Web Developer, API Development, Startup Developer, ATS Friendly Resume, Product Development, Hackathon Winner",
  authors: [{ name: "Mayani Agnihotri" }],
  creator: "Mayani Agnihotri",
  publisher: "Mayani Agnihotri",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mayani Agnihotri | Software Engineer | Fullstack Developer',
    description: 'Portfolio of Mayani Agnihotri – Software Engineer and Fullstack Developer skilled in React, Node.js, JavaScript, Python, and scalable backend systems.',
    creator: '@mayani_agnihotri',
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
        <meta name="theme-color" content="#FF1493" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
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
      </head>
      <body
        className={`${rubik.variable} ${kalam.variable} ${qwitcherGrypen.variable}`}
        suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
