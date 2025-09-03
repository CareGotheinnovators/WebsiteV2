#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function importWebflow() {
  console.log('🎨 Webflow Import Script');
  console.log('========================\n');

  try {
    // Ask for the Webflow export path
    const exportPath = await askQuestion('Enter the path to your Webflow export folder (or ZIP file): ');
    
    if (!fs.existsSync(exportPath)) {
      console.error('❌ Export path does not exist!');
      process.exit(1);
    }

    // Check if it's a ZIP file
    if (exportPath.endsWith('.zip')) {
      console.log('📦 ZIP file detected. Please extract it first and run the script again.');
      process.exit(1);
    }

    console.log('📂 Analyzing Webflow export...');

    // Get all files in the export directory
    const files = fs.readdirSync(exportPath);
    
    // Categorize files
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    const cssFiles = files.filter(f => f.endsWith('.css'));
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(f));
    const fontFiles = files.filter(f => /\.(woff|woff2|ttf|otf|eot)$/i.test(f));

    console.log(`Found: ${htmlFiles.length} HTML, ${cssFiles.length} CSS, ${jsFiles.length} JS, ${imageFiles.length} images, ${fontFiles.length} fonts`);

    // Create backup of original export
    const backupPath = './webflow-export';
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }

    console.log('💾 Creating backup...');
    copyDirectory(exportPath, backupPath);

    console.log('📁 Organizing files...');

    // Copy HTML files to pages
    htmlFiles.forEach(file => {
      const srcPath = path.join(exportPath, file);
      const destPath = path.join('./src/pages', file);
      fs.copyFileSync(srcPath, destPath);
    });

    // Copy CSS files
    cssFiles.forEach(file => {
      const srcPath = path.join(exportPath, file);
      const destPath = path.join('./src/assets/css', file);
      fs.copyFileSync(srcPath, destPath);
    });

    // Copy JS files
    jsFiles.forEach(file => {
      const srcPath = path.join(exportPath, file);
      const destPath = path.join('./src/assets/js', file);
      fs.copyFileSync(srcPath, destPath);
    });

    // Copy image files
    imageFiles.forEach(file => {
      const srcPath = path.join(exportPath, file);
      const destPath = path.join('./src/assets/images', file);
      fs.copyFileSync(srcPath, destPath);
    });

    // Copy font files
    fontFiles.forEach(file => {
      const srcPath = path.join(exportPath, file);
      const destPath = path.join('./src/assets/fonts', file);
      fs.copyFileSync(srcPath, destPath);
    });

    console.log('🔧 Updating asset paths...');

    // Update paths in HTML files
    htmlFiles.forEach(file => {
      const filePath = path.join('./src/pages', file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update CSS paths
      content = content.replace(/href="([^"]*\.css)"/g, 'href="../assets/css/$1"');
      
      // Update JS paths
      content = content.replace(/src="([^"]*\.js)"/g, 'src="../assets/js/$1"');
      
      // Update image paths
      content = content.replace(/src="([^"]*\.(jpg|jpeg|png|gif|svg|webp))"/gi, 'src="../assets/images/$1"');
      
      // Update background-image paths in style attributes
      content = content.replace(/background-image:\s*url\(([^)]*\.(jpg|jpeg|png|gif|svg|webp))\)/gi, 'background-image: url(../assets/images/$1)');
      
      fs.writeFileSync(filePath, content);
    });

    // Update paths in CSS files
    cssFiles.forEach(file => {
      const filePath = path.join('./src/assets/css', file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update image paths in CSS
      content = content.replace(/url\(([^)]*\.(jpg|jpeg|png|gif|svg|webp))\)/gi, 'url(../images/$1)');
      
      // Update font paths in CSS
      content = content.replace(/url\(([^)]*\.(woff|woff2|ttf|otf|eot))\)/gi, 'url(../fonts/$1)');
      
      fs.writeFileSync(filePath, content);
    });

    console.log('✅ Webflow import completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Run "npm install" to install dependencies');
    console.log('2. Run "npm run dev" to start development server');
    console.log('3. Check that all assets load correctly');
    console.log('4. Test responsive design and functionality');

  } catch (error) {
    console.error('❌ Error during import:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Run the import
importWebflow();

