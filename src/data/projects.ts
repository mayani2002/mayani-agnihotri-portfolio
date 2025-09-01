export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Web App' | 'Mobile App' | 'API' | 'Tool' | 'Library' | 'Other';
  status: 'Completed' | 'In Progress' | 'Planned' | 'Archived';
  featured: boolean;
  technologies: string[];
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  startDate: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
  challenges?: string[];
  learnings?: string[];
  metrics?: {
    users?: number;
    downloads?: number;
    stars?: number;
    performance?: string;
  };
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform with admin dashboard, payment integration, and real-time inventory management.",
    longDescription: "A comprehensive e-commerce solution built from scratch with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing via Stripe, admin dashboard, order management, and real-time inventory tracking. The platform handles high traffic and provides excellent user experience across all devices.",
    category: "Web App",
    status: "Completed",
    featured: true,
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "TypeScript"],
    images: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
    demoUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/mayani2002/ecommerce-platform",
    startDate: "2023-03",
    endDate: "2023-06",
    teamSize: 1,
    role: "Full-Stack Developer",
    challenges: [
      "Implementing real-time inventory management",
      "Optimizing database queries for large product catalogs",
      "Ensuring secure payment processing"
    ],
    learnings: [
      "Advanced state management with Redux Toolkit",
      "Payment gateway integration best practices",
      "Database optimization techniques"
    ],
    metrics: {
      users: 500,
      performance: "95% Lighthouse Score"
    }
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, team collaboration, and productivity analytics.",
    longDescription: "A modern task management solution designed for teams and individuals. Features include drag-and-drop kanban boards, real-time collaboration, file attachments, time tracking, project analytics, and team management. Built with focus on performance and user experience.",
    category: "Web App",
    status: "Completed",
    featured: true,
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Express", "Material-UI"],
    images: ["/projects/taskapp-1.jpg", "/projects/taskapp-2.jpg"],
    demoUrl: "https://taskmanager-demo.vercel.app",
    githubUrl: "https://github.com/mayani2002/task-manager",
    startDate: "2023-01",
    endDate: "2023-03",
    teamSize: 2,
    role: "Lead Developer",
    challenges: [
      "Implementing real-time synchronization",
      "Managing complex state across multiple users",
      "Building efficient drag-and-drop interface"
    ],
    learnings: [
      "WebSocket implementation with Socket.io",
      "Complex state management patterns",
      "UI/UX design principles"
    ],
    metrics: {
      users: 200,
      performance: "92% Lighthouse Score"
    }
  },
  {
    id: "project-3",
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts, historical data, and interactive charts.",
    longDescription: "A responsive weather application providing current conditions, 7-day forecasts, historical weather data, and interactive charts. Features location-based weather, multiple city tracking, weather alerts, and detailed meteorological information.",
    category: "Web App",
    status: "Completed",
    featured: false,
    technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind CSS", "TypeScript"],
    images: ["/projects/weather-1.jpg"],
    demoUrl: "https://weather-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/mayani2002/weather-dashboard",
    startDate: "2022-11",
    endDate: "2022-12",
    teamSize: 1,
    role: "Full-Stack Developer",
    challenges: [
      "Handling API rate limits",
      "Creating responsive chart visualizations",
      "Implementing geolocation features"
    ],
    learnings: [
      "Working with external APIs",
      "Data visualization with Chart.js",
      "Responsive design patterns"
    ],
    metrics: {
      users: 150,
      performance: "96% Lighthouse Score"
    }
  },
  {
    id: "project-4",
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js, featuring dark mode, animations, and optimized performance.",
    longDescription: "A responsive portfolio website showcasing projects, skills, and experience. Features include dark/light mode toggle, smooth animations, contact form, blog integration, and SEO optimization. Built with modern web technologies and best practices.",
    category: "Web App",
    status: "In Progress",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    images: ["/projects/portfolio-1.jpg"],
    demoUrl: "https://mayani-agnihotri.vercel.app",
    githubUrl: "https://github.com/mayani2002/portfolio",
    startDate: "2023-08",
    teamSize: 1,
    role: "Full-Stack Developer",
    challenges: [
      "Implementing smooth animations",
      "Optimizing for SEO and performance",
      "Creating responsive design system"
    ],
    learnings: [
      "Advanced Next.js features",
      "Animation libraries integration",
      "Performance optimization techniques"
    ]
  }
];
