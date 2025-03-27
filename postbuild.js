const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'docs/browser');
const destination = path.join(__dirname, 'docs');

// Helper to recursively copy files and folders
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, {recursive: true});
  }

  const entries = fs.readdirSync(src, {withFileTypes: true});

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to delete a folder recursively
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, {recursive: true, force: true});
  }
}

// Execute actions
console.log('📦 Copying files from docs/browser → docs...');
copyRecursive(source, destination);
console.log('🧹 Removing docs/browser...');
deleteFolderRecursive(source);
console.log('✅ Done!');
