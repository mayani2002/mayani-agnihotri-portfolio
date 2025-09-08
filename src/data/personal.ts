export interface PersonalInfo {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    location: string;
    age: number;
    email: string;
    phone?: string;
    website?: string;
    availability: {
        freelance: boolean;
        fullTime: boolean;
        partTime: boolean;
        remote: boolean;
    };
    profileImage: string;
    resumeUrl: string;
    // Hero section specific data
    hero: {
        greeting: string;
        name: string;
        highlightedName?: string; // For colored part of name
        profession: string;
        subtitle: string;
        catchPhrase: {
            main: string;
            highlighted: string;
            suffix: string;
        };
        description: string;
        currentRole?: {
            title: string;
            company: string;
            companyUrl?: string;
        };
    };
    socialLinks: {
        github: string;
        linkedin: string;
        twitter: string;
        email: string;
        instagram?: string;
        youtube?: string;
    };
    languages: Array<{
        language: string;
        proficiency: 'Native' | 'Fluent' | 'Conversational' | 'Basic';
    }>;
}

export const personalInfo: PersonalInfo = {
    name: "Mayani Agnihotri",
    title: "Software Engineer & Fullstack Developer",
    tagline: "Building scalable web solutions with modern technologies",
    bio: "Passionate software engineer with 1+ years of non-internship experience in fullstack development. I specialize in React, Node.js, JavaScript, Python, and building scalable backend systems. I have experience working with startups, freelancing, and creating end-to-end products. Currently seeking SDE-1 opportunities at top tech companies while remaining open to exciting freelance collaborations worldwide.",
    location: "India",
    age: 23,
    email: "mayani.agni01@gmail.com",
    availability: {
        freelance: true,
        fullTime: true,
        partTime: false,
        remote: true,
    },
    profileImage: "/profile.png",
    resumeUrl: "/Mayani-Agnihotri-Resume.pdf",
    // Hero section data based on the design
    hero: {
        greeting: "Hello! I Am",
        name: "Mayani Agnihotri",
        highlightedName: "Mayani Agnihotri", // This will be styled differently
        profession: "",
        subtitle: "I'm a Software Engineer.",
        catchPhrase: {
            highlighted: "Code",
            main: " is my design language",
            suffix: "!"
        },
        description: "I love crafting solutions that balance performance, clarity, and user experience.",
        currentRole: {
            title: "Software Engineer",
            company: "Facebook",
            companyUrl: "https://facebook.com"
        }
    },
    socialLinks: {
        github: "https://github.com/mayani2002",
        linkedin: "https://www.linkedin.com/in/mayani-agnihotri/",
        twitter: "https://x.com/mayani_agnihotri",
        email: "mailto:mayani.agni01@gmail.com",
    },
    languages: [
        { language: "English", proficiency: "Fluent" },
        { language: "Hindi", proficiency: "Native" },
    ],
};
