# 🚀 Webflow Import Guide

## Pre-Import Checklist

### 1. Webflow Export Preparation
- [ ] Test your site thoroughly in Webflow
- [ ] Ensure all interactions and animations work
- [ ] Check all forms are properly configured
- [ ] Verify responsive design on all breakpoints
- [ ] Optimize images in Webflow before export

### 2. Export Settings
- [ ] Go to Project Settings → Export in Webflow
- [ ] Click "Prepare ZIP" (this may take a few minutes)
- [ ] Download the export ZIP file
- [ ] Extract to a temporary folder

## Import Process

### Option 1: Automated Import (Recommended)
```bash
npm install
npm run import-webflow
```
Follow the prompts to select your export folder.

### Option 2: Manual Import
1. **Create backup**: Copy export folder to `webflow-export/`
2. **Organize files**:
   - HTML files → `src/pages/`
   - CSS files → `src/assets/css/`
   - JS files → `src/assets/js/`
   - Images → `src/assets/images/`
   - Fonts → `src/assets/fonts/`
3. **Update paths**: Fix asset references in HTML and CSS files

## Post-Import Optimization

### 1. File Organization
- [ ] Rename files with descriptive names
- [ ] Organize images into subfolders (e.g., `hero/`, `icons/`, `gallery/`)
- [ ] Group CSS files logically

### 2. Code Cleanup
- [ ] Remove unused CSS classes
- [ ] Combine similar stylesheets
- [ ] Add semantic HTML5 elements
- [ ] Improve accessibility (alt tags, ARIA labels)

### 3. Performance Optimization
- [ ] Compress images (use WebP format when possible)
- [ ] Minify CSS and JavaScript
- [ ] Enable gzip compression
- [ ] Add proper caching headers

### 4. SEO Enhancement
- [ ] Add meta descriptions to all pages
- [ ] Include Open Graph tags
- [ ] Add structured data markup
- [ ] Create XML sitemap
- [ ] Add robots.txt

## Development Workflow

### Local Development
```bash
npm run dev          # Start development server
```
Access at: http://localhost:3000

### Production Build
```bash
npm run build        # Create optimized build
npm run serve        # Preview production build
```

## Common Issues & Solutions

### CSS Not Loading
- Check file paths in HTML `<link>` tags
- Ensure CSS files are in `src/assets/css/`
- Verify no special characters in filenames

### Images Not Displaying
- Check image paths in HTML and CSS
- Ensure images are in `src/assets/images/`
- Convert absolute paths to relative paths

### JavaScript Errors
- Check browser console for specific errors
- Ensure JS files are in `src/assets/js/`
- Verify jQuery is loaded before custom scripts

### Forms Not Working
- Update form action URLs
- Test form submissions
- Configure form handling service (e.g., Netlify Forms, Formspree)

### Responsive Issues
- Test on various devices and screen sizes
- Check Webflow's responsive settings
- Verify viewport meta tag is present

## Best Practices

### File Naming
- Use lowercase letters and hyphens
- Be descriptive: `hero-banner.jpg` not `image1.jpg`
- Group related files with prefixes

### CSS Organization
- Keep Webflow's CSS structure initially
- Add custom styles in separate files
- Use CSS custom properties for theming

### Asset Management
- Optimize images before import
- Use appropriate image formats (WebP, SVG)
- Implement lazy loading for images

### Version Control
- Commit original export as baseline
- Use meaningful commit messages
- Create branches for major changes

## Testing Checklist

### Functionality
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Forms submit successfully
- [ ] All links work
- [ ] Animations and interactions function

### Performance
- [ ] Page load times under 3 seconds
- [ ] Images load quickly
- [ ] No JavaScript errors in console
- [ ] Lighthouse score > 90

### Responsive Design
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Deployment Options

### Netlify (Recommended)
1. Connect Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure custom domain

### Vercel
1. Connect Git repository
2. Auto-detected settings work for most cases
3. Configure custom domain

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder contents to web server
3. Configure server for SPA routing if needed

## Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor performance metrics
- Review and update content
- Test on new browser versions

### Backup Strategy
- Keep original Webflow export
- Regular Git commits
- Backup production database/content
- Document any custom modifications

## Support

If you encounter issues:
1. Check this guide first
2. Review browser console for errors
3. Test with a fresh export from Webflow
4. Check Webflow's export documentation

