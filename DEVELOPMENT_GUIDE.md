# Development Workflow After Deployment

## Making Changes After Deployment

### 1. Local Development Setup
```bash
# Clone your repository (if working from new machine)
git clone <your-repo-url>
cd mayani-agnihotri-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### 2. Making Changes
1. **Create a new branch for features**:
   ```bash
   git checkout -b feature/new-feature-name
   ```

2. **Make your changes locally**
3. **Test locally**:
   ```bash
   npm run build
   npm run start
   ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature-name
   ```

5. **Deploy to Vercel**:
   - Vercel will auto-deploy when you push to main branch
   - Or use preview deployments for feature branches

### 3. Common Updates You'll Make

#### Update Projects
- Edit `src/data/projects.ts`
- Add new project images to `public/projects/`
- Update project descriptions and links

#### Update Achievements
- Edit `src/data/achievements.ts`
- Add new achievement images to `public/achievements/`

#### Update Personal Info
- Edit `src/data/personal.ts`
- Update profile image if needed

#### Update Content
- Modify section descriptions in components
- Update meta tags in `src/app/layout.tsx`

### 4. Best Practices

#### Branch Strategy
- `main` branch: Production code
- `develop` branch: Development integration
- `feature/*` branches: New features
- `hotfix/*` branches: Quick production fixes

#### Testing Before Deploy
1. Always test locally with `npm run build`
2. Check all sections work correctly
3. Test on mobile devices
4. Verify images load
5. Test contact forms (if any)

#### Performance Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Check Google Search Console
- Monitor Google Analytics

### 5. Emergency Rollback
If something breaks in production:
```bash
# Rollback to previous commit
git revert HEAD
git push origin main
```

### 6. Environment Variables Updates
- Update in Vercel dashboard: Settings > Environment Variables
- Redeploy after environment variable changes

### 7. Domain Changes
- Update `NEXT_PUBLIC_SITE_URL` environment variable
- Update any hardcoded URLs in code
- Update social media links
- Resubmit sitemap to search engines