export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | 'Present';
    grade?: string;
    gpa?: number;
    maxGpa?: number;
    location: string;
    description?: string;
    coursework?: string[];
    achievements?: string[];
    activities?: string[];
    thesis?: {
        title: string;
        description: string;
        advisor?: string;
    };
    logo?: string;
    website?: string;
}

export const education: Education[] = [
    {
        id: "edu-1",
        institution: "University of Technology",
        degree: "Bachelor of Technology",
        field: "Computer Science and Engineering",
        startDate: "2019-08",
        endDate: "2023-06",
        grade: "First Class with Distinction",
        gpa: 8.5,
        maxGpa: 10.0,
        location: "India",
        description: "Comprehensive computer science program focusing on software development, algorithms, data structures, and system design. Active participant in coding competitions and technical societies.",
        coursework: [
            "Data Structures and Algorithms",
            "Database Management Systems",
            "Software Engineering",
            "Computer Networks",
            "Operating Systems",
            "Web Technologies",
            "Machine Learning",
            "Artificial Intelligence",
            "System Design",
            "Cybersecurity"
        ],
        achievements: [
            "Dean's List for 6 consecutive semesters",
            "Top 5% of graduating class",
            "Best Project Award for Final Year Project",
            "Scholarship recipient for academic excellence"
        ],
        activities: [
            "Computer Science Society - Technical Lead",
            "Coding Club - Member",
            "Hackathon Organizer",
            "Peer Tutor for Junior Students"
        ],
        thesis: {
            title: "Building Scalable Web Applications with Microservices Architecture",
            description: "Research and implementation of microservices architecture for large-scale web applications, focusing on performance optimization and system reliability.",
            advisor: "Dr. Sarah Johnson"
        },
        website: "https://university-of-tech.edu"
    },
    {
        id: "edu-2",
        institution: "Central High School",
        degree: "Higher Secondary Certificate",
        field: "Science (Physics, Chemistry, Mathematics)",
        startDate: "2017-04",
        endDate: "2019-03",
        grade: "95.2%",
        location: "India",
        description: "Specialized in Science stream with focus on Mathematics and Physics. Developed strong analytical and problem-solving skills.",
        coursework: [
            "Advanced Mathematics",
            "Physics",
            "Chemistry",
            "Computer Science",
            "English"
        ],
        achievements: [
            "School Topper in Mathematics",
            "Regional Science Olympiad Winner",
            "Perfect attendance award",
            "Student Council Member"
        ],
        activities: [
            "Science Club - President",
            "Mathematics Olympiad Participant",
            "Inter-school Coding Competition - Winner",
            "Volunteer for Community Tech Workshops"
        ]
    },
    {
        id: "edu-3",
        institution: "Online Learning Platforms",
        degree: "Professional Certifications",
        field: "Web Development & Cloud Computing",
        startDate: "2022-01",
        endDate: "Present",
        location: "Online",
        description: "Continuous learning through various online platforms to stay updated with latest technologies and industry trends.",
        coursework: [
            "Advanced React Development",
            "Node.js and Backend Development",
            "AWS Cloud Solutions",
            "DevOps and CI/CD",
            "TypeScript Mastery",
            "System Design",
            "MongoDB University",
            "Google Cloud Platform"
        ],
        achievements: [
            "AWS Certified Developer - Associate",
            "Meta React Developer Professional Certificate",
            "Google Cloud Professional Cloud Architect (In Progress)",
            "Multiple Coursera Course Certificates"
        ]
    }
];

export const getEducationByLevel = () => {
    return {
        university: education.filter(edu => edu.degree.includes("Bachelor") || edu.degree.includes("Master") || edu.degree.includes("PhD")),
        school: education.filter(edu => edu.degree.includes("Secondary") || edu.degree.includes("High School")),
        certifications: education.filter(edu => edu.degree.includes("Certification") || edu.degree.includes("Professional"))
    };
};

export const getCurrentEducation = () => {
    return education.filter(edu => edu.endDate === 'Present');
};
