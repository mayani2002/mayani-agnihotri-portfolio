export interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    companyLogo?: string;
    image?: string;
    content: string;
    rating: 1 | 2 | 3 | 4 | 5;
    date: string;
    project?: string; // Project ID if related to specific project
    category: 'Client' | 'Colleague' | 'Manager' | 'Student' | 'Mentor';
    featured: boolean;
    linkedinUrl?: string;
    twitterUrl?: string;
    location?: string;
    relationship: string; // How you know this person
}

export const testimonials: Testimonial[] = [
    {
        id: "testimonial-1",
        name: "Sarah Johnson",
        position: "Product Manager",
        company: "TechStartup Inc.",
        image: "/testimonials/sarah-johnson.jpg",
        content: "Mayani delivered exceptional work on our e-commerce platform. His attention to detail, technical expertise, and ability to meet tight deadlines impressed our entire team. The final product exceeded our expectations and significantly improved our conversion rates.",
        rating: 5,
        date: "2023-08-15",
        project: "project-1",
        category: "Client",
        featured: true,
        linkedinUrl: "https://linkedin.com/in/sarah-johnson-pm",
        location: "San Francisco, CA",
        relationship: "Worked with Mayani on e-commerce platform development"
    },
    {
        id: "testimonial-2",
        name: "Michael Chen",
        position: "Senior Developer",
        company: "DevSolutions Ltd.",
        image: "/testimonials/michael-chen.jpg",
        content: "I had the pleasure of working alongside Mayani on several projects. His React and Node.js skills are outstanding, and he's always willing to help team members. He writes clean, maintainable code and is great at problem-solving under pressure.",
        rating: 5,
        date: "2023-07-22",
        category: "Colleague",
        featured: true,
        linkedinUrl: "https://linkedin.com/in/michael-chen-dev",
        location: "Toronto, Canada",
        relationship: "Collaborated on multiple full-stack projects"
    },
    {
        id: "testimonial-3",
        name: "Emily Rodriguez",
        position: "CEO",
        company: "StartupHub",
        companyLogo: "/testimonials/startuphub-logo.png",
        image: "/testimonials/emily-rodriguez.jpg",
        content: "Mayani transformed our outdated website into a modern, responsive platform that our customers love. His freelance work was professional, timely, and within budget. I highly recommend him for any web development project.",
        rating: 5,
        date: "2023-06-10",
        project: "project-3",
        category: "Client",
        featured: true,
        linkedinUrl: "https://linkedin.com/in/emily-rodriguez-ceo",
        twitterUrl: "https://twitter.com/emily_startups",
        location: "Austin, TX",
        relationship: "Hired Mayani for website redesign and development"
    },
    {
        id: "testimonial-4",
        name: "David Kumar",
        position: "Engineering Manager",
        company: "TechCorp Solutions",
        image: "/testimonials/david-kumar.jpg",
        content: "Mayani was an excellent team player during his time with us. He quickly adapted to our tech stack, contributed meaningful code reviews, and helped mentor junior developers. His full-stack expertise was invaluable to our team.",
        rating: 5,
        date: "2023-05-28",
        category: "Manager",
        featured: true,
        linkedinUrl: "https://linkedin.com/in/david-kumar-eng",
        location: "Bangalore, India",
        relationship: "Managed Mayani during his full-time role"
    },
    {
        id: "testimonial-5",
        name: "Jessica Wang",
        position: "Freelance Client",
        company: "E-learning Platform",
        image: "/testimonials/jessica-wang.jpg",
        content: "Working with Mayani was fantastic! He built our learning management system exactly as we envisioned. Great communication, excellent technical skills, and delivered ahead of schedule. Will definitely work with him again.",
        rating: 5,
        date: "2023-04-20",
        project: "project-2",
        category: "Client",
        featured: false,
        location: "New York, NY",
        relationship: "Contracted Mayani for LMS development"
    },
    {
        id: "testimonial-6",
        name: "Alex Thompson",
        position: "Full-Stack Developer",
        company: "CodeCraft Agency",
        image: "/testimonials/alex-thompson.jpg",
        content: "Mayani's tutorials and code reviews helped me level up my React skills significantly. He explains complex concepts clearly and provides practical examples. His mentorship has been invaluable to my growth as a developer.",
        rating: 5,
        date: "2023-03-15",
        category: "Student",
        featured: false,
        linkedinUrl: "https://linkedin.com/in/alex-thompson-dev",
        location: "London, UK",
        relationship: "Learned from Mayani through tutorials and mentorship"
    },
    {
        id: "testimonial-7",
        name: "Priya Sharma",
        position: "UX Designer",
        company: "Design Studio Pro",
        image: "/testimonials/priya-sharma.jpg",
        content: "Mayani brought my designs to life perfectly! His attention to design details and pixel-perfect implementation made our collaboration seamless. He understands the importance of good UX and implements accordingly.",
        rating: 5,
        date: "2023-02-08",
        category: "Colleague",
        featured: false,
        linkedinUrl: "https://linkedin.com/in/priya-sharma-ux",
        location: "Mumbai, India",
        relationship: "Collaborated on UI/UX implementation projects"
    },
    {
        id: "testimonial-8",
        name: "Robert Martinez",
        position: "Startup Founder",
        company: "InnovateTech",
        companyLogo: "/testimonials/innovatetech-logo.png",
        image: "/testimonials/robert-martinez.jpg",
        content: "Mayani helped us build our MVP in record time. His full-stack expertise and startup mindset were exactly what we needed. The product is now successfully serving thousands of users. Highly recommended!",
        rating: 5,
        date: "2023-01-25",
        category: "Client",
        featured: true,
        linkedinUrl: "https://linkedin.com/in/robert-martinez-founder",
        twitterUrl: "https://twitter.com/robert_innovates",
        location: "Seattle, WA",
        relationship: "Hired Mayani to build startup MVP"
    },
    {
        id: "testimonial-9",
        name: "Lisa Chen",
        position: "Senior Frontend Developer",
        company: "WebTech Solutions",
        image: "/testimonials/lisa-chen.jpg",
        content: "Mayani's code quality and architecture decisions are impressive. He writes scalable, maintainable code and always considers performance implications. Working with him elevated the quality of our entire codebase.",
        rating: 5,
        date: "2022-12-10",
        category: "Colleague",
        featured: false,
        linkedinUrl: "https://linkedin.com/in/lisa-chen-frontend",
        location: "Vancouver, Canada",
        relationship: "Code review partner and colleague"
    }
];

export const getFeaturedTestimonials = () => {
    return testimonials.filter(testimonial => testimonial.featured);
};

export const getTestimonialsByCategory = (category: Testimonial['category']) => {
    return testimonials.filter(testimonial => testimonial.category === category);
};

export const getTestimonialsByRating = (minRating: number = 4) => {
    return testimonials.filter(testimonial => testimonial.rating >= minRating);
};

export const getRecentTestimonials = (limit: number = 6) => {
    return testimonials
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
};

export const getTestimonialStats = () => {
    const totalRating = testimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0);
    const averageRating = totalRating / testimonials.length;

    const ratingDistribution = testimonials.reduce((acc, testimonial) => {
        acc[testimonial.rating] = (acc[testimonial.rating] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    const categoryDistribution = testimonials.reduce((acc, testimonial) => {
        acc[testimonial.category] = (acc[testimonial.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return {
        total: testimonials.length,
        averageRating: Math.round(averageRating * 10) / 10,
        fiveStarPercentage: Math.round((ratingDistribution[5] || 0) / testimonials.length * 100),
        ratingDistribution,
        categoryDistribution
    };
};
