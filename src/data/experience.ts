export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
    startDate: string;
    endDate: string | 'Present';
    description: string;
    achievements: string[];
    technologies: string[];
    companyLogo?: string;
    companyWebsite?: string;
}

export const workExperience: WorkExperience[] = [
    {
        id: "exp-1",
        company: "Lauren Information Technologies",
        position: "Backend Developer",
        location: "Mumbai, India",
        type: "Full-time",
        startDate: "2024-06",
        endDate: "2025-06",
        description: "Independently designed and implemented complex backend solutions for a platform serving 100K+ users. Led development of real-time dashboards and distributed microservices architecture.",
        achievements: [
            "Designed and implemented recursive MongoDB aggregation pipelines to fetch complex graph data",
            "Built APIs and created SQL queries that store and retrieve data from 100K+ users on the platform",
            "Developed a real-time dashboard with Apache Superset, optimizing data visualization for business insights",
            "Contributed to building a distributed notification microservice using messaging queues to handle 5K+ messages/day"
        ],
        technologies: ["Node.js", "MongoDB", "SQL", "Apache Superset", "RabbitMQ", "Microservices", "WebSockets"],
        companyWebsite: "https://laureninfotech.com"
    },
    {
        id: "exp-2",
        company: "Shoemato, Easybiznus",
        position: "Core Contributor (Software Development)",
        location: "Remote, India",
        type: "Contract",
        startDate: "2024-07",
        endDate: "2025-01",
        description: "Led backend development for a multi-vendor B2B footwear platform serving retailers and wholesalers. Architected scalable solutions for inventory management and order routing systems.",
        achievements: [
            "Led backend development for a multi-vendor B2B footwear platform",
            "Built SKU-level inventory management system for multiple vendors",
            "Implemented vendor mapping and smart order routing to the nearest high-profit vendor",
            "Designed scalable architecture for B2B marketplace operations"
        ],
        technologies: ["Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs", "System Design"],
        companyWebsite: "https://shoemato.com"
    },
    {
        id: "exp-3",
        company: "Jamrio",
        position: "Backend Developer Intern",
        location: "Bengaluru, India",
        type: "Internship",
        startDate: "2023-06",
        endDate: "2023-10",
        description: "Developed RESTful APIs and core backend logic for a startup's matchmaking platform. Enhanced platform responsiveness and implemented cloud storage solutions.",
        achievements: [
            "Developed RESTful APIs using Node.js and Sequelize for matchmaking platform",
            "Created core logic for matchmaking and swipe features",
            "Collaborated with team to develop scalable backend for FCM notifications and platform subscription",
            "Enhanced platform responsiveness through WebSocket integration and AWS S3 media storage"
        ],
        technologies: ["Node.js", "Sequelize", "REST APIs", "WebSockets", "AWS S3", "FCM", "JavaScript"],
        companyWebsite: "https://jamrio.com"
    },
    // {
    //     id: "exp-4",
    //     company: "Shastra Coding Club, TCET",
    //     position: "Chairperson",
    //     location: "Mumbai, India",
    //     type: "Part-time",
    //     startDate: "2022-05",
    //     endDate: "2023-06",
    //     description: "Led a 45-member technical team, organizing multiple coding contests and mentoring students in competitive programming and data structures & algorithms.",
    //     achievements: [
    //         "Led a 45-member team, organizing 14+ college coding contests with 700+ participants",
    //         "Mentored junior students in Data Structures and Algorithms",
    //         "Shared resources and DSA questions with over 2,000+ students via Shastra WhatsApp community",
    //         "Built and managed the technical community for competitive programming at college level"
    //     ],
    //     technologies: ["Leadership", "Community Management", "Competitive Programming", "DSA", "Mentoring"],
    //     companyWebsite: "https://tcetmumbai.in"
    // }
];
