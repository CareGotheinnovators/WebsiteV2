#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing missing image paths and favicon references...');

const pagesDir = './src/pages';
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`📝 Processing: ${file}`);
  
  // Fix favicon and webclip icon paths that still point to relative images/
  content = content.replace(/href="images\/favicon\.svg"/g, 'href="../assets/images/favicon.svg"');
  content = content.replace(/href="images\/webclip\.svg"/g, 'href="../assets/images/webclip.svg"');
  
  // Fix any remaining image paths that weren't caught by the first script
  content = content.replace(/srcset="images\//g, 'srcset="../assets/images/');
  content = content.replace(/src="images\//g, 'src="../assets/images/');
  
  // Fix specific problematic image patterns found in the logs
  content = content.replace(/images\/slide-3_1slide-3\.webp/g, '../assets/images/slide-3_1slide-3.webp');
  content = content.replace(/images\/slide-3_2slide-3\.webp/g, '../assets/images/slide-3_2slide-3.webp');
  
  // Fix any other mixed path patterns
  content = content.replace(/, images\//g, ', ../assets/images/');
  
  fs.writeFileSync(filePath, content);
});

console.log('✅ Image path fixes completed!');
console.log(`📁 Processed ${files.length} HTML files`);

