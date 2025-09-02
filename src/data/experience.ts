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
        company: "Tech Startup XYZ",
        position: "Fullstack Developer",
        location: "Remote, India",
        type: "Full-time",
        startDate: "2023-06",
        endDate: "Present",
        description: "Lead development of web applications using React, Node.js, and modern technologies. Collaborated with cross-functional teams to deliver scalable solutions.",
        achievements: [
            "Built and deployed 3+ full-stack web applications",
            "Improved application performance by 40% through optimization",
            "Implemented CI/CD pipelines reducing deployment time by 60%",
            "Mentored 2 junior developers on best practices"
        ],
        technologies: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"],
        companyWebsite: "https://example-startup.com"
    },
    {
        id: "exp-2",
        company: "Freelance Projects",
        position: "Freelance Developer",
        location: "Remote",
        type: "Freelance",
        startDate: "2022-08",
        endDate: "Present",
        description: "Providing fullstack development services to various clients worldwide, building custom web solutions and applications.",
        achievements: [
            "Successfully delivered 10+ client projects on time",
            "Maintained 5-star rating across platforms",
            "Generated $15K+ in freelance revenue",
            "Built long-term relationships with repeat clients"
        ],
        technologies: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "Vercel"]
    },
    {
        id: "exp-3",
        company: "Previous Company",
        position: "Junior Developer",
        location: "India",
        type: "Full-time",
        startDate: "2022-01",
        endDate: "2023-05",
        description: "Worked as part of the development team building web applications and APIs.",
        achievements: [
            "Contributed to multiple feature releases",
            "Fixed 50+ bugs and improved code quality",
            "Participated in code reviews and knowledge sharing",
            "Learned industry best practices and agile methodology"
        ],
        technologies: ["JavaScript", "React", "Express.js", "MySQL", "Git"]
    }
];
