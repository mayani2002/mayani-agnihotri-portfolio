// Personal Information
export * from './personal';

// Professional Experience
export * from './experience';

// Projects Portfolio
export * from './projects';

// Skills & Technologies
export * from './skills';

// Achievements & Certifications
export * from './achievements';

// Education Background
export * from './education';

// Blog Posts & Articles
export * from './blog';

// YouTube Content
export * from './youtube';

// Client & Colleague Testimonials
export * from './testimonials';

// Type exports for easy access
export type { PersonalInfo } from './personal';
export type { WorkExperience } from './experience';
export type { Project } from './projects';
export type { Skill, SkillCategory } from './skills';
export type { Achievement } from './achievements';
export type { Education } from './education';
export type { BlogPost } from './blog';
export type { YouTubeVideo } from './youtube';
export type { Testimonial } from './testimonials';

// Utility function to get all data
export const getAllPortfolioData = async () => {
  const { personalInfo } = await import('./personal');
  const { workExperience } = await import('./experience');
  const { projects } = await import('./projects');
  const { skills, skillCategories } = await import('./skills');
  const { achievements } = await import('./achievements');
  const { education } = await import('./education');
  const { blogPosts } = await import('./blog');
  const { youtubeVideos } = await import('./youtube');
  const { testimonials } = await import('./testimonials');

  return {
    personal: personalInfo,
    experience: workExperience,
    projects,
    skills,
    skillCategories,
    achievements,
    education,
    blog: blogPosts,
    youtube: youtubeVideos,
    testimonials,
  };
};

// Portfolio statistics aggregation
export const getPortfolioStats = async () => {
  const data = await getAllPortfolioData();
  
  return {
    totalProjects: data.projects.length,
    featuredProjects: data.projects.filter(p => p.featured).length,
    completedProjects: data.projects.filter(p => p.status === 'Completed').length,
    totalSkills: data.skills.length,
    expertSkills: data.skills.filter(s => s.level >= 4).length,
    totalExperience: data.experience.length,
    currentPositions: data.experience.filter(e => e.endDate === 'Present').length,
    totalAchievements: data.achievements.length,
    highImpactAchievements: data.achievements.filter(a => a.importance === 'High').length,
    totalBlogPosts: data.blog.filter(b => b.published).length,
    featuredBlogPosts: data.blog.filter(b => b.featured && b.published).length,
    totalVideos: data.youtube.length,
    featuredVideos: data.youtube.filter(v => v.featured).length,
    totalTestimonials: data.testimonials.length,
    featuredTestimonials: data.testimonials.filter(t => t.featured).length,
    averageTestimonialRating: data.testimonials.reduce((acc, t) => acc + t.rating, 0) / data.testimonials.length,
    educationCompleted: data.education.filter(e => e.endDate !== 'Present').length,
    ongoingEducation: data.education.filter(e => e.endDate === 'Present').length,
  };
};
