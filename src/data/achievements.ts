export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: 'Award' | 'Certification' | 'Recognition' | 'Milestone' | 'Hackathon' | 'Publication';
    date: string;
    issuer?: string;
    credentialUrl?: string;
    icon?: string;
    image?: string;
    importance: 'High' | 'Medium' | 'Low';
    skills?: string[]; // Related skills
    metrics?: {
        participants?: number;
        ranking?: string;
        score?: string;
    };
}

export const achievements: Achievement[] = [
    {
        id: "achievement-1",
        title: "Hackathon Winner - Tech Innovation 2023",
        description: "Won first place in a 48-hour hackathon with a team of 4 developers. Built an AI-powered task management system that impressed judges with its innovation and technical execution.",
        category: "Hackathon",
        date: "2023-07",
        issuer: "TechCorp Innovation Hub",
        importance: "High",
        skills: ["React", "Node.js", "AI/ML", "MongoDB"],
        metrics: {
            participants: 200,
            ranking: "1st Place",
        }
    },
    {
        id: "achievement-2",
        title: "AWS Certified Developer",
        description: "Successfully obtained AWS Certified Developer - Associate certification, demonstrating proficiency in developing and maintaining applications on AWS platform.",
        category: "Certification",
        date: "2023-05",
        issuer: "Amazon Web Services",
        credentialUrl: "https://aws.amazon.com/certification/",
        importance: "High",
        skills: ["AWS", "Cloud Computing", "DevOps"]
    },
    {
        id: "achievement-3",
        title: "Open Source Contributor",
        description: "Made significant contributions to popular open-source projects, with over 100+ commits accepted and merged. Active in the developer community.",
        category: "Recognition",
        date: "2023-01",
        importance: "Medium",
        skills: ["Git", "Open Source", "Community"],
        metrics: {
            score: "100+ Commits"
        }
    },
    {
        id: "achievement-4",
        title: "React Advanced Certification",
        description: "Completed advanced React certification course covering hooks, performance optimization, testing, and advanced patterns.",
        category: "Certification",
        date: "2022-12",
        issuer: "Meta (Facebook)",
        credentialUrl: "https://developers.facebook.com/certificate/",
        importance: "High",
        skills: ["React", "JavaScript", "Frontend"]
    },
    {
        id: "achievement-5",
        title: "10K+ GitHub Stars",
        description: "My open-source projects have collectively received over 10,000 stars on GitHub, indicating high community appreciation and usage.",
        category: "Milestone",
        date: "2023-08",
        importance: "Medium",
        skills: ["Open Source", "JavaScript", "React"],
        metrics: {
            score: "10,000+ Stars"
        }
    },
    {
        id: "achievement-6",
        title: "Full-Stack Development Bootcamp Graduate",
        description: "Successfully completed an intensive 6-month full-stack development bootcamp with honors, mastering modern web technologies.",
        category: "Certification",
        date: "2022-06",
        issuer: "Code Academy Pro",
        importance: "Medium",
        skills: ["Full-Stack", "React", "Node.js", "Database"]
    },
    {
        id: "achievement-7",
        title: "Tech Blog - 50K+ Monthly Readers",
        description: "My technical blog has grown to attract over 50,000 monthly readers, sharing knowledge about web development and programming best practices.",
        category: "Milestone",
        date: "2023-06",
        importance: "Medium",
        skills: ["Technical Writing", "Community", "Teaching"],
        metrics: {
            score: "50K+ Monthly Readers"
        }
    },
    {
        id: "achievement-8",
        title: "Client Satisfaction - 5 Star Rating",
        description: "Maintained a perfect 5-star rating across all freelance platforms with 100% client satisfaction rate over 20+ completed projects.",
        category: "Recognition",
        date: "2023-09",
        importance: "High",
        skills: ["Client Management", "Communication", "Project Delivery"],
        metrics: {
            score: "100% Satisfaction Rate"
        }
    }
];

export const getAchievementsByCategory = (category: Achievement['category']) => {
    return achievements.filter(achievement => achievement.category === category);
};

export const getFeaturedAchievements = () => {
    return achievements.filter(achievement => achievement.importance === 'High');
};
