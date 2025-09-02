export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    videoId: string; // YouTube video ID
    thumbnail: string;
    duration: string; // e.g., "15:30"
    publishedAt: string;
    category: string;
    tags: string[];
    featured: boolean;
    series?: string; // If part of a series
    episodeNumber?: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    stats: {
        views: number;
        likes: number;
        comments: number;
        subscribers?: number; // Gained from this video
    };
    chapters?: Array<{
        title: string;
        timestamp: string;
        duration: string;
    }>;
    resources?: Array<{
        title: string;
        url: string;
        type: 'GitHub' | 'Documentation' | 'Tool' | 'Website';
    }>;
}

export const youtubeVideos: YouTubeVideo[] = [
    {
        id: "video-1",
        title: "Building a Full-Stack E-commerce App with React & Node.js",
        description: "Complete tutorial series on building a modern e-commerce application from scratch. We'll cover authentication, payments, admin dashboard, and deployment.",
        videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "45:20",
        publishedAt: "2023-09-10",
        category: "Full-Stack Development",
        tags: ["React", "Node.js", "E-commerce", "Tutorial", "Full-Stack"],
        featured: true,
        series: "E-commerce Masterclass",
        episodeNumber: 1,
        difficulty: "Intermediate",
        stats: {
            views: 25400,
            likes: 1200,
            comments: 180,
            subscribers: 45
        },
        chapters: [
            { title: "Introduction & Project Overview", timestamp: "00:00", duration: "5:00" },
            { title: "Setting up the Development Environment", timestamp: "05:00", duration: "8:00" },
            { title: "Creating React Frontend", timestamp: "13:00", duration: "15:00" },
            { title: "Building Node.js Backend", timestamp: "28:00", duration: "12:00" },
            { title: "Database Integration", timestamp: "40:00", duration: "5:20" }
        ],
        resources: [
            { title: "Source Code", url: "https://github.com/mayani2002/ecommerce-tutorial", type: "GitHub" },
            { title: "React Documentation", url: "https://react.dev", type: "Documentation" },
            { title: "Node.js Docs", url: "https://nodejs.org/docs", type: "Documentation" }
        ]
    },
    {
        id: "video-2",
        title: "React Hooks Explained: useState, useEffect, and Custom Hooks",
        description: "Deep dive into React Hooks with practical examples. Learn when and how to use useState, useEffect, and how to create your own custom hooks.",
        videoId: "abc123xyz", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/abc123xyz/maxresdefault.jpg",
        duration: "28:15",
        publishedAt: "2023-08-15",
        category: "React Tutorial",
        tags: ["React", "Hooks", "JavaScript", "Frontend"],
        featured: true,
        difficulty: "Beginner",
        stats: {
            views: 18200,
            likes: 890,
            comments: 125,
            subscribers: 32
        },
        chapters: [
            { title: "What are React Hooks?", timestamp: "00:00", duration: "4:00" },
            { title: "useState Hook Deep Dive", timestamp: "04:00", duration: "10:00" },
            { title: "useEffect Hook Explained", timestamp: "14:00", duration: "10:00" },
            { title: "Creating Custom Hooks", timestamp: "24:00", duration: "4:15" }
        ],
        resources: [
            { title: "React Hooks Examples", url: "https://github.com/mayani2002/react-hooks-examples", type: "GitHub" },
            { title: "React Hooks Documentation", url: "https://react.dev/reference/react", type: "Documentation" }
        ]
    },
    {
        id: "video-3",
        title: "Deploy React App to Vercel in 5 Minutes",
        description: "Quick tutorial on deploying your React application to Vercel with custom domain, environment variables, and CI/CD setup.",
        videoId: "def456uvw", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/def456uvw/maxresdefault.jpg",
        duration: "8:45",
        publishedAt: "2023-07-20",
        category: "Deployment",
        tags: ["Vercel", "Deployment", "React", "DevOps"],
        featured: false,
        difficulty: "Beginner",
        stats: {
            views: 12800,
            likes: 456,
            comments: 67,
            subscribers: 18
        },
        chapters: [
            { title: "Preparing React App for Deployment", timestamp: "00:00", duration: "2:00" },
            { title: "Connecting GitHub to Vercel", timestamp: "02:00", duration: "3:00" },
            { title: "Setting up Custom Domain", timestamp: "05:00", duration: "2:30" },
            { title: "Environment Variables & Final Steps", timestamp: "07:30", duration: "1:15" }
        ],
        resources: [
            { title: "Vercel Documentation", url: "https://vercel.com/docs", type: "Documentation" },
            { title: "Sample Deployment Config", url: "https://github.com/mayani2002/vercel-config", type: "GitHub" }
        ]
    },
    {
        id: "video-4",
        title: "TypeScript for React Developers - Complete Guide",
        description: "Master TypeScript in React applications. Learn about type definitions, interfaces, generics, and best practices for type-safe React development.",
        videoId: "ghi789rst", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/ghi789rst/maxresdefault.jpg",
        duration: "52:30",
        publishedAt: "2023-06-05",
        category: "TypeScript Tutorial",
        tags: ["TypeScript", "React", "Type Safety", "JavaScript"],
        featured: true,
        difficulty: "Intermediate",
        stats: {
            views: 31500,
            likes: 1450,
            comments: 245,
            subscribers: 67
        },
        chapters: [
            { title: "TypeScript Basics for React", timestamp: "00:00", duration: "10:00" },
            { title: "Typing React Components", timestamp: "10:00", duration: "15:00" },
            { title: "Props and State Types", timestamp: "25:00", duration: "12:00" },
            { title: "Advanced Types and Generics", timestamp: "37:00", duration: "10:00" },
            { title: "Best Practices & Common Patterns", timestamp: "47:00", duration: "5:30" }
        ],
        resources: [
            { title: "TypeScript React Examples", url: "https://github.com/mayani2002/typescript-react-guide", type: "GitHub" },
            { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", type: "Documentation" },
            { title: "React TypeScript Cheatsheet", url: "https://react-typescript-cheatsheet.netlify.app/", type: "Website" }
        ]
    },
    {
        id: "video-5",
        title: "Node.js REST API with Express and MongoDB",
        description: "Build a complete REST API from scratch using Node.js, Express, and MongoDB. Includes authentication, validation, error handling, and testing.",
        videoId: "jkl012mno", // Replace with actual YouTube video ID
        thumbnail: "https://img.youtube.com/vi/jkl012mno/maxresdefault.jpg",
        duration: "1:15:45",
        publishedAt: "2023-05-10",
        category: "Backend Development",
        tags: ["Node.js", "Express", "MongoDB", "REST API", "Backend"],
        featured: true,
        series: "Backend Mastery",
        episodeNumber: 1,
        difficulty: "Intermediate",
        stats: {
            views: 22100,
            likes: 985,
            comments: 156,
            subscribers: 38
        },
        chapters: [
            { title: "Project Setup & Dependencies", timestamp: "00:00", duration: "8:00" },
            { title: "Express Server Configuration", timestamp: "08:00", duration: "12:00" },
            { title: "MongoDB Connection & Models", timestamp: "20:00", duration: "18:00" },
            { title: "CRUD Operations & Routes", timestamp: "38:00", duration: "25:00" },
            { title: "Authentication & Middleware", timestamp: "63:00", duration: "12:45" }
        ],
        resources: [
            { title: "API Source Code", url: "https://github.com/mayani2002/nodejs-api-tutorial", type: "GitHub" },
            { title: "Express.js Documentation", url: "https://expressjs.com/", type: "Documentation" },
            { title: "MongoDB Documentation", url: "https://docs.mongodb.com/", type: "Documentation" },
            { title: "Postman Collection", url: "https://postman.com/mayani-api-tests", type: "Tool" }
        ]
    }
];

export const getFeaturedVideos = () => {
    return youtubeVideos.filter(video => video.featured);
};

export const getVideosByCategory = (category: string) => {
    return youtubeVideos.filter(video => video.category === category);
};

export const getVideosBySeries = (series: string) => {
    return youtubeVideos
        .filter(video => video.series === series)
        .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));
};

export const getRecentVideos = (limit: number = 5) => {
    return youtubeVideos
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
};

export const getTotalYouTubeStats = () => {
    const totalStats = youtubeVideos.reduce((acc, video) => {
        acc.views += video.stats.views;
        acc.likes += video.stats.likes;
        acc.comments += video.stats.comments;
        acc.subscribers += video.stats.subscribers || 0;
        return acc;
    }, { views: 0, likes: 0, comments: 0, subscribers: 0 });

    return {
        ...totalStats,
        totalVideos: youtubeVideos.length,
        totalDuration: youtubeVideos.reduce((acc, video) => {
            const [minutes, seconds] = video.duration.split(':').map(Number);
            return acc + minutes + (seconds / 60);
        }, 0)
    };
};
