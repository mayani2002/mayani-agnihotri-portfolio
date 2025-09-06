export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: 'Award' | 'Certification' | 'Milestone' | 'Hackathon' | 'Publication';
    date: string;
    issuer?: string;
    credentialUrl?: string;
    icon?: string;
    image?: string;
    images?: string[]; // Multiple images for hackathons and detailed views
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
        title: "1st Position - InnerveHacks 2022",
        description: "Won first place in a 72-hour hackathon with a team of 4 developers. For the problem statement Smart Waste Management System, we designed a prototype platform to bridge the gap between citizens, garbage collection trucks, and waste recycling companies. We developed a citizen dashboard enabling users to schedule garbage pickups by waste category, date, time, and location (via map or geolocation). To optimize logistics, we implemented TSP (Travelling Salesman Problem) and VRP (Vehicle Routing Problem) algorithms to plan efficient pickup routes, which were then displayed on the truck drivers’ dashboard using the Google Maps API.",
        category: "Hackathon",
        date: "2023-10",
        issuer: "IGDTUW",
        image: "achievements/innervehacks-2022-thumbnail.jpg",
        images: [
            "/achievements/innervehacks-2022-thumbnail.jpg",
            "/achievements/Innervehackspic2.jpg",
            "/achievements/InnerveHacksWinningCertificates.jpg",
        ],
        importance: "High",
        skills: ["React", "Node.js", "AI/ML", "MongoDB", "Google Maps API", "Algorithms"],
        metrics: {
            participants: 3564,
            ranking: "1st Place",
        }
    },
    {
        id: "achievement-2",
        title: "AWS Certified Cloud Practitioner",
        description: "Successfully obtained AWS Certified Cloud Practitioner certification, demonstrating foundational knowledge of AWS cloud services and best practices.",
        category: "Certification",
        date: "2023-05",
        issuer: "Amazon Web Services",
        image: "achievements/AWSCertificate.png",
        credentialUrl: "https://www.credly.com/badges/5b67cf79-e07b-4d6b-b93d-76b1c3d04e6f",
        importance: "Medium",
        skills: ["AWS", "Amazon Web Services", "Cloud Computing", "DevOps", "Cloud Fundamentals", "S3", "EC2", "IAM", "RDS", "Lambda"]
    },
    {
        id: "achievement-3",
        title: "1st Place - IdeaFind+ 2022",
        description: "Won 1st place in the Education category at the IdeaFind+ Ideathon for developing PEDASSIST, an innovative platform addressing the critical issue of early childhood development. The platform empowers parents by educating them on brain development through engaging quizzes, lessons, chapters, and rewards. Identified a root cause often overlooked in society and designed a scalable solution to raise parental awareness. Showcased teamwork, communication, and presentation excellence while pitching the idea to a panel of judges, earning recognition for delivering a thoughtful, practical, and high-impact approach to a pressing social challenge.",
        category: "Hackathon",
        date: "2022-07",
        issuer: "IEEE-Robotics & Automation Society (IEEE-RAS) Vellore Institute of Technology",
        image: "achievements/IdeaFindWinningCertificate.jpg",
        images: [
            "/achievements/IdeaFindWinningAnouncement.png",
            "/achievements/IdeaFindWinningCertificate.jpg",
        ],
        importance: "High",
        skills: ["Web development", "Research", "Presentation", "Ideation"],
        metrics: {
            participants: 100,
            ranking: "1st Place",
        }
    },
    {
        id: "achievement-4",
        title: "1st Position @Super AI Ideathon 2023",
        description: "",
        category: "Hackathon",
        date: "2023-03",
        issuer: "AI&ML Department of TCET",
        image: "/achievements/SuperAIWinningCertificate.png",
        images: [
            "/achievements/SuperAI-thumbnail.jpg",
            "/achievements/SuperAIWinningCertificate.png",
        ],
        importance: "Medium",
        skills: ["Web development", "Research", "Presentation", "Ideation"],
        metrics: {
            participants: 60,
            ranking: "1st Place",
        }
    },
    // {
    //     id: "achievement-4",
    //     title: "Open Source Contributor",
    //     description: "Made significant contributions to popular open-source projects, with over 100+ commits accepted and merged. Active in the developer community.",
    //     category: "Milestone",
    //     date: "2023-01",
    //     importance: "Medium",
    //     skills: ["Git", "Open Source", "Community"],
    //     metrics: {
    //         score: "100+ Commits"
    //     }
    // },
    // {
    //     id: "achievement-5",
    //     title: "10K+ GitHub Stars",
    //     description: "My open-source projects have collectively received over 10,000 stars on GitHub, indicating high community appreciation and usage.",
    //     category: "Milestone",
    //     date: "2023-08",
    //     importance: "Medium",
    //     skills: ["Open Source", "JavaScript", "React"],
    //     metrics: {
    //         score: "10,000+ Stars"
    //     }
    // },
    // {
    //     id: "achievement-6",
    //     title: "Tech Blog - 50K+ Monthly Readers",
    //     description: "My technical blog has grown to attract over 50,000 monthly readers, sharing knowledge about web development and programming best practices.",
    //     category: "Milestone",
    //     date: "2023-06",
    //     importance: "Medium",
    //     skills: ["Technical Writing", "Community", "Teaching"],
    //     metrics: {
    //         score: "50K+ Monthly Readers"
    //     }
    // },
    // {
    //     id: "achievement-7",
    //     title: "Client Satisfaction - 5 Star Rating",
    //     description: "Maintained a perfect 5-star rating across all freelance platforms with 100% client satisfaction rate over 20+ completed projects.",
    //     category: "Award",
    //     date: "2023-09",
    //     importance: "High",
    //     skills: ["Client Management", "Communication", "Project Delivery"],
    //     metrics: {
    //         score: "100% Satisfaction Rate"
    //     }
    // }
];

export const getAchievementsByCategory = (category: Achievement['category']) => {
    return achievements.filter(achievement => achievement.category === category);
};

export const getFeaturedAchievements = () => {
    return achievements.filter(achievement => achievement.importance === 'High');
};
