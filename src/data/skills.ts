export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Expert
  yearsOfExperience: number;
  icon?: string;
  description?: string;
  projects?: string[]; // Project IDs where this skill was used
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export const skills: Skill[] = [
  // Frontend
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 5,
    yearsOfExperience: 2,
    icon: "react",
    description: "Advanced React development including hooks, context, and performance optimization",
    projects: ["project-1", "project-2", "project-3"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    level: 4,
    yearsOfExperience: 1.5,
    icon: "nextjs",
    description: "SSR, SSG, API routes, and deployment optimization",
    projects: ["project-1", "project-4"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    level: 4,
    yearsOfExperience: 1.5,
    icon: "typescript",
    description: "Type-safe development and advanced TypeScript patterns",
    projects: ["project-1", "project-3", "project-4"]
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Frontend",
    level: 5,
    yearsOfExperience: 3,
    icon: "javascript",
    description: "ES6+, async programming, and modern JavaScript features",
    projects: ["project-1", "project-2", "project-3"]
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 5,
    yearsOfExperience: 2,
    icon: "tailwindcss",
    description: "Utility-first CSS framework and custom design systems",
    projects: ["project-1", "project-3", "project-4"]
  },
  
  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: 4,
    yearsOfExperience: 2,
    icon: "nodejs",
    description: "Server-side JavaScript, API development, and microservices",
    projects: ["project-1", "project-2"]
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    level: 4,
    yearsOfExperience: 2,
    icon: "express",
    description: "RESTful APIs, middleware, and server architecture",
    projects: ["project-2"]
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    level: 3,
    yearsOfExperience: 1,
    icon: "python",
    description: "Backend development, scripting, and data processing"
  },
  
  // Database
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    level: 4,
    yearsOfExperience: 1.5,
    icon: "mongodb",
    description: "NoSQL database design, aggregation, and optimization",
    projects: ["project-1"]
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    level: 3,
    yearsOfExperience: 1,
    icon: "postgresql",
    description: "Relational database design and complex queries",
    projects: ["project-2"]
  },
  
  // DevOps & Tools
  {
    id: "git",
    name: "Git",
    category: "DevOps",
    level: 4,
    yearsOfExperience: 3,
    icon: "git",
    description: "Version control, branching strategies, and collaboration"
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    level: 3,
    yearsOfExperience: 1,
    icon: "docker",
    description: "Containerization and deployment strategies"
  },
  {
    id: "aws",
    name: "AWS",
    category: "DevOps",
    level: 3,
    yearsOfExperience: 1,
    icon: "aws",
    description: "Cloud services, EC2, S3, and Lambda functions"
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "DevOps",
    level: 4,
    yearsOfExperience: 1.5,
    icon: "vercel",
    description: "Frontend deployment and serverless functions"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    description: "Building modern, responsive user interfaces",
    skills: skills.filter(skill => skill.category === "Frontend")
  },
  {
    name: "Backend Development",
    description: "Server-side programming and API development",
    skills: skills.filter(skill => skill.category === "Backend")
  },
  {
    name: "Database Management",
    description: "Data modeling, queries, and optimization",
    skills: skills.filter(skill => skill.category === "Database")
  },
  {
    name: "DevOps & Deployment",
    description: "Deployment, CI/CD, and infrastructure management",
    skills: skills.filter(skill => skill.category === "DevOps")
  }
];

export const getSkillLevel = (level: number): string => {
  const levels = {
    1: "Beginner",
    2: "Intermediate",
    3: "Proficient",
    4: "Advanced",
    5: "Expert"
  };
  return levels[level as keyof typeof levels] || "Unknown";
};
