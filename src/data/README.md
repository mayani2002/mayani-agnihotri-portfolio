# Portfolio Data Structure

This directory contains all the structured data for the portfolio website, organized into TypeScript modules with proper type definitions.

## 📁 Data Files

### Core Information
- **`personal.ts`** - Personal information, contact details, social links
- **`experience.ts`** - Work experience, positions, achievements
- **`projects.ts`** - Portfolio projects with detailed information
- **`skills.ts`** - Technical skills, proficiency levels, categories

### Achievements & Education
- **`achievements.ts`** - Awards, certifications, recognitions, milestones
- **`education.ts`** - Educational background, courses, certifications

### Content & Media
- **`blog.ts`** - Blog posts, articles, technical writing
- **`youtube.ts`** - YouTube videos, tutorials, educational content
- **`testimonials.ts`** - Client and colleague testimonials

### Utility
- **`index.ts`** - Centralized exports and utility functions

## 🚀 Usage Examples

### Import Individual Data
```typescript
import { personalInfo } from '@/data/personal';
import { workExperience } from '@/data/experience';
import { projects } from '@/data/projects';
```

### Import All Data
```typescript
import { getAllPortfolioData, getPortfolioStats } from '@/data';

const portfolioData = await getAllPortfolioData();
const stats = await getPortfolioStats();
```

### Import Types
```typescript
import type { Project, Skill, BlogPost } from '@/data';
```

### Use Helper Functions
```typescript
import { getFeaturedProjects } from '@/data/projects';
import { getFeaturedPosts } from '@/data/blog';
import { getFeaturedTestimonials } from '@/data/testimonials';

const featured = {
  projects: getFeaturedProjects(),
  posts: getFeaturedPosts(),
  testimonials: getFeaturedTestimonials()
};
```

## 📊 Data Categories

### Personal Information
- Basic info (name, title, bio, location)
- Contact details and social links
- Availability status
- Languages spoken

### Professional Experience
- Company information
- Position details
- Date ranges
- Achievements and technologies used

### Projects
- Project descriptions and details
- Technologies used
- Demo and GitHub links
- Status and metrics
- Team size and role

### Skills & Technologies
- Skill categories (Frontend, Backend, Database, DevOps)
- Proficiency levels (1-5 scale)
- Years of experience
- Related projects

### Achievements
- Awards and recognitions
- Certifications
- Hackathon wins
- Milestones and metrics

### Education
- Degrees and institutions
- Coursework and achievements
- Ongoing certifications
- Academic activities

### Blog & Content
- Published articles
- Categories and tags
- Reading time and stats
- SEO metadata

### YouTube Videos
- Video details and descriptions
- Categories and difficulty levels
- View counts and engagement
- Chapters and resources

### Testimonials
- Client and colleague feedback
- Ratings and categories
- Company affiliations
- Project relationships

## 🛠️ Customization

### Adding New Data
1. Update the appropriate TypeScript file
2. Ensure proper typing
3. Update helper functions if needed
4. Test imports and usage

### Modifying Structure
1. Update interface definitions
2. Migrate existing data
3. Update helper functions
4. Update documentation

### Image Assets
- Store images in `/public` directory
- Use relative paths in data files
- Optimize images for web

## 📈 Statistics & Analytics

The data structure includes built-in analytics:
- Portfolio overview statistics
- Project completion rates
- Skill distribution
- Content engagement metrics
- Testimonial ratings

## 🔧 Development Tips

1. **Type Safety**: Always use TypeScript interfaces
2. **Validation**: Consider adding runtime validation
3. **Performance**: Use lazy loading for large datasets
4. **Caching**: Implement caching for computed data
5. **Updates**: Keep data fresh and accurate

## 📱 Responsive Considerations

Data includes fields for:
- Mobile-optimized content
- Different image sizes
- Truncated descriptions
- Priority/featured flags

## 🔒 Privacy & Security

- No sensitive data in client-side files
- Environment variables for private info
- Sanitized content for public display
- Regular security audits

---

This data structure provides a solid foundation for a professional portfolio website with type safety, flexibility, and maintainability.
