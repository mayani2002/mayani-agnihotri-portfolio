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
  profileImage: "/profile-mayani.jpeg",
  resumeUrl: "/Mayani-Agnihotri-Resume.pdf",
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
