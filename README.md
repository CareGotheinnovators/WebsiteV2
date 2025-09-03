# CareGo Website

A healthcare website imported from Webflow and optimized for development and deployment.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
This will start a live server at `http://localhost:3000`

## 📁 Project Structure

```
CareGo Website/
├── src/                    # Source files
│   ├── assets/            # Static assets
│   │   ├── css/          # Stylesheets
│   │   ├── js/           # JavaScript files
│   │   ├── images/       # Images and media
│   │   └── fonts/        # Font files
│   ├── components/       # Reusable components
│   └── pages/           # HTML pages
├── dist/                 # Production build
├── build/               # Build artifacts
├── docs/               # Documentation
└── scripts/            # Build and utility scripts
```

## 🔄 Webflow Import Process

### Step 1: Export from Webflow
1. In Webflow Designer, go to Project Settings
2. Click on the "Export" tab
3. Click "Prepare ZIP" and download the export

### Step 2: Import to Project
1. Extract the Webflow ZIP file
2. Run the import script:
   ```bash
   npm run import-webflow
   ```
3. Or manually organize files:
   - Move HTML files to `src/pages/`
   - Move CSS files to `src/assets/css/`
   - Move JS files to `src/assets/js/`
   - Move images to `src/assets/images/`
   - Move fonts to `src/assets/fonts/`

### Step 3: Clean Up and Optimize
1. Update asset paths in HTML files
2. Combine and minify CSS/JS if needed
3. Optimize images
4. Test responsive design

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run clean` - Clean build directory
- `npm run import-webflow` - Import Webflow export

## 📝 Post-Import Checklist

- [ ] All pages load correctly
- [ ] CSS styles are applied properly
- [ ] JavaScript functionality works
- [ ] Images load correctly
- [ ] Fonts are displaying properly
- [ ] Forms are functional
- [ ] Responsive design works on all devices
- [ ] SEO meta tags are present
- [ ] Performance is optimized

## 🎨 Customization

After importing from Webflow, you can:
- Modify CSS in `src/assets/css/`
- Add custom JavaScript in `src/assets/js/`
- Create reusable components in `src/components/`
- Add new pages in `src/pages/`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Connect your Git repository and deploy from `dist/` folder
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Push `dist/` folder to `gh-pages` branch
- **Traditional Hosting**: Upload `dist/` folder contents to your web server

## 🔧 Configuration

### Live Server Configuration
The development server is configured to:
- Start on port 3000
- Auto-reload on file changes
- Serve from `src/` directory

### Build Configuration
- CSS minification with clean-css
- JavaScript minification with Terser
- Asset optimization

## 📖 Best Practices

1. **Keep Webflow Export as Reference**: Store original export in `webflow-export/` folder
2. **Organize Assets**: Use the structured folder system
3. **Version Control**: Commit changes regularly
4. **Test Thoroughly**: Check all functionality after import
5. **Optimize for Performance**: Minify assets and optimize images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

