# Pre-Deployment Checklist

## Environment Setup
- [ ] Copy `.env.local.example` to `.env.local` for development
- [ ] Update `NEXT_PUBLIC_SITE_URL` with your custom domain
- [ ] Get Google Analytics 4 ID and update `NEXT_PUBLIC_GA_ID`

## Vercel Configuration
- [ ] Set environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com`
  - `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

## Domain Setup
- [ ] Purchase/configure your custom domain
- [ ] Add domain to Vercel project settings
- [ ] Update DNS records to point to Vercel
- [ ] Verify SSL certificate is active

## Content Updates
- [ ] Update personal information in `src/data/personal.ts`
- [ ] Add real project screenshots to replace placeholders
- [ ] Update social media links
- [ ] Add real contact information

## Testing
- [ ] Run `npm run build` locally to test production build
- [ ] Test all sections and navigation
- [ ] Verify images load correctly
- [ ] Check mobile responsiveness
- [ ] Test dark/light theme toggle

## SEO Optimization
- [ ] Update meta descriptions
- [ ] Verify sitemap.xml is accessible
- [ ] Test social media sharing (Open Graph)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Analytics tracking

## Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals scores
- [ ] Optimize images if needed
- [ ] Test loading speeds