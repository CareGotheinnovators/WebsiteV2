#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Updating asset paths in HTML files...');

const pagesDir = './src/pages';
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`📝 Processing: ${file}`);
  
  // Update CSS paths
  content = content.replace(/href="css\//g, 'href="../assets/css/');
  
  // Update JS paths
  content = content.replace(/src="js\//g, 'src="../assets/js/');
  
  // Update image paths in src attributes
  content = content.replace(/src="images\//g, 'src="../assets/images/');
  
  // Update image paths in srcset attributes
  content = content.replace(/srcset="images\//g, 'srcset="../assets/images/');
  
  // Update background-image paths in style attributes
  content = content.replace(/background-image:\s*url\(images\//g, 'background-image: url(../assets/images/');
  content = content.replace(/background-image:\s*url\('images\//g, "background-image: url('../assets/images/");
  content = content.replace(/background-image:\s*url\("images\//g, 'background-image: url("../assets/images/');
  
  // Update document paths
  content = content.replace(/href="documents\//g, 'href="../assets/');
  content = content.replace(/src="documents\//g, 'src="../assets/');
  
  // Update font paths (if any)
  content = content.replace(/url\(fonts\//g, 'url(../assets/fonts/');
  content = content.replace(/url\('fonts\//g, "url('../assets/fonts/");
  content = content.replace(/url\("fonts\//g, 'url("../assets/fonts/');
  
  fs.writeFileSync(filePath, content);
});

console.log('✅ Path updates completed!');
console.log(`📁 Processed ${files.length} HTML files`);

