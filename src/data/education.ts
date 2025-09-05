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
        institution: "Thakur College of Engineering and Technology",
        degree: "Bachelor of Technology",
        field: "Artificial Intelligence and Machine Learning",
        startDate: "2020-10",
        endDate: "2024-06",
        grade: "First Class with Distinction",
        gpa: 9.3,
        maxGpa: 10.0,
        location: "India",
        description: "Comprehensive computer science and Machine Learning program focusing on core ML, software development, algorithms, data structures, and system design. Active participant in coding competitions and Hackathons.",
        coursework: [
            "Data Structures and Algorithms",
            "Database Management Systems",
            "Software Engineering",
            "Computer Networks",
            "Operating Systems",
            "Object-Oriented Programming",
            "Web Technologies",
            "App Development",
            "System Design",
            "Software Development Life Cycle (SDLC)",
            "Business Intelligence",
            "Artificial Intelligence",
            "Machine Learning",
            "Mathematics & Statistics"

        ],
        achievements: [
            "1st place at Ideathon for Best Project and Presentation within AIML department",
            "Lead a 45 member team of Coding Club, organizing workshops and coding events",
            "Organized and hosted 14+ coding contests with 700+ participants as Chairperson",
            "Top 10% of graduating class",
        ],
        activities: [
            "Coding Club - Chairperson",
            "Code Chef Campus Chapter - DSA Problem Setter",
            "Peer Tutor for Junior Students"
        ],
        // thesis: {
        //     title: "Building Scalable Web Applications with Microservices Architecture",
        //     description: "Research and implementation of microservices architecture for large-scale web applications, focusing on performance optimization and system reliability.",
        //     advisor: "Dr. Sarah Johnson"
        // },
        logo: "/logos/UG-university-tech-logo.png",
        website: "https://www.tcetmumbai.in/"
    },
    // {
    //     id: "edu-2",
    //     institution: "Central High School",
    //     degree: "Higher Secondary Certificate",
    //     field: "Science (Physics, Chemistry, Mathematics)",
    //     startDate: "2017-04",
    //     endDate: "2019-03",
    //     grade: "95.2%",
    //     location: "India",
    //     description: "Specialized in Science stream with focus on Mathematics and Physics. Developed strong analytical and problem-solving skills.",
    //     coursework: [
    //         "Advanced Mathematics",
    //         "Physics",
    //         "Chemistry",
    //         "Computer Science",
    //         "English"
    //     ],
    //     achievements: [
    //         "School Topper in Mathematics",
    //         "Regional Science Olympiad Winner",
    //         "Perfect attendance award",
    //         "Student Council Member"
    //     ],
    //     activities: [
    //         "Science Club - President",
    //         "Mathematics Olympiad Participant",
    //         "Inter-school Coding Competition - Winner",
    //         "Volunteer for Community Tech Workshops"
    //     ],
    //     logo: "/logos/central-high-logo.svg"
    // },
    {
        id: "edu-3",
        institution: "Online Learning Platforms",
        degree: "Professional Certifications",
        field: "Software Development, Cloud Computing",
        startDate: "2022-01",
        endDate: "Present",
        location: "Online",
        description: "Continuous learning through various online platforms to stay updated with latest technologies and industry trends.",
        coursework: [
            "Database Engineering",
            "DSA - Leetcode",
            "AWS Cloud Concepts",
            "Graph Data Structures",
            "System Design",
            "DevOps and CI/CD",
            "Postman - API Testing & Backend",
            "Node.js Services Development",
            "Google Cloud Platform",
            "Lean Six Sigma"            
        ],
        achievements: [
            "AWS Certified Cloud Practitioner",
            "AIGPE Certified Lean Six Sigma Green Belt",
            "Multiple Udemy Course Certificates"
        ],
        logo: "/logos/online-learning-logo.svg"
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
