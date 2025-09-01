export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Full markdown content
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // in minutes
  featured: boolean;
  published: boolean;
  coverImage?: string;
  author: {
    name: string;
    image: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  externalUrl?: string; // If published on external platform
  platform?: 'Medium' | 'Dev.to' | 'Hashnode' | 'Personal Blog';
  stats?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Building Scalable React Applications: Best Practices for 2024",
    slug: "building-scalable-react-applications-2024",
    excerpt: "Learn the essential patterns and practices for building maintainable and scalable React applications in 2024. From component architecture to state management, we cover it all.",
    category: "Frontend Development",
    tags: ["React", "JavaScript", "Best Practices", "Architecture"],
    publishedAt: "2023-09-15",
    readTime: 8,
    featured: true,
    published: true,
    coverImage: "/blog/react-scalability.jpg",
    author: {
      name: "Mayani Agnihotri",
      image: "/profile-mayani.jpeg"
    },
    seo: {
      metaTitle: "Building Scalable React Applications: Best Practices for 2024",
      metaDescription: "Learn essential patterns and practices for building maintainable and scalable React applications. Component architecture, state management, and more.",
      keywords: ["React", "Scalability", "Best Practices", "Frontend", "JavaScript"]
    },
    externalUrl: "https://medium.com/@mayani.agni01/building-scalable-react-applications-2024",
    platform: "Medium",
    stats: {
      views: 5200,
      likes: 184,
      comments: 23,
      shares: 47
    }
  },
  {
    id: "blog-2",
    title: "From Monolith to Microservices: A Practical Migration Guide",
    slug: "monolith-to-microservices-migration-guide",
    excerpt: "A comprehensive guide on migrating from monolithic architecture to microservices. Learn the challenges, strategies, and best practices from real-world experience.",
    category: "Backend Development",
    tags: ["Microservices", "Architecture", "Node.js", "System Design"],
    publishedAt: "2023-08-20",
    readTime: 12,
    featured: true,
    published: true,
    coverImage: "/blog/microservices-migration.jpg",
    author: {
      name: "Mayani Agnihotri",
      image: "/profile-mayani.jpeg"
    },
    seo: {
      metaTitle: "From Monolith to Microservices: A Practical Migration Guide",
      metaDescription: "Learn how to migrate from monolithic architecture to microservices with practical strategies and real-world examples.",
      keywords: ["Microservices", "Architecture", "Migration", "System Design", "Backend"]
    },
    externalUrl: "https://dev.to/mayani2002/monolith-to-microservices-migration-guide",
    platform: "Dev.to",
    stats: {
      views: 3800,
      likes: 156,
      comments: 31,
      shares: 28
    }
  },
  {
    id: "blog-3",
    title: "TypeScript Tips and Tricks for Better Code Quality",
    slug: "typescript-tips-tricks-better-code-quality",
    excerpt: "Discover advanced TypeScript techniques that will make your code more robust, maintainable, and developer-friendly. Perfect for intermediate to advanced developers.",
    category: "Programming",
    tags: ["TypeScript", "Code Quality", "Best Practices", "JavaScript"],
    publishedAt: "2023-07-10",
    readTime: 6,
    featured: false,
    published: true,
    coverImage: "/blog/typescript-tips.jpg",
    author: {
      name: "Mayani Agnihotri",
      image: "/profile-mayani.jpeg"
    },
    seo: {
      metaTitle: "TypeScript Tips and Tricks for Better Code Quality",
      metaDescription: "Advanced TypeScript techniques for writing more robust and maintainable code. Tips for intermediate to advanced developers.",
      keywords: ["TypeScript", "Programming", "Code Quality", "JavaScript", "Tips"]
    },
    externalUrl: "https://hashnode.com/@mayaniagnihotri/typescript-tips-tricks-better-code-quality",
    platform: "Hashnode",
    stats: {
      views: 2100,
      likes: 89,
      comments: 15,
      shares: 12
    }
  },
  {
    id: "blog-4",
    title: "Optimizing React Performance: A Deep Dive",
    slug: "optimizing-react-performance-deep-dive",
    excerpt: "Performance is crucial for user experience. Learn advanced React optimization techniques including memoization, virtualization, and bundle splitting.",
    category: "Frontend Development",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    publishedAt: "2023-06-25",
    readTime: 10,
    featured: false,
    published: true,
    coverImage: "/blog/react-performance.jpg",
    author: {
      name: "Mayani Agnihotri",
      image: "/profile-mayani.jpeg"
    },
    seo: {
      metaTitle: "Optimizing React Performance: A Deep Dive",
      metaDescription: "Learn advanced React performance optimization techniques including memoization, virtualization, and bundle splitting for better user experience.",
      keywords: ["React", "Performance", "Optimization", "Frontend", "JavaScript"]
    },
    platform: "Personal Blog",
    stats: {
      views: 1800,
      likes: 67,
      comments: 8,
      shares: 15
    }
  },
  {
    id: "blog-5",
    title: "My Journey from Bootcamp to Full-Stack Developer",
    slug: "journey-bootcamp-to-fullstack-developer",
    excerpt: "A personal story of career transition, the challenges faced, lessons learned, and advice for aspiring developers starting their coding journey.",
    category: "Career",
    tags: ["Career", "Personal Story", "Bootcamp", "Learning"],
    publishedAt: "2023-05-15",
    readTime: 7,
    featured: true,
    published: true,
    coverImage: "/blog/coding-journey.jpg",
    author: {
      name: "Mayani Agnihotri",
      image: "/profile-mayani.jpeg"
    },
    seo: {
      metaTitle: "My Journey from Bootcamp to Full-Stack Developer",
      metaDescription: "Personal story of career transition from bootcamp to full-stack developer. Challenges, lessons, and advice for aspiring developers.",
      keywords: ["Career", "Full-Stack Developer", "Bootcamp", "Learning", "Programming"]
    },
    externalUrl: "https://medium.com/@mayani.agni01/journey-bootcamp-to-fullstack-developer",
    platform: "Medium",
    stats: {
      views: 4200,
      likes: 223,
      comments: 45,
      shares: 38
    }
  }
];

export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured && post.published);
};

export const getPostsByCategory = (category: string) => {
  return blogPosts.filter(post => post.category === category && post.published);
};

export const getRecentPosts = (limit: number = 5) => {
  return blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getTotalBlogStats = () => {
  const totalStats = blogPosts.reduce((acc, post) => {
    if (post.stats) {
      acc.views += post.stats.views;
      acc.likes += post.stats.likes;
      acc.comments += post.stats.comments;
      acc.shares += post.stats.shares;
    }
    return acc;
  }, { views: 0, likes: 0, comments: 0, shares: 0 });

  return {
    ...totalStats,
    totalPosts: blogPosts.filter(post => post.published).length
  };
};
